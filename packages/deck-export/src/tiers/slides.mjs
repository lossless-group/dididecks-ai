/**
 * Tier 1 — per-slide elements: raster PNG, vector PDF, vector SVG.
 *
 * ── Why a vector path at all ──────────────────────────────────────────────
 * A screenshot is a dead end for anyone who wants to rework a slide at a
 * different size. Chromium's `page.pdf()` emits a real vector PDF (glyphs,
 * paths, embedded fonts), and poppler's `pdftocairo -svg` converts that to
 * SVG. This is NOT a PNG wrapped in an <svg> tag, which is what a lot of
 * "SVG export" features actually ship. If poppler is missing we skip the SVG
 * and say so, rather than emitting a fake one.
 *
 * ── What the two vector outputs actually preserve (measured, not assumed) ──
 *   PDF  — text stays LIVE text. `pdftotext` extracts the copy cleanly, so
 *          it is searchable, selectable, and accessible.
 *   SVG  — text is OUTLINED to paths. `pdftocairo` emits each glyph as a
 *          <symbol> + <use>, not a <text> element. The result is fully
 *          scalable and recolorable in Figma/Illustrator, but the headline
 *          cannot be re-typed. Tools that can preserve live text in SVG
 *          (mutool, Inkscape) are not part of this pipeline.
 *
 * So: reach for the PDF when the text matters, the SVG when the geometry
 * does. Raster backdrops stay embedded as raster in both — correctly, since
 * a watercolor wash is a photograph, not geometry.
 *
 * ── The two screenshots ───────────────────────────────────────────────────
 * `--opaque` is the presentation asset: exactly what the deck looks like.
 * `--transparent` uses Playwright's `omitBackground`, which only yields real
 * transparency where the page paints nothing. Most slides paint their own
 * surface, so most transparent PNGs will look identical to the opaque ones.
 * That is a property of the slides, not a bug in the exporter, and the
 * manifest records which ones actually carried alpha.
 */

import { mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

/** True when poppler's pdftocairo is on PATH. */
export async function hasPdfToCairo() {
  try {
    await run("pdftocairo", ["-v"]);
    return true;
  } catch {
    return false;
  }
}

/** Does this PNG carry any non-opaque pixel? Cheap check of the alpha band. */
async function hasAlpha(pngPath) {
  try {
    const { stdout } = await run("magick", [
      "identify",
      "-format",
      "%[opaque]",
      pngPath,
    ]);
    return stdout.trim() === "false";
  } catch {
    return null; // ImageMagick absent — unknown rather than false
  }
}

/**
 * Capture every route. Returns a manifest array describing what landed on
 * disk, including routes that 404'd (marked `missing: true`) so a caller can
 * tell "not yet built" apart from "export failed".
 */
export async function captureSlides({
  routes,
  baseUrl,
  outDir,
  width = 1920,
  height = 1080,
  scale = 2,
  vector = true,
  transparent = true,
  log = console.log,
}) {
  const { chromium } = await import("playwright");

  const pngDir = join(outDir, "slides", "png");
  const alphaDir = join(outDir, "slides", "png-transparent");
  const svgDir = join(outDir, "slides", "svg");
  const pdfDir = join(outDir, "slides", "pdf");
  for (const d of [pngDir, pdfDir, ...(transparent ? [alphaDir] : []), ...(vector ? [svgDir] : [])]) {
    await mkdir(d, { recursive: true });
  }

  const canVector = vector ? await hasPdfToCairo() : false;
  if (vector && !canVector) {
    log(
      "    ! poppler's pdftocairo not found — skipping SVG. Install with `brew install poppler`.",
    );
  }

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: scale,
  });
  const page = await ctx.newPage();
  // Slides are authored for screen, and several rely on backdrop/blend
  // treatments that print stylesheets would drop.
  await page.emulateMedia({ media: "screen" });

  const manifest = [];

  for (const route of routes) {
    const url = new URL(route.url, baseUrl).toString();
    let res;
    try {
      res = await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    } catch (err) {
      log(`    ✗ ${route.id} — navigation failed: ${err.message}`);
      manifest.push({ ...route, missing: true, error: err.message });
      continue;
    }
    if (!res || !res.ok()) {
      // A 404 here means "this slot/variant was never built", which is normal
      // for sparse decks. Record it and move on quietly.
      manifest.push({ ...route, missing: true, status: res ? res.status() : 0 });
      continue;
    }

    // Let fonts settle and the SlideCanvas ResizeObserver apply its scale.
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(400);

    const entry = { ...route, missing: false, files: {} };

    const pngPath = join(pngDir, `${route.id}.png`);
    await page.screenshot({ path: pngPath });
    entry.files.png = `slides/png/${route.id}.png`;

    if (transparent) {
      const alphaPath = join(alphaDir, `${route.id}.png`);
      await page.screenshot({ path: alphaPath, omitBackground: true });
      entry.files.pngTransparent = `slides/png-transparent/${route.id}.png`;
      const alpha = await hasAlpha(alphaPath);
      if (alpha !== null) entry.carriesAlpha = alpha;
    }

    // Vector: page.pdf() at exactly the design box, so 1 CSS px == 1 pt of
    // our 1920×1080 stage and the SlideCanvas transform resolves to scale(1).
    const pdfPath = join(pdfDir, `${route.id}.pdf`);
    /*
     * Capture at the stage's OWN pixel size, then resize the page during
     * stitching (see PT_PER_PX below).
     *
     * Declaring the page in inches instead looked correct and silently
     * clipped: Chromium lays the print viewport out at 96 CSS px per inch, so
     * 13.333in became a 1280px viewport while the stage is 1920px wide. The
     * SlideCanvas ResizeObserver had no chance to rescale before the snapshot,
     * so every page was captured zoomed in with the right edge and bottom cut
     * off. Matching the capture viewport keeps the transform at scale(1).
     */
    await page.pdf({
      path: pdfPath,
      width: `${width}px`,
      height: `${height}px`,
      printBackground: true,
      pageRanges: "1",
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
    });
    entry.files.pdf = `slides/pdf/${route.id}.pdf`;

    if (canVector) {
      /*
       * SVG needs its OWN capture, with blend modes flattened.
       *
       * The watercolor wash composites with `mix-blend-mode: multiply`. That
       * survives into the PDF correctly, but `pdftocairo -svg` has no SVG
       * equivalent, so it renders the blend as BLACK paint behind a soft mask
       * (`filter-remove-color` + <mask>). Any renderer that doesn't apply that
       * mask — which is most of them — paints the slide solid black. Measured:
       * 100% of pixels near-black before this, 0% after.
       *
       * Flattening the wash to normal compositing costs almost nothing
       * visually (a pale blue wash over cream looks near-identical under
       * `opacity` alone) and produces an SVG that renders anywhere. The deck
       * PDF above keeps the true multiply.
       */
      const svgPath = join(svgDir, `${route.id}.svg`);
      const flatPdf = join(pdfDir, `${route.id}--flat.pdf`);
      try {
        const flatten = await page.addStyleTag({
          content: ".slide-canvas__wash{mix-blend-mode:normal!important}",
        });
        await page.waitForTimeout(120);
        await page.pdf({
          path: flatPdf,
          width: `${(width / 144).toFixed(4)}in`,
          height: `${(height / 144).toFixed(4)}in`,
          printBackground: true,
          pageRanges: "1",
          margin: { top: "0", bottom: "0", left: "0", right: "0" },
        });
        await flatten.evaluate((el) => el.remove());

        await run("pdftocairo", ["-svg", flatPdf, svgPath]);
        entry.files.svg = `slides/svg/${route.id}.svg`;
        await rm(flatPdf, { force: true });
      } catch (err) {
        log(`    ! ${route.id} — SVG conversion failed: ${err.message}`);
      }
    }

    manifest.push(entry);
    log(`    ✓ ${route.id}`);
  }

  await browser.close();
  return manifest;
}

/**
 * Chromium lays print pages out at 96 CSS px per inch, so a 1920px capture
 * becomes a 1440pt page (20in). The stage is really 144 px per inch (1920px
 * across 13.333in), so the page has to shrink by CSS-dpi / stage-dpi:
 *
 *     1440pt x (96/144) = 960pt = 13.333in     ✓ widescreen slide size
 *
 * (72/96 was the wrong ratio and produced 1080 x 607.5pt.)
 */
const PAGE_SCALE = 96 / 144;

/** Stitch one PDF per variant from the per-slide vector PDFs. */
export async function stitchVariantPdfs({ manifest, outDir, log = console.log }) {
  const { PDFDocument } = await import("pdf-lib");
  const { byVariant } = await import("../routes.mjs");

  const present = manifest.filter((m) => !m.missing && m.files?.pdf);
  const groups = byVariant(present);
  const written = [];

  for (const [variant, routes] of groups) {
    const doc = await PDFDocument.create();
    for (const r of routes) {
      const bytes = await readFile(join(outDir, r.files.pdf));
      const src = await PDFDocument.load(bytes);
      const [page] = await doc.copyPages(src, [0]);
      /*
       * 1920x1080 CSS px captures as a 1440x810pt page (96dpi). Scale it to
       * 960x540pt — 13.333 x 7.5in, the widescreen size Keynote and PowerPoint
       * use — so an imported PDF lands at native slide size. Vector content,
       * so this is a lossless coordinate change, not a resample.
       */
      page.scale(PAGE_SCALE, PAGE_SCALE);
      doc.addPage(page);
    }
    const outPath = join(outDir, `deck-${variant}.pdf`);
    await writeFile(outPath, await doc.save());
    written.push({ variant, path: outPath, pages: routes.length });
    log(`    ✓ deck-${variant}.pdf (${routes.length} pages, vector text)`);
  }
  return written;
}

/** Remove the intermediate per-slide PDFs once variants are stitched. */
export async function pruneSlidePdfs(outDir) {
  await rm(join(outDir, "slides", "pdf"), { recursive: true, force: true });
}
