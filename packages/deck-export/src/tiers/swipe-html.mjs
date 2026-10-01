/**
 * swipe-html — a horizontally-swiped deck in ONE .html file, with NO JavaScript.
 *
 * Why no JavaScript
 * -----------------
 * The target is a file dropped into WhatsApp and opened by someone who will
 * never log in. Those in-app document previews (iOS Quick Look, WhatsApp's
 * viewer) render HTML with **scripting disabled**. A JS-driven build fails
 * there in the worst possible way: the fixed 1920×1080 stage renders at full
 * size, anchored top-left, so the reader sees one giant letter and concludes
 * the deck is broken. That is exactly what happened to the previous attempt.
 *
 * So every behaviour here is CSS-only:
 *   • scaling      — `object-fit: contain` on an <img> in a flex-centred panel
 *   • paging       — CSS scroll-snap on a horizontal rail
 *   • rotate nag   — `@media (orientation: portrait)`
 *   • the hint     — a CSS animation that fades itself out
 *
 * The trade-off is deliberate: slides become images, so the text is not
 * selectable. In exchange the composition is pixel-identical to the PDF and
 * Keynote exports and cannot reflow, restyle or fail to scale on any renderer.
 * For an unattended artifact sent to a client, that reliability wins.
 */
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { dirname, join, basename } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { tmpdir } from "node:os";

const run = promisify(execFile);

/** Encode one PNG to WebP at `width`, returning a base64 data URI. */
async function encode(png, width, quality) {
  const out = join(tmpdir(), `deck-${basename(png, ".png")}-${Date.now()}.webp`);
  await run("cwebp", ["-quiet", "-q", String(quality), "-resize", String(width), "0", png, "-o", out]);
  const buf = await readFile(out);
  return { uri: `data:image/webp;base64,${buf.toString("base64")}`, bytes: buf.length };
}

const CSS = `
:root { --bg: #0b0b0c; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; height: 100%; background: var(--bg); overscroll-behavior: none; }

.rail {
  display: flex;
  height: 100vh;            /* fallback first for older engines */
  height: 100svh;           /* excludes iOS Safari's collapsing bars */
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.rail::-webkit-scrollbar { display: none; }

.panel {
  position: relative;
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  scroll-snap-align: center;
  scroll-snap-stop: always;    /* one slide per swipe — never skip two */
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}

/*
 * The entire scaling model, in three declarations and no script: the image
 * never exceeds the panel on either axis, and 'contain' preserves 16:9.
 */
.panel img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.num {
  position: absolute;
  right: max(0.7rem, env(safe-area-inset-right));
  bottom: max(0.5rem, env(safe-area-inset-bottom));
  font: 500 0.68rem/1 ui-sans-serif, -apple-system, system-ui, sans-serif;
  letter-spacing: 0.2em;
  color: rgb(255 255 255 / 0.42);
  pointer-events: none;
}

/* Fades itself out — a CSS animation needs no scroll listener. */
.hint {
  position: fixed;
  right: max(0.9rem, env(safe-area-inset-right));
  top: 50%;
  font: 500 0.8rem/1 ui-sans-serif, -apple-system, system-ui, sans-serif;
  letter-spacing: 0.06em;
  color: #fff;
  background: rgb(0 0 0 / 0.42);
  padding: 0.5rem 0.72rem;
  border-radius: 999px;
  z-index: 20;
  pointer-events: none;
  animation: nudge 1.6s ease-in-out 3, fade 0.6s ease 5s forwards;
}
@keyframes nudge { 0%,100% { transform: translate(0,-50%); } 50% { transform: translate(-7px,-50%); } }
@keyframes fade  { to { opacity: 0; } }

/* ── portrait: deliberately unsatisfying, so the reader rotates ────────── */
.nag { display: none; }
@media (orientation: portrait) {
  .nag {
    position: fixed; inset: 0; z-index: 40;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 0.35rem; text-align: center; padding: 2rem;
    background: rgb(11 11 12 / 0.88);
    color: #fff;
    font-family: ui-sans-serif, -apple-system, system-ui, sans-serif;
  }
  .nag svg { animation: tip 2.2s ease-in-out infinite; opacity: 0.9; }
  .nag b { display: block; margin-top: 0.7rem; font-size: 1.05rem; font-weight: 600; }
  .nag span { font-size: 0.85rem; color: rgb(255 255 255 / 0.62); }
  .hint { display: none; }
}
@keyframes tip { 0%,55%,100% { transform: rotate(0deg); } 70%,90% { transform: rotate(-90deg); } }

@media (prefers-reduced-motion: reduce) {
  .hint, .nag svg { animation: none; }
}
`;

export async function buildSwipeHtml({
  slideDir,
  outFile,
  title = "Deck",
  width = 2560,
  quality = 88,
  variant = null,
  log = console.log,
}) {
  const all = (await readdir(slideDir)).filter((f) => f.endsWith(".png")).sort();
  const files = variant ? all.filter((f) => f.includes(`-${variant}.`)) : all;
  if (!files.length) throw new Error(`no PNG slides in ${slideDir}${variant ? ` for variant ${variant}` : ""}`);

  const panels = [];
  let total = 0;
  for (const [i, f] of files.entries()) {
    const { uri, bytes } = await encode(join(slideDir, f), width, quality);
    total += bytes;
    const n = String(i + 1).padStart(2, "0");
    panels.push(
      `    <section class="panel">\n` +
      `      <img src="${uri}" alt="Slide ${n} of ${files.length}" />\n` +
      `      <span class="num">${n} / ${files.length}</span>\n` +
      `    </section>`,
    );
    log(`    ${f} → ${(bytes / 1024).toFixed(0)} KB`);
  }

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="robots" content="noindex, nofollow" />
<title>${title}</title>
<style>${CSS}</style>
</head>
<body>
<div class="nag" aria-hidden="true">
  <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.4">
    <rect x="4" y="2" width="16" height="20" rx="2.5" /><path d="M9 19h6" />
  </svg>
  <b>Turn your phone sideways</b>
  <span>This deck is built for landscape.</span>
</div>
<main class="rail">
${panels.join("\n")}
</main>
<div class="hint" aria-hidden="true">Swipe &rarr;</div>
</body>
</html>
`;

  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, html, "utf8");
  const bytes = Buffer.byteLength(html, "utf8");
  log(`  wrote ${outFile} — ${(bytes / 1024 / 1024).toFixed(2)} MB (${files.length} slides, ` +
      `${(total / 1024 / 1024).toFixed(2)} MB of WebP), zero JavaScript`);
  return { outFile, bytes, slides: files.length };
}
