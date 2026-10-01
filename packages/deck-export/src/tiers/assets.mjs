/**
 * Tier 2 — the component asset library.
 *
 * Everything the deck is built out of, as individually addressable files with
 * a manifest: brand marks, team headshots, portfolio logos, generated
 * backdrops, icons. The audience is a designer or agency who has been handed
 * "the deck" and needs the pieces — not the whole slide.
 *
 * ── Why a manifest and not just a folder ──────────────────────────────────
 * A folder of 120 PNGs named `favicon__Thymia.png` is not a library. The
 * manifest records, per asset: category, source path in the repo, pixel
 * dimensions, byte size, content hash, and whether it is vector. That is what
 * makes the set usable programmatically (a future PPTX native exporter needs
 * to resolve "the Thymia logo" to a path) and legible to a human (the contact
 * sheet is generated from the same data).
 *
 * The manifest is expected to reconcile 1:1 with files on disk. If it ever
 * claims more assets than were written, the dedupe below has a hole in it.
 *
 * ── Identity is content, not path ─────────────────────────────────────────
 * Client-sites duplicate assets across trees as a matter of course — calmstorm
 * keeps `src/assets/firms/` as a byte-identical 96-file subset of
 * `data/firms/`. Assets are therefore deduped by SHA-1 of their bytes: one
 * canonical copy is exported, and every other path carrying those same bytes
 * is listed in that entry's `alsoAt`. Nothing is lost, nothing is shipped
 * twice, and the manifest tells the truth about both.
 *
 * ── Source-of-truth discipline ────────────────────────────────────────────
 * Assets are COPIED out of the repo, never moved, and the manifest keeps the
 * original repo-relative path. The export is a snapshot; the repo stays
 * authoritative.
 */

import { mkdir, copyFile, writeFile, stat, readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, relative, extname, basename, sep } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);
const VECTOR = new Set([".svg"]);

/** Content hash — the identity an asset actually has, independent of path. */
async function hashFile(path) {
  return createHash("sha1").update(await readFile(path)).digest("hex");
}

/** Escape a literal for use inside a RegExp. */
function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Recursively list files under a directory, skipping noise. */
async function walk(dir, acc = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return acc; // directory absent — a site simply may not have this category
  }
  for (const e of entries) {
    if (e.name.startsWith(".") || e.name === "node_modules") continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

/** Pixel dimensions via ImageMagick; null when unavailable or non-raster. */
async function dimensions(path) {
  const ext = extname(path).toLowerCase();
  if (!RASTER.has(ext)) return null;
  try {
    const { stdout } = await run("magick", ["identify", "-format", "%wx%h", path]);
    const m = stdout.trim().match(/^(\d+)x(\d+)/);
    return m ? { width: Number(m[1]), height: Number(m[2]) } : null;
  } catch {
    return null;
  }
}

/**
 * Collect assets from a set of category → directory mappings.
 *
 * @param categories {Record<string, string[]>} category name → source dirs
 *   (absolute, or relative to siteRoot)
 */
export async function collectAssets({
  categories,
  siteRoot,
  outDir,
  log = console.log,
}) {
  const root = join(outDir, "elements");
  await mkdir(root, { recursive: true });

  const manifest = [];

  /*
   * Two distinct kinds of duplication have to be handled, and conflating them
   * produces a manifest that disagrees with what is on disk.
   *
   * 1. NESTED CATEGORIES — `brand` rooted at `public/` contains `backdrops`
   *    rooted at `public/backdrops/`. Same file, reached twice. Solved by
   *    claiming each source path for the FIRST category that walks it, which
   *    is why callers list the most specific category first.
   *
   * 2. DUPLICATED CONTENT AT DIFFERENT PATHS — client-sites routinely keep the
   *    same image in two trees (calmstorm has `src/assets/firms/` as a
   *    byte-identical 96-file subset of `data/firms/`). These have different
   *    source paths but identical bytes AND identical destination paths, so a
   *    naive copy silently overwrites while the manifest counts both.
   *    Solved by hashing content: one canonical copy lands, and the manifest
   *    entry records every source path that carries those bytes in `alsoAt`.
   */
  const claimed = new Set();      // absolute source paths already walked
  const byHash = new Map();       // content hash → manifest entry
  const usedDest = new Map();     // dest path → content hash that owns it

  for (const [category, dirs] of Object.entries(categories)) {
    const catDir = join(root, category);
    let found = 0;

    for (const d of dirs) {
      const abs = d.startsWith(sep) ? d : join(siteRoot, d);
      const files = await walk(abs);

      for (const file of files) {
        const ext = extname(file).toLowerCase();
        if (!RASTER.has(ext) && !VECTOR.has(ext)) continue;
        if (claimed.has(file)) continue;
        claimed.add(file);

        const hash = await hashFile(file);
        const sourcePath = relative(siteRoot, file);

        // Same bytes already exported — record the extra location, copy nothing.
        const existing = byHash.get(hash);
        if (existing) {
          (existing.alsoAt ??= []).push(sourcePath);
          continue;
        }

        // Preserve the sub-path under the source dir so
        // `portfolio/trademark__Thymia.png` doesn't collide with a
        // same-named file from another tree.
        const rel = relative(abs, file);
        let relOut = rel.split(sep).join("/");
        let dest = join(catDir, rel);

        // Different bytes competing for the same destination. Rare, but
        // silently overwriting is the one outcome we must not allow.
        if (usedDest.has(dest)) {
          const stem = basename(file, ext);
          relOut = relOut.replace(
            new RegExp(`${escapeRe(stem)}${escapeRe(ext)}$`),
            `${stem}--${hash.slice(0, 8)}${ext}`,
          );
          dest = join(catDir, relOut.split("/").join(sep));
          log(`    ! name collision on ${rel} — exported as ${relOut}`);
        }
        usedDest.set(dest, hash);

        await mkdir(join(dest, ".."), { recursive: true });
        await copyFile(file, dest);

        const s = await stat(file);
        const entry = {
          id: `${category}/${relOut}`,
          category,
          name: basename(file, ext),
          file: `elements/${category}/${relOut}`,
          sourcePath,
          format: ext.replace(".", ""),
          vector: VECTOR.has(ext),
          bytes: s.size,
          sha1: hash,
          ...((await dimensions(file)) ?? {}),
        };
        byHash.set(hash, entry);
        manifest.push(entry);
        found++;
      }
    }
    if (found) log(`    ✓ ${category}: ${found} asset${found === 1 ? "" : "s"}`);
    else log(`    · ${category}: none found`);
  }

  await writeFile(
    join(root, "manifest.json"),
    JSON.stringify({ generated: new Date().toISOString(), assets: manifest }, null, 2),
  );

  await writeFile(join(root, "index.html"), contactSheet(manifest));
  log(`    ✓ manifest.json + index.html (${manifest.length} assets)`);

  return manifest;
}

/** A browsable contact sheet so the library is legible without a tool. */
function contactSheet(manifest) {
  const byCat = new Map();
  for (const a of manifest) {
    if (!byCat.has(a.category)) byCat.set(a.category, []);
    byCat.get(a.category).push(a);
  }

  const sections = [...byCat.entries()]
    .map(([cat, items]) => {
      const cards = items
        .map(
          (a) => `
      <figure>
        <div class="thumb"><img src="${a.file.replace(/^elements\//, "")}" alt="${a.name}" loading="lazy" /></div>
        <figcaption>
          <strong>${a.name}</strong>
          <span>${a.format.toUpperCase()}${a.width ? ` · ${a.width}×${a.height}` : ""} · ${(a.bytes / 1024).toFixed(0)} KB</span>
        </figcaption>
      </figure>`,
        )
        .join("");
      return `<section><h2>${cat} <em>(${items.length})</em></h2><div class="grid">${cards}</div></section>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Deck element library</title>
<style>
  :root { color-scheme: light dark; --bg:#fbf8f1; --fg:#0f1215; --muted:#525868; --line:#e4ecf6; --card:#fff; }
  @media (prefers-color-scheme: dark) { :root { --bg:#0f1215; --fg:#f2f3f5; --muted:#b8b9bd; --line:#292f49; --card:#1a1f2b; } }
  * { box-sizing: border-box; }
  body { margin:0; padding:2.5rem clamp(1rem,4vw,3rem); background:var(--bg); color:var(--fg);
         font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif; }
  h1 { font-size:1.5rem; letter-spacing:-0.01em; margin:0 0 .35rem; }
  .lede { color:var(--muted); margin:0 0 2.5rem; max-width:60ch; }
  h2 { font-size:.75rem; text-transform:uppercase; letter-spacing:.18em; color:var(--muted);
       border-bottom:1px solid var(--line); padding-bottom:.6rem; margin:2.5rem 0 1.25rem; font-weight:600; }
  h2 em { font-style:normal; opacity:.6; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:1rem; }
  figure { margin:0; background:var(--card); border:1px solid var(--line); border-radius:8px; overflow:hidden; }
  .thumb { aspect-ratio:16/10; display:grid; place-items:center; padding:.75rem;
           background:repeating-conic-gradient(#0000 0% 25%, #8881 0% 50%) 50%/16px 16px; }
  .thumb img { max-width:100%; max-height:100%; object-fit:contain; }
  figcaption { padding:.6rem .7rem; border-top:1px solid var(--line); display:flex; flex-direction:column; gap:.15rem; }
  figcaption strong { font-size:.8rem; overflow-wrap:anywhere; }
  figcaption span { font-size:.7rem; color:var(--muted); }
</style></head>
<body>
  <h1>Deck element library</h1>
  <p class="lede">Every design element the deck is built from, exported individually.
     Machine-readable index in <code>manifest.json</code>; the repo remains the source of truth.</p>
  ${sections}
</body></html>`;
}
