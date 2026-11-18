/**
 * /llms-full.txt: every entry and doc as raw markdown for LLMs. The prose lives in
 * src/llms/*.md; this endpoint fills in the counts and lists. Ported from
 * ai-labs/splash.
 */

import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE_NAME } from '@lib/seo';
import { readProvenance, pickDate, pickString } from '@lib/provenance';
import template from '../llms/llms-full.md?raw';

type ChangelogEntry = CollectionEntry<'changelog'>;
type ContextVEntry = CollectionEntry<'context-v'>;
type AnyEntry =
  | { kind: 'changelog'; entry: ChangelogEntry }
  | { kind: 'context-v'; entry: ContextVEntry };

export const GET: APIRoute = async () => {
  const site = import.meta.env.SITE ?? 'https://lossless-group.github.io';
  const base = import.meta.env.BASE_URL ?? '/';
  const root = new URL(base, site).toString().replace(/\/$/, '');

  // Same gate-less behavior as the detail pages — render every entry.
  const changelog = await getCollection('changelog');
  const contextV = await getCollection('context-v');

  const merged: AnyEntry[] = [
    ...changelog.map((entry) => ({ kind: 'changelog' as const, entry })),
    ...contextV.map((entry) => ({ kind: 'context-v' as const, entry })),
  ];

  // Sort: by `from` first, then by kind (changelog before context-v within
  // the same peer), then by date desc within (kind, from). Stable enough
  // that the file's structure is predictable across builds.
  merged.sort((a, b) => {
    const aData = a.entry.data as Record<string, unknown>;
    const bData = b.entry.data as Record<string, unknown>;
    const aFrom = readProvenance(aData, 'dididecks-ai').from.toLowerCase();
    const bFrom = readProvenance(bData, 'dididecks-ai').from.toLowerCase();
    if (aFrom !== bFrom) return aFrom.localeCompare(bFrom);
    if (a.kind !== b.kind) return a.kind === 'changelog' ? -1 : 1;
    const ad = pickDate(aData, a.entry.id)?.getTime() ?? 0;
    const bd = pickDate(bData, b.entry.id)?.getTime() ?? 0;
    return bd - ad;
  });

  const allFroms = new Set<string>();

  const bodyParts: string[] = [];
  for (const item of merged) {
    const data = item.entry.data as Record<string, unknown>;
    const { from, fromPath } = readProvenance(data, 'dididecks-ai');
    allFroms.add(from);

    const title = pickString(data, 'title') ?? item.entry.id;
    const url = `${root}/${item.kind}/${item.entry.id}/`;
    const sourcePath = fromPath ?? item.entry.id;
    const date = pickDate(data, item.entry.id);

    bodyParts.push('---');
    bodyParts.push('');
    bodyParts.push(`## ${title}`);
    bodyParts.push('');
    bodyParts.push(`- Kind: \`${item.kind}\``);
    bodyParts.push(`- Source peer: \`${from}\``);
    bodyParts.push(`- Source path: \`${sourcePath}\``);
    bodyParts.push(`- Canonical URL: ${url}`);
    if (date) bodyParts.push(`- Last modified: ${date.toISOString().slice(0, 10)}`);
    bodyParts.push('');
    bodyParts.push(item.entry.body ?? '');
    bodyParts.push('');
  }

  const tokens: Record<string, string> = {
    SITE_NAME,
    CHANGELOG_COUNT: String(changelog.length),
    CONTEXTV_COUNT: String(contextV.length),
    REPO_COUNT: String(allFroms.size),
    LLMS_INDEX_URL: `${root}/llms.txt`,
    CORPUS_BODIES: bodyParts.join('\n').trimEnd(),
  };

  const body = template.replace(/\{\{(\w+)\}\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(tokens, name) ? tokens[name] : match,
  );

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
