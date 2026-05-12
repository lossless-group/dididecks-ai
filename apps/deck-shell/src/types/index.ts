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

export interface RankEntry {
  status: Exclude<Status, "pending">;
  rankedAt: string;
  rankedBy: string;
  notes: string | null;
}

export interface AuditRegistry {
  schema: 1;
  ranks: Record<string, RankEntry>;
}

export function buildRankKey(deckSlug: string, variantSlug: string, slot: string): string {
  return `${deckSlug}/${variantSlug}/${slot}`;
}
