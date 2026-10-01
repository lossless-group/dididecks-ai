#!/usr/bin/env node
/**
 * deck-export — every export tier for a DidiDecks client-site, from one CLI.
 *
 *   slides    per-slide PNG (opaque + transparent) and vector SVG
 *   pdf       one vector-text PDF per variant
 *   pptx      one image-backed PPTX per variant
 *   keynote   convert those PPTX files to .key (macOS + Keynote only)
 *   elements  the component asset library + manifest + contact sheet
 *   swipe     ONE .html file, NO JavaScript — slides as images on a CSS
 *             snap rail; works in previewers that disable scripting
 *   html      ONE self-contained .html file (styles, fonts and images
 *             embedded) — for sending a deck to someone who will not log in
 *   all       slides → pdf → pptx → elements (keynote stays opt-in)
 *
 * The exporter drives a RUNNING site over HTTP and never imports its source,
 * so it works against `astro dev`, `astro preview`, or a deployed URL, and
 * needs no knowledge of how a given client-site organises its slides.
 *
 * Usage:
 *   deck-export all \
 *     --base-url http://localhost:4321 \
 *     --site-root ../../client-sites/calmstorm-decks \
 *     --pattern '/dev/shot/{slot}/{variant}' \
 *     --slots 01-17 --variants v1,v2,v3 \
 *     --deck-name calmstorm-teaser
 *
 *   deck-export elements --site-root <path> --assets '{"logos":["src/assets"]}'
 *
 * Exit codes: 0 success, 1 usage/precondition error, 2 partial (some tiers
 * failed but others produced output).
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import { expandSlots, routesFromPattern, routesFromFile } from "./routes.mjs";
import { captureSlides, stitchVariantPdfs, pruneSlidePdfs } from "./tiers/slides.mjs";
import { buildImagePptx } from "./tiers/pptx.mjs";
import { convertAll, keynoteAvailable } from "./tiers/keynote.mjs";
import { collectAssets } from "./tiers/assets.mjs";
import { exportSingleFile } from "./tiers/singlefile.mjs";
import { buildSwipeHtml } from "./tiers/swipe-html.mjs";
import { auditTypography, reportTypography, auditHeadroom } from "./tiers/typography.mjs";
import { runCodemod, reportCodemod } from "./codemods/type-scale.mjs";

const HELP = `
deck-export — DidiDecks export tiers

COMMANDS
  slides     per-slide PNG (opaque + transparent) + vector SVG
  pdf        vector-text PDF per variant  (implies slides)
  pptx       image-backed PPTX per variant (implies slides)
  keynote    convert existing PPTX to .key (macOS + Keynote required)
  elements   component asset library + manifest + contact sheet
  audit-type type-size audit in POINTS against presentation floors
  retype     codemod ad-hoc font sizes onto the --dt-* type scale
  all        slides + pdf + pptx + elements

OPTIONS
  --base-url <url>       running site (default http://localhost:4321)
  --site-root <path>     client-site repo root (default cwd)
  --out <path>           output dir (default <site-root>/exports/<timestamp>)
  --routes <file.json>   explicit route list (overrides --pattern)
  --pattern <template>   URL template with {slot} / {variant}
  --slots <spec>         e.g. 01-17 or 01,05,09       (default 01-17)
  --variants <list>      e.g. v1,v2,v3                (default v1)
  --deck-name <name>     filename stem                (default deck)
  --assets <json>        {"category":["dir",...]} for the elements tier
  --scale <n>            raster device scale          (default 2)
  --no-transparent       skip transparent PNG pass
  --no-vector            skip SVG conversion
  --headroom             (audit-type) also measure per-slide scale headroom
  --dry-run              (retype) report the mapping without writing
  --keep-slide-pdfs      retain per-slide PDFs after stitching
  -h, --help             this text
`;

/**
 * Flags that never take a value.
 *
 * Without this list, "consume the next token unless it starts with --" turns
 * `retype --dry-run slide.astro` into `{"dry-run": "slide.astro"}`: the flag
 * reads as a string (so a `=== true` check fails and the run is NOT a dry run)
 * AND the file is eaten from the positional list. That bug wrote files during
 * what was supposed to be a preview. Boolean flags must be declared.
 */
const BOOLEAN_FLAGS = new Set(["help", "dry-run", "headroom", "keep-slide-pdfs", "force"]);

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-h" || a === "--help") args.help = true;
    else if (a.startsWith("--no-")) args[a.slice(5)] = false;
    else if (a.startsWith("--")) {
      const key = a.slice(2);
      if (BOOLEAN_FLAGS.has(key)) {
        args[key] = true;
        continue;
      }
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) args[key] = true;
      else {
        args[key] = next;
        i++;
      }
    } else args._.push(a);
  }
  return args;
}

const camel = (o, k, d) => o[k] ?? d;

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0];

  if (args.help || !cmd) {
    console.log(HELP);
    process.exit(args.help ? 0 : 1);
  }

  const VALID = ["slides", "pdf", "pptx", "keynote", "elements", "html", "swipe", "audit-type", "retype", "all"];
  if (!VALID.includes(cmd)) {
    console.error(`Unknown command "${cmd}". One of: ${VALID.join(", ")}`);
    process.exit(1);
  }

  const siteRoot = resolve(camel(args, "site-root", process.cwd()));
  const baseUrl = camel(args, "base-url", "http://localhost:4321");
  const deckName = camel(args, "deck-name", "deck");
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outDir = resolve(camel(args, "out", join(siteRoot, "exports", stamp)));

  // `keynote` writes each .key beside its source .pptx, so it needs no output
  // directory — creating one would litter an empty timestamped dir per run.
  if (cmd !== "keynote") await mkdir(outDir, { recursive: true });

  const log = (m) => console.log(m);

  // ── tier: retype codemod ───────────────────────────────────────────────
  if (cmd === "retype") {
    const files = args._.slice(1);
    if (!files.length) {
      console.error(
        "Pass the slide files to rewrite, e.g.\n" +
          "  deck-export retype --dry-run src/slides/by-title/*-v3.astro",
      );
      process.exit(1);
    }
    const dryRun = args["dry-run"] === true;
    log(`\n▸ ${dryRun ? "Previewing" : "Applying"} type-scale codemod on ${files.length} file(s)`);
    const result = await runCodemod({ files: files.map((f) => resolve(f)), dryRun, log });
    reportCodemod(result, log);
    if (dryRun) log("\n  (dry run — nothing written)");
    return;
  }

  // ── tier: zero-JS swipe deck ───────────────────────────────────────────
  if (cmd === "swipe") {
    const slideDir = camel(args, "slide-dir", null);
    if (!slideDir) {
      console.error(
        'Pass the directory of rendered slide PNGs, e.g.\n' +
          "  deck-export swipe --slide-dir exports/v4-all/slides/png --variant v4",
      );
      process.exit(1);
    }
    const name = camel(args, "file-name", `${deckName}-swipe.html`);
    const outFile = join(outDir, name.endsWith(".html") ? name : `${name}.html`);
    log(`\n▸ Building zero-JavaScript swipe deck`);
    const result = await buildSwipeHtml({
      slideDir: resolve(slideDir),
      outFile,
      title: camel(args, "title", deckName),
      width: Number(camel(args, "image-width", 2560)),
      quality: Number(camel(args, "quality", 88)),
      variant: camel(args, "variant", null),
      log,
    });
    log(`\n  ✓ ${result.outFile}`);
    return;
  }

  // ── tier: single-file HTML ─────────────────────────────────────────────
  if (cmd === "html") {
    const route = camel(args, "route", null);
    if (!route) {
      console.error(
        'Pass the route to export, e.g.\n' +
          "  deck-export html --route /scroll/v4 --passcode $VIEWER_PASSCODE",
      );
      process.exit(1);
    }
    const name = camel(args, "file-name", `${deckName}.html`);
    const outFile = join(outDir, name.endsWith(".html") ? name : `${name}.html`);
    log(`\n▸ Exporting ${route} as a single self-contained file`);
    const result = await exportSingleFile({
      baseUrl,
      route,
      outFile,
      passcode: camel(args, "passcode", null),
      settleMs: Number(camel(args, "settle-ms", 2500)),
      log,
    });
    log(`\n  ✓ ${result.outFile}`);
    return;
  }

  const problems = [];
  const summary = { command: cmd, baseUrl, siteRoot, outDir, tiers: {} };

  const wantsSlides = ["slides", "pdf", "pptx", "audit-type", "all"].includes(cmd);

  // ── routes ─────────────────────────────────────────────────────────────
  let routes = [];
  if (wantsSlides) {
    if (args.routes) {
      routes = await routesFromFile(resolve(args.routes));
    } else {
      const pattern = camel(args, "pattern", null);
      if (!pattern) {
        console.error(
          "Need --routes <file.json> or --pattern '<template with {slot}/{variant}>'.",
        );
        process.exit(1);
      }
      routes = routesFromPattern({
        pattern,
        slots: expandSlots(camel(args, "slots", "01-17")),
        variants: String(camel(args, "variants", "v1")).split(","),
      });
    }
    log(`\n▸ ${routes.length} candidate route${routes.length === 1 ? "" : "s"} against ${baseUrl}`);
  }

  // ── tier: typography audit ─────────────────────────────────────────────
  if (cmd === "audit-type") {
    log("\n▸ Auditing typography");
    const result = await auditTypography({ routes, baseUrl, outDir, log });
    reportTypography(result, log);
    summary.tiers.auditType = result.totals;

    if (args.headroom) {
      log("\n▸ Measuring per-slide headroom (max font scale before overflow)");
      const headroom = await auditHeadroom({ routes, baseUrl, log });
      summary.tiers.headroom = headroom.map(({ id, maxScale, baselineOverflows }) => ({
        id, maxScale, baselineOverflows,
      }));
      const sorted = [...headroom].sort((a, b) => a.maxScale - b.maxScale);
      log("\n  ── Headroom, tightest slides first ────────────────────────────");
      for (const h of sorted) {
        const verdict =
          h.maxScale >= 1.6 ? "roomy" :
          h.maxScale >= 1.3 ? "workable" :
          h.maxScale >= 1.15 ? "tight" : "full — needs content cuts";
        log(`     ${h.id.padEnd(10)} ×${h.maxScale.toFixed(2)}  ${verdict}${h.baselineOverflows ? "  [ALREADY OVERFLOWS]" : ""}`);
      }
      const median = sorted.length ? sorted[Math.floor(sorted.length / 2)].maxScale : 0;
      log(`\n     median headroom ×${median.toFixed(2)} · tightest ×${sorted[0]?.maxScale.toFixed(2)} · roomiest ×${sorted[sorted.length-1]?.maxScale.toFixed(2)}`);
    }
    await writeFile(join(outDir, "export-summary.json"), JSON.stringify(summary, null, 2));
    log(`\n✓ Output: ${outDir}`);
    return;
  }

  // ── tier: slides ───────────────────────────────────────────────────────
  let manifest = [];
  if (wantsSlides) {
    log("\n▸ Capturing slides");
    manifest = await captureSlides({
      routes,
      baseUrl,
      outDir,
      scale: Number(camel(args, "scale", 2)),
      vector: args.vector !== false,
      transparent: args.transparent !== false,
      log,
    });
    const got = manifest.filter((m) => !m.missing).length;
    const missing = manifest.length - got;
    log(`    ${got} captured, ${missing} absent`);
    summary.tiers.slides = { captured: got, missing };

    if (!got) {
      console.error(
        `\nNo slides captured. Is the site running at ${baseUrl}, and does the\n` +
          `--pattern match its capture route? (calmstorm: '/dev/shot/{slot}/{variant}',\n` +
          `and that route is dev-only — it 404s under \`astro preview\`/production.)`,
      );
      process.exit(1);
    }
  }

  // ── tier: pdf ──────────────────────────────────────────────────────────
  if (["pdf", "all"].includes(cmd)) {
    log("\n▸ Stitching vector PDFs");
    const pdfs = await stitchVariantPdfs({ manifest, outDir, log });
    summary.tiers.pdf = pdfs.map(({ variant, pages }) => ({ variant, pages }));
  }

  // ── tier: pptx ─────────────────────────────────────────────────────────
  let pptxFiles = [];
  if (["pptx", "all"].includes(cmd)) {
    log("\n▸ Building PPTX");
    pptxFiles = await buildImagePptx({ manifest, outDir, deckName, log });
    summary.tiers.pptx = pptxFiles.map(({ variant, slides }) => ({ variant, slides }));
  }

  // ── tier: keynote ──────────────────────────────────────────────────────
  if (cmd === "keynote") {
    const avail = await keynoteAvailable();
    if (!avail.ok) {
      console.error(`\nCannot produce .key — ${avail.reason}.`);
      console.error(
        "Keynote opens .pptx natively, so the PPTX from `deck-export pptx`\n" +
          "is usually a sufficient handoff.",
      );
      process.exit(1);
    }
    const targets = args._.slice(1);
    if (!targets.length) {
      console.error("Pass one or more .pptx paths: deck-export keynote a.pptx b.pptx");
      process.exit(1);
    }
    log("\n▸ Converting to Keynote");
    const { converted, failed } = await convertAll(targets.map((t) => resolve(t)), { log });
    summary.tiers.keynote = { converted: converted.length, failed: failed.length };
    if (failed.length) problems.push(`${failed.length} Keynote conversion(s) failed`);
  }

  // ── tier: elements ─────────────────────────────────────────────────────
  if (["elements", "all"].includes(cmd)) {
    log("\n▸ Collecting element library");
    let categories;
    if (args.assets) {
      try {
        categories = JSON.parse(args.assets);
      } catch (err) {
        console.error(`--assets must be JSON: ${err.message}`);
        process.exit(1);
      }
    } else {
      // Conventional locations across DidiDecks client-sites. Absent
      // directories are skipped silently by the walker.
      //
      // ORDER IS SIGNIFICANT: categories are nested (public/backdrops lives
      // inside public), and each file is claimed by the first category that
      // walks it. Most specific first, catch-alls last.
      categories = {
        backdrops: ["public/backdrops"],
        icons: ["src/components/icons", "src/assets/icons"],
        firms: ["src/assets/firms", "data/firms"],
        brand: ["public", "src/assets/brand"],
      };
    }
    const assets = await collectAssets({ categories, siteRoot, outDir, log });
    summary.tiers.elements = { count: assets.length };
  }

  if (cmd !== "keynote") {
    await writeFile(join(outDir, "export-summary.json"), JSON.stringify(summary, null, 2));
  }

  if (wantsSlides && !args["keep-slide-pdfs"] && ["pdf", "all"].includes(cmd)) {
    await pruneSlidePdfs(outDir);
  }

  if (cmd !== "keynote") log(`\n✓ Output: ${outDir}`);
  if (problems.length) {
    log(`\n! Completed with problems:\n  - ${problems.join("\n  - ")}`);
    process.exit(2);
  }
}

main().catch((err) => {
  console.error(`\n✗ ${err.stack || err.message}`);
  process.exit(1);
});
