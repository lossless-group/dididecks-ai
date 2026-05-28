/**
 * Load and evaluate the consuming client's deck/slot registry files (TS).
 *
 * Strategy: use esbuild to transform TS → ESM JS at module-load time, then
 * evaluate as a data URL import. Works for files outside Vite's analyzed tree
 * (the registries live in the consuming client-site, not in the shell package).
 *
 * Esbuild is transitively available in every consumer because Astro 6 ships
 * Vite 5+ which depends on esbuild — we never have to install it on the
 * consumer side.
 */
import fs from "node:fs/promises";
import path from "node:path";

import type {
  Deck,
  SlotRef,
  SlotsByVariant,
  AuditRegistry,
  AuditRegistryV1,
  RankEntryV2,
  SurfaceRankEntry,
} from "./types/index.js";

interface EsbuildModule {
  transform: (
    source: string,
    options: { loader: "ts"; format: "esm"; sourcefile?: string },
  ) => Promise<{ code: string }>;
}

let esbuildPromise: Promise<EsbuildModule> | undefined;
function getEsbuild(): Promise<EsbuildModule> {
  if (!esbuildPromise) {
    esbuildPromise = import("esbuild") as unknown as Promise<EsbuildModule>;
  }
  return esbuildPromise;
}

async function evalTsModule<T>(absPath: string): Promise<T> {
  const source = await fs.readFile(absPath, "utf-8");
  const esbuild = await getEsbuild();
  const { code } = await esbuild.transform(source, {
    loader: "ts",
    format: "esm",
    sourcefile: absPath,
  });
  const dataUrl = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  return (await import(/* @vite-ignore */ dataUrl)) as T;
}

export async function loadDecksRegistry(absPath: string): Promise<{ DECKS: Deck[] }> {
  return evalTsModule<{ DECKS: Deck[] }>(absPath);
}

/**
 * Recursively walk a directory, yielding absolute paths of .astro files.
 * Stops at typical noise directories (node_modules, .vercel, .astro, dist).
 */
async function* walkAstroFiles(root: string): AsyncGenerator<string> {
  let entries: import("node:fs").Dirent[];
  try {
    entries = await fs.readdir(root, { withFileTypes: true });
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "ENOENT") return;
    throw err;
  }
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".vercel" || entry.name === ".astro" || entry.name === "dist") continue;
      yield* walkAstroFiles(full);
    } else if (entry.isFile() && entry.name.endsWith(".astro")) {
      yield full;
    }
  }
}

interface DiscoveredSlot {
  slot: string;
  variant: string;
  title: string | null;
  slug: string | null;
}

function matchAttr(tag: string, name: string): string | null {
  // Quoted attribute value, double or single quotes.
  const re = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`);
  const m = tag.match(re);
  if (!m) return null;
  return m[1] ?? m[2] ?? null;
}

/**
 * Parse a single scroll-deck file for `<section data-slot data-variant>` tags.
 * Per-section attributes the scanner recognizes:
 *   - data-slot           (required) — e.g. "01", "01b", "05b"
 *   - data-variant        (required) — e.g. "enhanced-v2"
 *   - data-slot-title     (optional) — human title; falls back to manual map / "Slot {N}"
 *   - data-slot-slug      (optional) — kebab id used for Play-UI file lookup
 */
async function scanScrollFile(absPath: string): Promise<DiscoveredSlot[]> {
  const src = await fs.readFile(absPath, "utf-8");
  const out: DiscoveredSlot[] = [];
  // Match each <section ...> opening tag, allowing newlines inside attributes.
  const tagRe = /<section\b([^>]*)>/gi;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(src)) !== null) {
    const tag = m[0];
    const slot = matchAttr(tag, "data-slot");
    const variant = matchAttr(tag, "data-variant");
    if (!slot || !variant) continue;
    out.push({
      slot,
      variant,
      title: matchAttr(tag, "data-slot-title"),
      slug: matchAttr(tag, "data-slot-slug"),
    });
  }
  return out;
}

/**
 * Scan every .astro file under `scrollPagesRoot` for slot annotations.
 * Returns a SlotsByVariant table where each variant's slots are sorted by
 * slot number (with letter-suffix ordering preserved, so "01" → "01b" → "01c").
 * Within a variant, duplicate (slot) keys are de-duped — first occurrence wins.
 */
export async function scanScrollDeckSlots(
  scrollPagesRoot: string,
): Promise<SlotsByVariant> {
  const byVariant: Record<string, Map<string, DiscoveredSlot>> = {};
  for await (const file of walkAstroFiles(scrollPagesRoot)) {
    const found = await scanScrollFile(file);
    for (const d of found) {
      if (!byVariant[d.variant]) byVariant[d.variant] = new Map();
      // First occurrence wins. A section that appears twice with the same
      // data-slot is almost certainly an authoring bug; logging would be
      // noisy, so we just keep the first.
      if (!byVariant[d.variant].has(d.slot)) {
        byVariant[d.variant].set(d.slot, d);
      }
    }
  }

  const out: SlotsByVariant = {};
  for (const [variant, slotMap] of Object.entries(byVariant)) {
    const slots = Array.from(slotMap.values()).sort((a, b) => compareSlotNumeric(a.slot, b.slot));
    out[variant] = slots.map((s) => ({
      slot: s.slot,
      title: s.title ?? "",
      slug: s.slug ?? "",
    }));
  }
  return out;
}

function compareSlotNumeric(a: string, b: string): number {
  const ra = /^(\d+)(.*)$/.exec(a);
  const rb = /^(\d+)(.*)$/.exec(b);
  const na = ra ? parseInt(ra[1], 10) : Number.MAX_SAFE_INTEGER;
  const nb = rb ? parseInt(rb[1], 10) : Number.MAX_SAFE_INTEGER;
  if (na !== nb) return na - nb;
  return (ra?.[2] ?? "").localeCompare(rb?.[2] ?? "");
}

/**
 * Load the slot registry.
 *
 * The scroll deck is the **source of truth for which slots exist** — every
 * `<section data-slot="X" data-variant="Y">` discovered under `scrollPagesRoot`
 * is registered. The hand-authored TS map at `slotsRegistryPath` is a
 * **title/slug supplement**: per-section `data-slot-title` and `data-slot-slug`
 * attributes win, then the manual map fills in, then defaults ("Slot {N}", "").
 *
 * A variant that exists in the manual map but has zero scanned sections is
 * still preserved (covers Play-UI-only variants and the transition period
 * before scroll pages get `data-slot` annotations).
 *
 * If neither source yields any slots, returns null — preserves the old
 * "registry missing" semantics callers used to handle.
 */
export async function loadSlotsRegistry(
  slotsRegistryPath: string,
  scrollPagesRoot?: string,
): Promise<{ SLOTS: SlotsByVariant } | null> {
  let manual: SlotsByVariant = {};
  try {
    const mod = await evalTsModule<{ SLOTS: SlotsByVariant }>(slotsRegistryPath);
    manual = mod.SLOTS ?? {};
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code !== "ENOENT") throw err;
  }

  const discovered = scrollPagesRoot ? await scanScrollDeckSlots(scrollPagesRoot) : {};

  const merged: SlotsByVariant = {};
  // Scanned variants — discovered slots win, manual map fills in titles/slugs.
  for (const [variant, slots] of Object.entries(discovered)) {
    const manualBySlot: Record<string, SlotRef> = {};
    for (const s of manual[variant] ?? []) manualBySlot[s.slot] = s;
    merged[variant] = slots.map((s) => ({
      slot: s.slot,
      title: s.title || manualBySlot[s.slot]?.title || `Slot ${s.slot}`,
      slug: s.slug || manualBySlot[s.slot]?.slug || "",
    }));
  }
  // Variants only in the manual map (no scroll-deck file or no annotations yet) — keep them.
  for (const [variant, slots] of Object.entries(manual)) {
    if (!merged[variant]) merged[variant] = slots;
  }

  if (Object.keys(merged).length === 0) return null;
  return { SLOTS: merged };
}

/** Lift a schema v1 audit registry into schema v2 in memory. The v1 entries
 *  carried a single `status` field — that surface was always Scroll-UI in
 *  Phase A+ (the pill was scroll-mounted only), so we re-home v1 ratings
 *  under `.scroll`. v2 callsites then see them unchanged. */
function migrateV1ToV2(v1: AuditRegistryV1): AuditRegistry {
  const ranks: Record<string, RankEntryV2> = {};
  for (const [key, entry] of Object.entries(v1.ranks)) {
    ranks[key] = { scroll: entry };
  }
  return { schema: 2, ranks };
}

export async function loadAuditRegistry(absPath: string): Promise<AuditRegistry> {
  try {
    const text = await fs.readFile(absPath, "utf-8");
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === "object") {
      if (parsed.schema === 2) {
        return parsed as AuditRegistry;
      }
      if (parsed.schema === 1) {
        return migrateV1ToV2(parsed as AuditRegistryV1);
      }
    }
    return { schema: 2, ranks: {} };
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "ENOENT") return { schema: 2, ranks: {} };
    throw err;
  }
}

export async function writeAuditRegistry(absPath: string, registry: AuditRegistry): Promise<void> {
  const sorted: AuditRegistry = {
    schema: 2,
    ranks: Object.fromEntries(Object.entries(registry.ranks).sort(([a], [b]) => a.localeCompare(b))),
  };
  await fs.mkdir(path.dirname(absPath), { recursive: true });
  await fs.writeFile(absPath, JSON.stringify(sorted, null, 2) + "\n", "utf-8");
}

/** Resolve the canonical "surface that was last rated" for a key, preferring
 *  Play-UI when both exist (it's downstream and more current). Returns null
 *  if the entry has no surface ratings. Used by legacy callsites that still
 *  expect a flat status. */
export function preferredSurfaceEntry(entry: RankEntryV2 | undefined): SurfaceRankEntry | undefined {
  if (!entry) return undefined;
  return entry.play ?? entry.scroll;
}

export async function perSlideFileExists(
  slidesComponentsRoot: string,
  variantSlug: string,
  slot: string,
  slug: string,
): Promise<boolean> {
  const filePath = path.join(slidesComponentsRoot, variantSlug, `${slot}-${slug}.astro`);
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function perSlideFilePath(
  slidesComponentsRoot: string,
  variantSlug: string,
  slot: string,
  slug: string,
): string {
  return path.join(slidesComponentsRoot, variantSlug, `${slot}-${slug}.astro`);
}
