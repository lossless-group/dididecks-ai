import { defineCollection, z } from 'astro:content';
import { readFile, glob as fsGlob } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parseFrontmatter } from '@loaders/frontmatter';
import { publicChildren, listFiles, readRemote } from '@loaders/github';

// ─── Lenient preprocessors: never throw on author-written frontmatter ─────

const lenientString = z.preprocess(
  (v) => (v === '' || v === null ? undefined : v),
  z.string().optional(),
);

const lenientStringArray = z.preprocess(
  (v) => {
    if (v === '' || v === null || v === undefined) return undefined;
    if (Array.isArray(v)) return v.map(String);
    if (typeof v === 'string') return [v];
    return v;
  },
  z.array(z.string()).optional(),
);

const lenientDate = z.preprocess(
  (v) => {
    if (v === undefined || v === null || v === '') return undefined;
    if (v instanceof Date) return Number.isNaN(v.getTime()) ? undefined : v;
    if (typeof v === 'number' || typeof v === 'string') {
      const t = String(v).trim();
      if (t === '' || t === '[]' || t === '~' || t.toLowerCase() === 'tbd') return undefined;
      const d = new Date(t);
      return Number.isNaN(d.getTime()) ? undefined : d;
    }
    return undefined;
  },
  z.date().optional(),
);

const lenientBoolean = z.preprocess(
  (v) => (v === '' || v === null ? undefined : v),
  z.boolean().optional(),
);

const schema = z
  .object({
    /** `dididecks-ai` for this repo's own entries, the child's slug otherwise. */
    from: lenientString,
    /** Path inside the originating repo. */
    from_path: lenientString,
    title: lenientString,
    lede: lenientString,
    summary: lenientString,
    date: lenientDate,
    date_created: lenientDate,
    date_modified: lenientDate,
    date_authored_initial_draft: lenientDate,
    date_authored_current_draft: lenientDate,
    date_first_published: lenientDate,
    at_semantic_version: lenientString,
    status: lenientString,
    category: lenientString,
    tags: lenientStringArray,
    authors: lenientStringArray,
    augmented_with: lenientStringArray,
    publish: lenientBoolean,
  })
  .passthrough();

// ─── Paths and filters ────────────────────────────────────────────────────

const REPO_ROOT = resolve(process.cwd(), '..');

/** Folders that never become pages: gitignored scratch, and the skill
 *  snapshot (those skills are published from lossless-agent-skills). */
const SKIP_DIRS = new Set(['extra', 'agent-skills']);

function keep(rel: string): boolean {
  const parts = rel.split('/');
  const name = parts[parts.length - 1];
  if (!name.endsWith('.md')) return false;
  if (name.toLowerCase() === 'readme.md' || name === 'index.md') return false;
  return !parts.slice(0, -1).some((p) => SKIP_DIRS.has(p));
}

// ─── Loader: this repo from disk, public children from the GitHub API ─────

function repoLoader(dir: 'changelog' | 'context-v') {
  return {
    name: `dididecks-${dir}`,
    load: async ({ store, parseData, renderMarkdown, logger }: any): Promise<void> => {
      store.clear();
      const counts: Record<string, number> = {};
      let held = 0;

      const add = async (from: string, rel: string, text: string) => {
        const { data, body } = parseFrontmatter(text);
        // Per-file opt-out, even in a public repo.
        if (data.publish === false || data.private === true) { held++; return; }
        const id = `${from}/${rel.replace(/\.md$/, '')}`;
        const merged = { ...data, from, from_path: `${dir}/${rel}` };
        let parsed: Record<string, unknown>;
        try {
          parsed = await parseData({ id, data: merged });
        } catch (err) {
          logger.warn(`schema fallback for ${id}: ${(err as Error).message}`);
          parsed = merged;
        }
        store.set({ id, data: parsed, body, rendered: await renderMarkdown(body) });
        counts[from] = (counts[from] ?? 0) + 1;
      };

      const local = resolve(REPO_ROOT, dir);
      try {
        for await (const rel of fsGlob('**/*.md', { cwd: local })) {
          if (keep(rel)) await add('dididecks-ai', rel, await readFile(resolve(local, rel), 'utf8'));
        }
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
      }

      for (const src of await publicChildren(REPO_ROOT)) {
        try {
          for (const f of await listFiles(src, dir)) {
            const rel = f.path.slice(dir.length + 1);
            if (keep(rel)) await add(src.slug, rel, await readRemote(f));
          }
        } catch (err) {
          logger.warn(`skipping ${src.slug}: ${(err as Error).message}`);
        }
      }

      const summary = Object.entries(counts).map(([k, n]) => `${k} ${n}`).join(', ');
      logger.info(`${summary || 'nothing'} (${held} held back by publish:false or private:true)`);
    },
  };
}

export const collections = {
  changelog: defineCollection({ loader: repoLoader('changelog'), schema }),
  'context-v': defineCollection({ loader: repoLoader('context-v'), schema }),
};
