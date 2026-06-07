/**
 * Deck-overview loader — registry + filesystem walker.
 *
 * Powers a consumer's landing dashboard with:
 *   - Tile counts (variants, slot files, etc.)
 *   - The slot × variant matrix showing which slots are ported to static
 *     play format for which variants.
 *
 * Promoted from chroma-decks/src/lib/deck-overview.ts on 2026-06-06
 * (plan: dididecks-ai/context-v/plans/
 *         Lift-Chroma-Decks-Generic-Code-into-Shared-Shell.md, Phase 4).
 *
 * Differences from the chroma original:
 *   - Reads `decksRegistryPath` + `slidesComponentsRoot` from the
 *     resolved shell options on `globalThis.__dididecksShellOptions`,
 *     rather than importing the consumer's TS registries directly.
 *     This lets ANY client-site consume the same function without the
 *     shell knowing the consumer's import paths.
 *   - Chroma's substantiation counts (people, headshots, investor firms,
 *     portfolio companies) are dropped — those are client-specific
 *     substantiation layers. Each client implements its own counts on
 *     top of this base if it needs them.
 *
 * Consumer integration:
 *
 *   import { loadDeckOverview } from "@dididecks/shell/lib/deck-overview";
 *   const overview = await loadDeckOverview("pitch");
 */

import fs from "node:fs";
import path from "node:path";
import { loadDecksRegistry, loadSlotsRegistry } from "../registry-loader.js";
import type { Deck } from "../types/index.js";

function exists(p: string): boolean {
  try { return fs.existsSync(p); } catch { return false; }
}

function readDirSafe(p: string): string[] {
  try { return fs.readdirSync(p); } catch { return []; }
}

function isStaticPortFile(absPath: string): boolean {
  try {
    const s = fs.readFileSync(absPath, "utf-8");
    const importsCanvas = /import\s+SlideCanvas\b/.test(s);
    const wrapsCanvas   = /<SlideCanvas[\s>]/.test(s);
    const hasScript     = /<script\b/.test(s);
    return importsCanvas && wrapsCanvas && !hasScript;
  } catch { return false; }
}

export interface SlotPortStatus {
  slot: string;
  variant: string;
  title?: string;
  slug?: string;
  fileExists: boolean;
  filePath?: string;
  isStaticPort: boolean;
  isRegistered: boolean;
}

export interface VariantSummary {
  slug: string;
  label: string;
  status: string;
  lastUpdated: string;
  registeredSlotCount: number;
  authoredSlotCount: number;
  staticPortCount: number;
  slots: SlotPortStatus[];
}

export interface DeckOverview {
  deckSlug: string;
  deckTitle: string;
  variants: VariantSummary[];
  unionOfSlotNumbers: string[];
  totals: {
    deckCount: number;
    variantCount: number;
    authoredSlotFiles: number;
    registeredSlots: number;
    staticPorted: number;
  };
}

export async function loadDeckOverview(deckSlug = "pitch"): Promise<DeckOverview> {
  const opts = globalThis.__dididecksShellOptions;
  if (!opts) {
    throw new Error(
      "@dididecks/shell/lib/deck-overview: shell options not resolved. " +
      "Did the dididecksShell({...}) integration run at astro:config:setup?",
    );
  }

  const { DECKS } = await loadDecksRegistry(opts.absolute.decksRegistry);
  const slotsMod = await loadSlotsRegistry(opts.absolute.slotsRegistry, opts.absolute.scrollPagesRoot);
  const SLOTS = slotsMod?.SLOTS ?? {};

  const deck = (DECKS as Deck[]).find((d) => d.slug === deckSlug);
  if (!deck) throw new Error(`Deck not found: ${deckSlug}`);

  const slidesRoot = opts.absolute.slidesComponentsRoot;

  const variants: VariantSummary[] = deck.variants.map((v) => {
    const variantDir = path.join(slidesRoot, v.slug);
    const filesInDir = readDirSafe(variantDir).filter((f) => f.endsWith(".astro"));
    const registered = SLOTS[v.slug] ?? [];

    const byNumber = new Map(registered.map((r) => [r.slot, r]));
    const slotIds = new Set<string>(registered.map((r) => r.slot));
    for (const f of filesInDir) {
      const m = f.match(/^(\d+[a-z]?)-/);
      if (m) slotIds.add(m[1]);
    }
    const orderedSlotIds = Array.from(slotIds).sort((a, b) => {
      const na = parseInt(a, 10);
      const nb = parseInt(b, 10);
      if (na !== nb) return na - nb;
      return a.localeCompare(b);
    });

    let staticPortCount = 0;
    const slots: SlotPortStatus[] = orderedSlotIds.map((slotId) => {
      const ref = byNumber.get(slotId);
      const slug = ref?.slug;
      const expectedFile = slug ? `${slotId}-${slug}.astro` : null;
      const matchedFile =
        expectedFile && filesInDir.includes(expectedFile)
          ? expectedFile
          : filesInDir.find((f) => f.startsWith(`${slotId}-`));

      const absPath = matchedFile ? path.join(variantDir, matchedFile) : "";
      const fileExists = Boolean(matchedFile);
      const isStatic = fileExists && exists(absPath) && isStaticPortFile(absPath);
      if (isStatic) staticPortCount++;

      return {
        slot: slotId,
        variant: v.slug,
        title: ref?.title,
        slug: ref?.slug,
        fileExists,
        filePath: matchedFile,
        isStaticPort: isStatic,
        isRegistered: byNumber.has(slotId),
      };
    });

    return {
      slug: v.slug,
      label: v.label,
      status: v.status,
      lastUpdated: v.lastUpdated,
      registeredSlotCount: registered.length,
      authoredSlotCount: filesInDir.length,
      staticPortCount,
      slots,
    };
  });

  const unionSet = new Set<string>();
  for (const v of variants) for (const s of v.slots) unionSet.add(s.slot);
  const unionOfSlotNumbers = Array.from(unionSet).sort((a, b) => {
    const na = parseInt(a, 10);
    const nb = parseInt(b, 10);
    if (na !== nb) return na - nb;
    return a.localeCompare(b);
  });

  const authoredSlotFiles = variants.reduce((sum, v) => sum + v.authoredSlotCount, 0);
  const registeredSlots   = variants.reduce((sum, v) => sum + v.registeredSlotCount, 0);
  const staticPorted      = variants.reduce((sum, v) => sum + v.staticPortCount, 0);

  return {
    deckSlug: deck.slug,
    deckTitle: deck.title,
    variants,
    unionOfSlotNumbers,
    totals: {
      deckCount: (DECKS as Deck[]).length,
      variantCount: deck.variants.length,
      authoredSlotFiles,
      registeredSlots,
      staticPorted,
    },
  };
}
