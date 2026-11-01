import { toDate } from '@lib/date';

type Data = Record<string, unknown>;

/** Best date for sorting and display: last change first, then the drafting
 *  dates, then a YYYY-MM-DD in the file name (changelog/2026-10-28_01.md). */
export function entryDate(data: Data, id: string): Date | undefined {
  for (const k of ['date_modified', 'date_authored_current_draft', 'date_first_published', 'date', 'date_created', 'date_authored_initial_draft']) {
    const d = toDate(data[k]);
    if (d) return d;
  }
  const m = id.match(/(\d{4}-\d{2}-\d{2})/);
  return m ? toDate(m[1]) : undefined;
}

/** Title from frontmatter, else the file name with dashes as spaces. */
export function entryTitle(data: Data, id: string): string {
  if (typeof data.title === 'string' && data.title.trim()) return data.title;
  return (id.split('/').pop() ?? id).replace(/[-_]+/g, ' ');
}

/** Folder under context-v/ (specs, plans, …), or '' at its root. */
export function section(fromPath: unknown): string {
  const parts = String(fromPath ?? '').split('/');
  return parts.length > 2 ? parts[1] : '';
}

/** Where the file lives on GitHub. */
export function sourceUrl(from: unknown, fromPath: unknown): string {
  const repo = from === 'dididecks-ai' || !from ? 'dididecks-ai' : String(from);
  return `https://github.com/lossless-group/${repo}/blob/development/${fromPath ?? ''}`;
}
