/**
 * Citation system types + helpers (shell).
 *
 * Hex-code-based citations that convert to sequential display indices at
 * render time. Two surfaces consume the same dataset:
 *   - InlineCitation.astro  — in-text [n] marker + hover popover (Scroll-UI)
 *   - Sources.astro / SourcesPager.astro — static numbered list at the bottom
 *     (Play-UI / 16:9, no JS)
 *
 * Graduated into @dididecks/shell from the reach-edu-hub / dark-matter port so
 * every client deck inherits one citation mechanism.
 */

export interface CitationReference {
  /** 6-ish char stable alphanumeric id (e.g. "opus215"). NOT sequential. */
  hexCode: string;
  /** Sequential display index assigned at render time (1, 2, 3…). */
  index?: number;
  /** Title of the source article/document. */
  title: string;
  /** Full URL to the source. */
  url: string;
  /** ISO date the source was published. */
  publishedDate?: string;
  /** ISO date the source was last updated. */
  updatedDate?: string;
  /** ISO date the citation was captured/accessed. */
  accessDate?: string;
  /** Publication name or domain (e.g. "Bloomberg", "IBISWorld"). */
  source?: string;
}

export interface IndexedCitation extends CitationReference {
  index: number;
}

/** A value paired with its supporting citation. */
export interface CitableData<T = unknown> {
  data: T;
  citation?: CitationReference;
}

/**
 * Assign sequential display indices to unique hexCodes, in order of first
 * appearance. Pass the citations in the order they appear in the deck.
 */
export function buildCitationIndex(
  citations: (CitationReference | undefined)[],
): Map<string, IndexedCitation> {
  const indexMap = new Map<string, IndexedCitation>();
  citations.forEach((citation) => {
    if (citation && !indexMap.has(citation.hexCode)) {
      indexMap.set(citation.hexCode, { ...citation, index: indexMap.size + 1 });
    }
  });
  return indexMap;
}

export function getCitation(
  hexCode: string,
  indexMap: Map<string, IndexedCitation>,
): IndexedCitation | undefined {
  return indexMap.get(hexCode);
}

export function citationsToArray(
  indexMap: Map<string, IndexedCitation>,
): IndexedCitation[] {
  return [...indexMap.values()].sort((a, b) => a.index - b.index);
}

/** Format an ISO date for display in a citation. Empty string when absent. */
export function formatCitationDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
