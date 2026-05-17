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

export async function loadSlotsRegistry(
  absPath: string,
): Promise<{ SLOTS: SlotsByVariant } | null> {
  try {
    return await evalTsModule<{ SLOTS: SlotsByVariant }>(absPath);
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
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
