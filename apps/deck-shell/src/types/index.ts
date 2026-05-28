export type Status =
  | "urgent-redo"
  | "non-urgent-could-be-better"
  | "passable"
  | "perfect"
  | "pending";

export const STATUSES: readonly Status[] = [
  "urgent-redo",
  "non-urgent-could-be-better",
  "passable",
  "perfect",
  "pending",
] as const;

export interface DididecksShellOptions {
  /** The client-site identifier — e.g. "chroma-decks". Logged + used in route titles. */
  client: string;

  /** Where the client's deck registry lives, relative to the client-site root. Default: "./src/data/decks.ts". */
  decksRegistryPath?: string;

  /** Where the client's slot registry lives, relative to the client-site root. Default: "./src/data/slides.ts". */
  slotsRegistryPath?: string;

  /** Where slide-ranking state persists, relative to the client-site root. Default: "./data/audits/slides.json". */
  auditsPath?: string;

  /** Where decomposition stubs land, relative to the client-site root. Default: "./src/components/slides". */
  slidesComponentsRoot?: string;

  /**
   * Where scroll-UI deck pages live, relative to the client-site root.
   * Default: "./src/pages/scroll".
   *
   * The shell scans every .astro file under this root for
   * `<section data-slot="…" data-variant="…">` tags and merges the
   * discovered slots into the slot registry. This makes the scroll deck
   * the source of truth for "which slots exist" — adding a new section
   * automatically surfaces it in the TOC matrix. The hand-authored map
   * at slotsRegistryPath becomes a title/slug supplement (not the
   * existence authority).
   */
  scrollPagesRoot?: string;

  /** Default tier resolver fallback for unmapped routes. Default: "private". Phase B fills this in. */
  distributionTier?: "private" | "shared" | "public";
}

export interface ResolvedShellOptions extends Required<DididecksShellOptions> {}

export interface VariantRef {
  slug: string;
  label: string;
  lede: string;
  status: string;
  lastUpdated: string;
}

export interface Deck {
  slug: string;
  format: string;
  title: string;
  lede: string;
  thumb: string;
  lastUpdated: string;
  status: string;
  variants: VariantRef[];
}

export interface SlotRef {
  /** Two-digit slot number, e.g. "01". */
  slot: string;
  /** Human-readable slot title for the TOC row. */
  title: string;
  /** Kebab-case slug used in per-slide file names: src/components/slides/{variant}/{slot}-{slug}.astro. */
  slug: string;
}

/** Map of variantSlug → ordered slot list. The client-site exports this from src/data/slides.ts (or wherever slotsRegistryPath points). */
export type SlotsByVariant = Record<string, SlotRef[]>;

/** The two surfaces a slide is rated on. See dididecks-ai/CLAUDE.md
 *  "Naming is fuzzy here — Scroll-UI vs. Play-UI" for the framing. */
export type Surface = "scroll" | "play";

export const SURFACES: readonly Surface[] = ["scroll", "play"] as const;

/** One surface's rating of one slot. */
export interface SurfaceRankEntry {
  status: Exclude<Status, "pending">;
  rankedAt: string;
  rankedBy: string;
  notes: string | null;
}

/** Per-(deck, variant, slot) rating — up to two surface entries. */
export type RankEntryV2 = Partial<Record<Surface, SurfaceRankEntry>>;

/** Transitional alias — pre-v2 callsites that don't yet care about
 *  surfaces continue to work against the inner shape. */
export type RankEntry = SurfaceRankEntry;

export interface AuditRegistry {
  schema: 2;
  ranks: Record<string, RankEntryV2>;
}

/** Schema v1 shape, retained for the migration reader only. */
export interface AuditRegistryV1 {
  schema: 1;
  ranks: Record<string, SurfaceRankEntry>;
}

export function buildRankKey(deckSlug: string, variantSlug: string, slot: string): string {
  return `${deckSlug}/${variantSlug}/${slot}`;
}
