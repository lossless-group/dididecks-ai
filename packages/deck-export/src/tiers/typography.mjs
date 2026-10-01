/**
 * Typography audit — how big is the type, really, in points on a real slide?
 *
 * ── The unit problem this exists to solve ─────────────────────────────────
 * Slides are authored in CSS px against a 1920×1080 stage, and `0.6rem` looks
 * innocuous in a stylesheet. But a 16:9 deck is 13.333in wide, so the stage is
 * 1920 / 13.333 = **144 px per inch**. A point is 1/72in, therefore:
 *
 *     points = px / 2
 *
 * That makes `0.6rem` (9.6px) into **4.8pt** — roughly a third the size of
 * legal fine print. Nothing in a stylesheet warns you about this; the number
 * only becomes alarming once converted into the unit presentations are
 * actually judged in.
 *
 * ── Thresholds ────────────────────────────────────────────────────────────
 * Conventional presentation-design floors, which this audit reports against:
 *   <12pt  unreadable — fails even on a laptop at arm's length
 *   <18pt  below the widely-cited presentation minimum
 *   <24pt  below comfortable body size for a projected or shared deck
 *
 * These matter more than usual for investor decks: the audience skews older
 * and frequently reads without reaching for glasses.
 *
 * ── What it measures ──────────────────────────────────────────────────────
 * Only elements that directly own visible text (a <div> wrapping a <p> is not
 * counted, the <p> is), so the distribution reflects text a reader actually
 * sees rather than the DOM's nesting depth. Sizes are read from the stage's
 * own coordinate space, before SlideCanvas's fit transform, so they are
 * design-space sizes independent of viewport.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

/** A 1920px-wide 16:9 stage is 13.333in → 144 px/in → 2 px per point. */
export const PX_PER_PT = 2;

export const THRESHOLDS = [
  { pt: 12, label: "unreadable" },
  { pt: 18, label: "below presentation minimum" },
  { pt: 24, label: "below comfortable body size" },
];

/**
 * Runs inside the page. Returns one record per text-owning element.
 * Kept dependency-free and self-contained — it is serialised to the browser.
 */
function collectTextMetrics() {
  const out = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);

  const describe = (el) => {
    const cls =
      typeof el.className === "string" && el.className.trim()
        ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".")
        : "";
    return el.tagName.toLowerCase() + cls;
  };

  let node = walker.currentNode;
  while (node) {
    // Text this element owns directly, not text belonging to descendants.
    let own = "";
    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) own += child.nodeValue;
    }
    own = own.replace(/\s+/g, " ").trim();

    if (own) {
      const cs = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      const invisible =
        cs.visibility === "hidden" ||
        cs.display === "none" ||
        Number(cs.opacity) === 0 ||
        rect.width === 0 ||
        rect.height === 0;

      if (!invisible) {
        out.push({
          selector: describe(node),
          px: Math.round(parseFloat(cs.fontSize) * 100) / 100,
          weight: cs.fontWeight,
          letterSpacing: cs.letterSpacing,
          textTransform: cs.textTransform,
          chars: own.length,
          sample: own.slice(0, 60),
        });
      }
    }
    node = walker.nextNode();
  }
  return out;
}

/** Audit every route; returns { perSlide, bySize, totals }. */
export async function auditTypography({
  routes,
  baseUrl,
  outDir,
  width = 1920,
  height = 1080,
  log = console.log,
}) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.emulateMedia({ media: "screen" });

  const perSlide = [];

  for (const route of routes) {
    const url = new URL(route.url, baseUrl).toString();
    let res;
    try {
      res = await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    } catch {
      continue;
    }
    if (!res || !res.ok()) continue;
    await page.waitForTimeout(300);

    const records = await page.evaluate(collectTextMetrics);
    for (const r of records) r.pt = Math.round((r.px / PX_PER_PT) * 10) / 10;

    perSlide.push({ ...route, records });
    const worst = records.length ? Math.min(...records.map((r) => r.pt)) : null;
    log(
      `    ${route.id}: ${String(records.length).padStart(3)} text runs, smallest ${
        worst === null ? "—" : worst + "pt"
      }`,
    );
  }

  await browser.close();

  // ── aggregate by distinct size ───────────────────────────────────────────
  const bySize = new Map();
  for (const slide of perSlide) {
    for (const r of slide.records) {
      const key = r.px;
      if (!bySize.has(key)) {
        bySize.set(key, {
          px: r.px,
          pt: r.pt,
          runs: 0,
          chars: 0,
          selectors: new Map(),
          samples: [],
        });
      }
      const e = bySize.get(key);
      e.runs++;
      e.chars += r.chars;
      e.selectors.set(r.selector, (e.selectors.get(r.selector) ?? 0) + 1);
      if (e.samples.length < 3) e.samples.push(r.sample);
    }
  }

  const sizes = [...bySize.values()]
    .map((e) => ({
      ...e,
      selectors: [...e.selectors.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([sel, n]) => `${sel} ×${n}`),
    }))
    .sort((a, b) => a.px - b.px);

  const totalRuns = sizes.reduce((n, s) => n + s.runs, 0);
  const totalChars = sizes.reduce((n, s) => n + s.chars, 0);

  const totals = {
    slidesAudited: perSlide.length,
    distinctSizes: sizes.length,
    totalRuns,
    totalChars,
    thresholds: THRESHOLDS.map((t) => {
      const under = sizes.filter((s) => s.pt < t.pt);
      return {
        ...t,
        runs: under.reduce((n, s) => n + s.runs, 0),
        chars: under.reduce((n, s) => n + s.chars, 0),
        pctRuns: totalRuns ? Math.round((under.reduce((n, s) => n + s.runs, 0) / totalRuns) * 100) : 0,
        pctChars: totalChars ? Math.round((under.reduce((n, s) => n + s.chars, 0) / totalChars) * 100) : 0,
      };
    }),
  };

  if (outDir) {
    await mkdir(outDir, { recursive: true });
    await writeFile(
      join(outDir, "typography-audit.json"),
      JSON.stringify({ generated: new Date().toISOString(), totals, sizes, perSlide }, null, 2),
    );
  }

  return { perSlide, sizes, totals };
}

/** Console report — the shape a human needs to make a decision. */
export function reportTypography({ sizes, totals }, log = console.log) {
  log("\n  ── Type scale, in points on a 13.333in slide ──────────────────");
  log("     pt      px   runs   chars  where");
  for (const s of sizes) {
    const flag = s.pt < 12 ? "✗✗" : s.pt < 18 ? "✗ " : s.pt < 24 ? "· " : "  ";
    log(
      `  ${flag} ${String(s.pt).padStart(5)} ${String(s.px).padStart(7)} ${String(s.runs).padStart(6)} ${String(
        s.chars,
      ).padStart(7)}  ${s.selectors.slice(0, 3).join(", ")}`,
    );
  }
  log("\n  ── Share of text below each floor ─────────────────────────────");
  for (const t of totals.thresholds) {
    log(
      `     under ${String(t.pt).padStart(2)}pt (${t.label}): ` +
        `${t.runs}/${totals.totalRuns} runs (${t.pctRuns}%), ${t.pctChars}% of all characters`,
    );
  }
  log(
    `\n     ${totals.slidesAudited} slides · ${totals.distinctSizes} distinct sizes · ${totals.totalRuns} text runs`,
  );
}

/**
 * Headroom audit — how much can type grow on this slide before it breaks?
 *
 * The typography audit says the type is too small. This says what it would
 * COST to fix, per slide, which is the number that actually drives the work.
 *
 * Method: scale every element's computed font-size by k, then check whether
 * the slide still fits its 1920×1080 stage. Binary-search the largest k that
 * fits. A slide reporting 1.8 can absorb an 80% type increase with no layout
 * change at all; a slide reporting 1.05 is already full, and enlarging its
 * type means cutting content or redesigning it.
 *
 * Only font-size is scaled — padding, gaps, and fixed positions stay put.
 * That is deliberate: it isolates "is there room for bigger text" from "does
 * the whole composition scale", which are different questions with different
 * fixes.
 */
export async function auditHeadroom({
  routes,
  baseUrl,
  minScale = 1.0,
  maxScale = 3.0,
  iterations = 7,
  width = 1920,
  height = 1080,
  log = console.log,
}) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.emulateMedia({ media: "screen" });

  const results = [];

  for (const route of routes) {
    const url = new URL(route.url, baseUrl).toString();
    let res;
    try {
      res = await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    } catch {
      continue;
    }
    if (!res || !res.ok()) continue;
    await page.waitForTimeout(300);

    const fits = await page.evaluate(
      async ([lo, hi, iters]) => {
        const stage = document.querySelector(".slide-canvas__stage");
        if (!stage) return null;

        // Snapshot original sizes once, so each probe starts from truth.
        const originals = [];
        for (const el of stage.querySelectorAll("*")) {
          originals.push([el, parseFloat(getComputedStyle(el).fontSize)]);
        }

        const apply = (k) => {
          for (const [el, size] of originals) el.style.fontSize = `${size * k}px`;
        };

        /*
         * Only TEXT escaping the stage counts as overflow.
         *
         * An earlier version tested every element and produced false
         * positives on every slide: decorative hairlines, full-bleed plate
         * marks, and the backdrop layer all legitimately reach or cross the
         * stage edge by design. That made slides look "already broken" when
         * no reader would ever see a problem, and it understated headroom
         * because the binary search inherited the same bad test.
         *
         * Two things genuinely break a slide when type grows:
         *   1. text whose box leaves the stage, and
         *   2. text clipped by an ancestor that hides its overflow.
         */
        const ownsText = (el) => {
          for (const c of el.childNodes) {
            if (c.nodeType === Node.TEXT_NODE && c.nodeValue.trim()) return true;
          }
          return false;
        };

        const overflows = () => {
          const sr = stage.getBoundingClientRect();
          const TOL = 2;
          for (const el of stage.querySelectorAll("*")) {
            if (!ownsText(el)) continue;
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;
            if (r.bottom > sr.bottom + TOL || r.top < sr.top - TOL) return true;
            if (r.right > sr.right + TOL || r.left < sr.left - TOL) return true;

            // Clipped by an ancestor that hides overflow.
            for (let a = el.parentElement; a && a !== stage; a = a.parentElement) {
              const cs = getComputedStyle(a);
              if (cs.overflow === "hidden" || cs.overflowY === "hidden" || cs.overflowX === "hidden") {
                const ar = a.getBoundingClientRect();
                if (r.bottom > ar.bottom + TOL || r.right > ar.right + TOL) return true;
              }
            }
          }
          return false;
        };

        apply(1);
        const baselineBad = overflows();

        let good = lo, bad = hi;
        for (let i = 0; i < iters; i++) {
          const mid = (good + bad) / 2;
          apply(mid);
          if (overflows()) bad = mid; else good = mid;
        }
        apply(1);
        return { maxScale: Math.round(good * 100) / 100, baselineOverflows: baselineBad };
      },
      [minScale, maxScale, iterations],
    );

    if (!fits) continue;
    results.push({ ...route, ...fits });
    const flag = fits.baselineOverflows ? " (already overflows at 1.0)" : "";
    log(`    ${route.id}: can absorb ×${fits.maxScale.toFixed(2)}${flag}`);
  }

  await browser.close();
  return results;
}
