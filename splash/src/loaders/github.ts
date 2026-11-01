// The only place this splash talks to GitHub. Same shape as
// client-portals-site's collections/_shared/github.ts: one tree call per
// source, then blobs by sha. Children are read at build time, never copied
// into this repo, so the same entry can't exist twice in the tree.
//
// Sources come from ../.gitmodules. A child is read only when it is provably
// public and not client work: this splash is public, and a client repo's own
// `publish: true` means "publish on the client's gated site", not here.
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export interface Source { slug: string; repo: string; ref: string }
export interface RemoteFile { source: Source; path: string; sha: string }

const API = 'https://api.github.com';
const token = () => process.env.GITHUB_TOKEN ?? process.env.GITHUB_API_TOKEN;

/** Containers whose children are never read, public or not. */
const DENIED_PREFIXES = ['client-sites/'];

async function gh(path: string, raw = false): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: raw ? 'application/vnd.github.raw' : 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'dididecks-ai-splash',
  };
  const t = token();
  if (t) headers.Authorization = `Bearer ${t}`;
  return fetch(`${API}${path}`, { headers });
}

function parseGitmodules(text: string): { path: string; url: string; branch?: string }[] {
  return text
    .split(/\[submodule /)
    .slice(1)
    .map((b) => ({
      path: b.match(/path\s*=\s*(.+)/)?.[1]?.trim() ?? '',
      url: b.match(/url\s*=\s*(.+)/)?.[1]?.trim() ?? '',
      branch: b.match(/branch\s*=\s*(.+)/)?.[1]?.trim(),
    }))
    .filter((m) => m.path && m.url);
}

/** Public, non-client children of dididecks-ai. Fails closed: anything that
 *  can't be shown to be public (404, network error, odd URL) is left out. */
export async function publicChildren(repoRoot: string): Promise<Source[]> {
  const text = await readFile(resolve(repoRoot, '.gitmodules'), 'utf8').catch(() => '');
  const out: Source[] = [];
  for (const m of parseGitmodules(text)) {
    if (DENIED_PREFIXES.some((p) => m.path.startsWith(p))) continue;
    const repo = m.url.match(/github\.com[/:]([^/]+\/.+?)(?:\.git)?$/)?.[1];
    if (!repo) { console.warn(`[github] skipping ${m.path}: not a GitHub remote`); continue; }
    try {
      const res = await gh(`/repos/${repo}`);
      const body = res.ok ? ((await res.json()) as { private?: boolean; default_branch?: string }) : null;
      if (body?.private !== false) { console.warn(`[github] skipping ${m.path}: ${repo} is not public`); continue; }
      out.push({ slug: m.path.split('/').pop()!, repo, ref: m.branch ?? body.default_branch ?? 'main' });
    } catch (err) {
      console.warn(`[github] skipping ${m.path}: ${(err as Error).message}`);
    }
  }
  return out;
}

/** Every file under `dir/` in a source at its ref's head. */
export async function listFiles(src: Source, dir: string): Promise<RemoteFile[]> {
  const head = await gh(`/repos/${src.repo}/commits/${encodeURIComponent(src.ref)}`);
  if (!head.ok) throw new Error(`GitHub ${head.status} resolving ${src.repo}@${src.ref}`);
  const sha = ((await head.json()) as { sha: string }).sha;
  const res = await gh(`/repos/${src.repo}/git/trees/${sha}?recursive=1`);
  if (!res.ok) throw new Error(`GitHub ${res.status} reading tree of ${src.repo}`);
  const tree = ((await res.json()) as { tree: { path: string; sha: string; type: string }[] }).tree;
  return tree
    .filter((e) => e.type === 'blob' && e.path.startsWith(`${dir}/`))
    .map((e) => ({ source: src, path: e.path, sha: e.sha }));
}

export async function readRemote(f: RemoteFile): Promise<string> {
  const res = await gh(`/repos/${f.source.repo}/git/blobs/${f.sha}`, true);
  if (!res.ok) throw new Error(`GitHub ${res.status} reading ${f.source.repo}/${f.path}`);
  return res.text();
}
