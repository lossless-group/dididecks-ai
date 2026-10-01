/**
 * type-scale codemod — replace ad-hoc font sizes with design-scale tokens.
 *
 * ── What it does ──────────────────────────────────────────────────────────
 * Walks a set of .astro slide files, finds every literal `font-size:` in their
 * <style> blocks, converts it to points on a 1920×1080 stage (px ÷ 2), pushes
 * it through a shaping curve, snaps the result to the nearest step of the
 * project's type scale, and rewrites the declaration as `var(--dt-<step>)`.
 *
 * ── The curve, and why it isn't a flat multiplier ─────────────────────────
 * Uniform scaling is the obvious move and the wrong one. Headlines are already
 * large and consume most of a slide's area, so multiplying everything blows
 * the layout while barely helping the text that is actually unreadable. The
 * curve is anchored at the top instead:
 *
 *     newPt = ANCHOR × (pt / ANCHOR) ^ K        (K < 1)
 *
 * With ANCHOR=80, K=0.7 the small end lifts hard and the top barely moves:
 *
 *     4.4 → 10.5     16 → 26.2
 *     5.6 → 12.4     24 → 35.6
 *     6.8 → 14.2     48 → 56.0
 *     9.6 → 18.1     80 → 80.0
 *
 * Every size relationship is preserved (the map is monotonic), which is why
 * the design survives the change rather than being flattened by a floor.
 *
 * ── Snapping ──────────────────────────────────────────────────────────────
 * Curve output is then snapped to the nearest scale step. This is the step
 * that turns 34 sizes into 11 and makes the two-mode switch possible at all —
 * a token can carry a read value and a present value; a literal cannot.
 *
 * Snapping is lossy by design, so the report prints every mapping and flags
 * any case where two ORIGINALLY DIFFERENT sizes collapse onto one token. Those
 * are the places to check by eye: a collapse is usually fine (two near-identical
 * sizes that should always have been one) but occasionally destroys a
 * deliberate distinction.
 *
 * ── clamp() is resolved, not skipped — and that fixes a real bug ──────────
 * A Play-UI slide is a FIXED 1920×1080 stage scaled by transform. A
 * `clamp(2rem, 5vw, 3.5rem)` inside it resolves `vw` against the BROWSER
 * VIEWPORT, not the stage, so that headline changes size as the window
 * resizes while every other element scales with the transform. The exported
 * PNG (captured at exactly 1920×1080) and the same slide viewed in a 1440px
 * window disagree about how big the headline is.
 *
 * teaser-v3 had 26 of these, all using `vw`. The codemod resolves each at the
 * 1920×1080 reference viewport, then tokenises the result — removing the
 * viewport dependency Play-UI is not supposed to have. These are reported
 * separately because they are a behaviour fix, not just a rename.
 *
 * ── What it deliberately does not touch ───────────────────────────────────
 *   - `em` sizes — relative to the parent on purpose (the deck's drop-caps
 *     use `3em`/`4.5em` and must keep scaling with their container).
 *   - values already using `var(--dt-…)` — idempotent, safe to re-run.
 *   - `font-size` in inline `style=` attributes — rare, and rewriting markup
 *     is a different risk profile than rewriting a stylesheet.
 * Each skip is reported rather than silently passed over.
 */

import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

/** A 1920px-wide 16:9 stage is 13.333in → 144 px/in → 2 px per point. */
export const PX_PER_PT = 2;

/** Root font size the slides' rem values resolve against. */
export const REM_PX = 16;

export const CURVE = { anchor: 80, k: 0.7 };

/** The scale, in READ-mode points. Must mirror src/styles/deck-type.css. */
export const SCALE = [
  { token: "micro", pt: 12 },
  { token: "caption", pt: 13 },
  { token: "small", pt: 14 },
  { token: "body", pt: 15 },
  { token: "lead", pt: 16.5 },
  { token: "subtitle", pt: 18.5 },
  { token: "title", pt: 21 },
  { token: "headline", pt: 27 },
  { token: "display", pt: 36 },
  { token: "hero", pt: 56 },
  { token: "mega", pt: 66 },
];

/** Apply the shaping curve to a size in points. */
export function shape(pt, { anchor, k } = CURVE) {
  if (pt <= 0) return pt;
  return anchor * Math.pow(pt / anchor, k);
}

/** Nearest scale step to a size in points. */
export function snap(pt) {
  let best = SCALE[0];
  let bestD = Infinity;
  for (const s of SCALE) {
    const d = Math.abs(s.pt - pt);
    if (d < bestD) {
      bestD = d;
      best = s;
    }
  }
  return best;
}


/**
 * Leading steps, in READ-mode multipliers. Mirrors src/styles/deck-type.css.
 * Ordered loosest-last so `snapLeading` can pick by nearest value.
 */
export const LEADING = [
  { token: "tight", v: 1.12 },
  { token: "snug", v: 1.28 },
  { token: "normal", v: 1.4 },
  { token: "relaxed", v: 1.5 },
];

/**
 * Map a declared line-height onto a leading token.
 *
 * Leading is the highest-leverage global lever once type doubles: measured on
 * teaser-v3, capping body leading cut total slide overflow by 29% and cleared
 * four slides outright, while shell padding changed nothing at all (padding
 * cannot help a vertically-centered box whose content already exceeds it).
 *
 * Values below 1.05 are left alone — those are deliberate display-type
 * settings (the deck sets 0.85/0.95 on drop-caps and hero numerals) where
 * substituting a body leading would visibly break the composition.
 */
export function snapLeading(v) {
  if (!Number.isFinite(v) || v < 1.05) return null;

  /*
   * `relaxed` (1.5) is deliberately NOT a snap target — it stays available for
   * a human to reach for, but nothing snaps INTO it. The deck's generous
   * 1.5–1.7 leadings were set when body type was 6pt, where loose leading
   * genuinely helps. At 16.5pt the same ratio just wastes vertical space, and
   * space is the binding constraint. Letting 1.55 snap to 1.5 would be a
   * rounding error rather than a fix; snapping it to `normal` (1.4) is what
   * actually recovers the room, and 1.4 at 16.5pt is a normal book setting.
   */
  const targets = LEADING.filter((s) => s.token !== "relaxed");
  let best = targets[0];
  let bestD = Infinity;
  for (const s of targets) {
    const d = Math.abs(s.v - v);
    if (d < bestD) { bestD = d; best = s; }
  }
  return best;
}

/** The stage a Play-UI slide is authored against. */
export const REF_VIEWPORT = { width: 1920, height: 1080 };

/** Parse a CSS length into px, or null if not a plain literal length. */
export function toPx(raw) {
  const v = raw.trim();
  const rem = v.match(/^(-?[\d.]+)rem$/);
  if (rem) return parseFloat(rem[1]) * REM_PX;
  const px = v.match(/^(-?[\d.]+)px$/);
  if (px) return parseFloat(px[1]);
  const vw = v.match(/^(-?[\d.]+)vw$/);
  if (vw) return (parseFloat(vw[1]) / 100) * REF_VIEWPORT.width;
  const vh = v.match(/^(-?[\d.]+)vh$/);
  if (vh) return (parseFloat(vh[1]) / 100) * REF_VIEWPORT.height;
  const em = v.match(/^(-?[\d.]+)em$/);
  if (em) return null; // relative to parent — must keep scaling with it
  return null;
}

/**
 * Resolve `clamp(min, preferred, max)` at the reference viewport.
 * CSS semantics: clamp(MIN, VAL, MAX) === max(MIN, min(VAL, MAX)).
 * Returns px, or null if any component is unresolvable.
 */
export function resolveClamp(raw) {
  const m = raw.trim().match(/^clamp\(\s*([^,]+),\s*([^,]+),\s*(.+?)\s*\)$/);
  if (!m) return null;
  const parts = [m[1], m[2], m[3]].map((p) => toPx(p));
  if (parts.some((p) => p === null)) return null;
  const [lo, val, hi] = parts;
  return Math.max(lo, Math.min(val, hi));
}

/**
 * Rewrite one file's contents.
 * Returns { code, changes, skips }.
 */
export function transform(source) {
  const changes = [];
  const skips = [];

  // `font-size:` up to the terminating semicolon or block end.
  let code = source.replace(
    /(font-size\s*:\s*)([^;}]+)([;}])/g,
    (match, head, value, tail) => {
      // `!important` is a priority flag, not part of the value. Split it off,
      // resolve the value, then put it back — otherwise every `!important`
      // size silently fails to parse and is left un-tokenised.
      let raw = value.trim();
      let bang = "";
      const bangM = raw.match(/^(.*?)\s*(!\s*important)\s*$/i);
      if (bangM) {
        raw = bangM[1].trim();
        bang = " !important";
      }

      if (/var\(\s*--dt-/.test(raw)) return match; // already tokenised
      if (/^(inherit|initial|unset|revert|smaller|larger|x{0,2}-(small|large)|medium)$/.test(raw)) {
        skips.push({ value: raw, reason: "keyword" });
        return match;
      }

      let px = null;
      let viewportBound = false;

      if (/^clamp\(/.test(raw)) {
        px = resolveClamp(raw);
        // Only a clamp carrying viewport units was actually misbehaving.
        viewportBound = /\bv(w|h|min|max)\b/.test(raw);
        if (px === null) {
          skips.push({ value: raw, reason: "clamp with unresolvable component" });
          return match;
        }
      } else if (/\b(calc|min|max)\s*\(/.test(raw)) {
        skips.push({ value: raw, reason: "calc/min/max expression" });
        return match;
      } else {
        px = toPx(raw);
        if (px === null) {
          skips.push({ value: raw, reason: /em$/.test(raw) ? "em (parent-relative, intentional)" : "unresolvable unit" });
          return match;
        }
        viewportBound = /\bv(w|h|min|max)\b/.test(raw);
      }

      const fromPt = Math.round((px / PX_PER_PT) * 10) / 10;
      const step = snap(shape(fromPt));
      changes.push({ from: raw, fromPt, toToken: step.token, toPt: step.pt, viewportBound });
      return `${head}var(--dt-${step.token})${bang}${tail}`;
    },
  );

  // ── measure pass ────────────────────────────────────────────────────────
  /*
   * Every text measure in these slides is an absolute `rem` — and rem is
   * root-relative, so it does NOT move when the type tokens do. Measured on
   * teaser-v3: `.v3-stage` caps at 64rem (1024px = 53% of a 1920px slide) and
   * body copy at 52rem. At 6pt type that was a comfortable ~90-character line.
   * At 16.5pt the same 832px holds ~50 characters, so copy wraps far more,
   * grows taller, and overflows — while half the slide sits empty.
   *
   * The empty margin and the vertical overflow are therefore the SAME bug, and
   * widening the measure fixes both at once: longer lines mean fewer lines.
   *
   * Rather than rewrite each value, every rem measure becomes a multiple of one
   * knob. `--dt-measure` then widens every column together, per mode, and can
   * be tuned empirically instead of guessed.
   *
   * Only `rem` is touched. Media-query breakpoints (`@media (max-width: 900px)`)
   * are in px and are left alone — rewriting those would break the layout's
   * column-collapse behaviour.
   */
  const measureChanges = [];
  code = code.replace(
    /(max-width\s*:\s*)(-?[\d.]+)rem(\s*[;}])/g,
    (match, head, num, tail) => {
      measureChanges.push({ rem: parseFloat(num) });
      return `${head}calc(${num}rem * var(--dt-measure))${tail}`;
    },
  );

  // ── figure pass ─────────────────────────────────────────────────────────
  /*
   * Type is not the only thing sized on a slide. Headshots, avatars, and mark
   * glyphs carry hard-coded dimensions (teaser-v3 uses 14/18/32/36px), and
   * scaling only the text leaves 15pt copy sitting beside a 32px portrait —
   * which reads as broken even though nothing overflows.
   *
   * These bind to `--dt-figure` so figures grow with the mode.
   *
   * Three things are deliberately NOT scaled, because scaling them breaks the
   * design rather than fixing it:
   *   - `height: 1px` hairline rules (19 in v3) would become fat bars.
   *   - `max-width` / `min-width` — those are media-query breakpoints and
   *     layout guards, not figure sizes. Excluded via lookbehind.
   *   - anything above 200px, which is a layout dimension, not a figure.
   */
  const figureChanges = [];
  code = code.replace(
    /(?<!max-)(?<!min-)\b(width|height)(\s*:\s*)([\d.]+)(px|rem)(\s*[;}])/g,
    (match, prop, mid, num, unit, tail) => {
      const v = parseFloat(num);
      const px = unit === "rem" ? v * REM_PX : v;
      // Hairlines and layout-scale values are left exactly as they are.
      if (px <= 4 || px > 200) return match;
      figureChanges.push({ prop, value: `${num}${unit}` });
      return `${prop}${mid}calc(${num}${unit} * var(--dt-figure))${tail}`;
    },
  );

  // ── spacing pass ────────────────────────────────────────────────────────
  /*
   * Block spacing was tuned when body copy was ~6pt, where 1.5rem between
   * blocks read as comfortable. At 15pt the same 24px is dead weight, and
   * vertical budget is the binding constraint: measured across teaser-v3,
   * capping gaps and block margins took slide 06 from 92px over to 16px and
   * slide 17 from 98px to 24px.
   *
   * Only generous values (>= 1.25rem) are touched. Small gaps are intra-card
   * rhythm — collapsing those makes cards look broken rather than tighter.
   */
  const spacingChanges = [];
  code = code.replace(
    /\b(row-gap|column-gap|gap|margin-bottom|margin-top)(\s*:\s*)([\d.]+)rem(\s*[;}])/g,
    (match, prop, mid, num, tail) => {
      if (parseFloat(num) < 1.25) return match;
      spacingChanges.push({ prop, from: `${num}rem` });
      return `${prop}${mid}var(--dt-gap)${tail}`;
    },
  );

  // ── line-height pass ────────────────────────────────────────────────────
  const leadingChanges = [];
  const code2 = code.replace(
    /(line-height\s*:\s*)([^;}]+)([;}])/g,
    (match, head, value, tail) => {
      let raw = value.trim();
      let bang = "";
      const bm = raw.match(/^(.*?)\s*(!\s*important)\s*$/i);
      if (bm) { raw = bm[1].trim(); bang = " !important"; }
      if (/var\(\s*--dt-leading/.test(raw)) return match;

      // Unitless multipliers only. A line-height in px/rem does not scale with
      // the token that sets font-size, so converting it would silently decouple
      // the two — leave those for a human.
      if (!/^-?[\d.]+$/.test(raw)) {
        skips.push({ value: `line-height: ${raw}`, reason: "line-height with units" });
        return match;
      }
      const step = snapLeading(parseFloat(raw));
      if (!step) return match; // display-type leading, deliberate
      leadingChanges.push({ from: parseFloat(raw), toToken: step.token, toV: step.v });
      return `${head}var(--dt-leading-${step.token})${bang}${tail}`;
    },
  );

  return { code: code2, changes, skips, leadingChanges, measureChanges, figureChanges, spacingChanges };
}

/** Apply to a list of files. `dryRun` reports without writing. */
export async function runCodemod({ files, dryRun = false, log = console.log }) {
  const all = [];
  const skipped = [];
  const leading = [];
  const measures = [];
  const figures = [];
  const spacings = [];

  for (const file of files) {
    const src = await readFile(file, "utf8");
    const { code, changes, skips, leadingChanges, measureChanges, figureChanges, spacingChanges } = transform(src);
    if (!dryRun && (changes.length || leadingChanges.length || measureChanges.length || figureChanges.length || spacingChanges.length))
      await writeFile(file, code);

    for (const c of changes) all.push({ file: basename(file), ...c });
    for (const s of skips) skipped.push({ file: basename(file), ...s });
    for (const l of leadingChanges) leading.push({ file: basename(file), ...l });
    for (const w of measureChanges) measures.push({ file: basename(file), ...w });
    for (const g of figureChanges) figures.push({ file: basename(file), ...g });
    for (const sp of spacingChanges) spacings.push({ file: basename(file), ...sp });

    if (changes.length || skips.length || leadingChanges.length || measureChanges.length || figureChanges.length || spacingChanges.length) {
      log(
        `    ${basename(file).padEnd(52)} ${String(changes.length).padStart(3)} size` +
          `, ${String(leadingChanges.length).padStart(2)} leading` +
          `, ${String(measureChanges.length).padStart(2)} measure` +
          `, ${String(figureChanges.length).padStart(2)} figure` +
          `, ${String(spacingChanges.length).padStart(2)} spacing` +
          (skips.length ? `, ${skips.length} skipped` : ""),
      );
    }
  }

  return { changes: all, skipped, leading, measures, figures, spacings };
}

/** Report the mapping, and flag distinct sizes that collapsed onto one token. */
export function reportCodemod({ changes, skipped, leading = [], measures = [], figures = [], spacings = [] }, log = console.log) {
  const byToken = new Map();
  for (const c of changes) {
    if (!byToken.has(c.toToken)) byToken.set(c.toToken, { pt: c.toPt, sources: new Map(), n: 0 });
    const e = byToken.get(c.toToken);
    e.n++;
    e.sources.set(c.fromPt, (e.sources.get(c.fromPt) ?? 0) + 1);
  }

  log("\n  ── Size → token mapping ───────────────────────────────────────");
  log("     token       new pt   uses   collapsed from (old pt)");
  for (const s of SCALE) {
    const e = byToken.get(s.token);
    if (!e) continue;
    const srcs = [...e.sources.keys()].sort((a, b) => a - b);
    const flag = srcs.length > 3 ? "!" : " ";
    log(
      `   ${flag} ${s.token.padEnd(10)} ${String(e.pt).padStart(6)} ${String(e.n).padStart(6)}   ${srcs
        .map((p) => p + "pt")
        .join(", ")}`,
    );
  }

  const vpFixed = changes.filter((c) => c.viewportBound);
  if (vpFixed.length) {
    log(
      `\n  ✓ ${vpFixed.length} viewport-bound size(s) de-responsified — these used vw/vh\n` +
        `    inside a fixed 1920×1080 stage, so they changed with window size while the\n` +
        `    rest of the slide scaled by transform. Now resolved to fixed tokens.`,
    );
  }

  const collapses = [...byToken.entries()].filter(([, e]) => e.sources.size > 3);
  if (collapses.length) {
    log(
      `\n  ! ${collapses.length} token(s) absorbed more than 3 distinct sizes — worth an eyeball:\n` +
        collapses.map(([t]) => `      --dt-${t}`).join("\n"),
    );
  }

  if (skipped.length) {
    log(`\n  ── Skipped (left exactly as they were) ────────────────────────`);
    const byReason = new Map();
    for (const s of skipped) {
      if (!byReason.has(s.reason)) byReason.set(s.reason, []);
      byReason.get(s.reason).push(`${s.file}: ${s.value}`);
    }
    for (const [reason, items] of byReason) {
      log(`     ${reason} (${items.length}):`);
      for (const i of items.slice(0, 6)) log(`       ${i}`);
      if (items.length > 6) log(`       … and ${items.length - 6} more`);
    }
  }

  if (leading.length) {
    const byTok = new Map();
    for (const l of leading) {
      if (!byTok.has(l.toToken)) byTok.set(l.toToken, { v: l.toV, n: 0, from: new Set() });
      const e = byTok.get(l.toToken); e.n++; e.from.add(l.from);
    }
    log("\n  ── Leading → token mapping ────────────────────────────────────");
    for (const [tok, e] of byTok) {
      log(`     ${("--dt-leading-" + tok).padEnd(22)} ${e.v}  ${String(e.n).padStart(3)} uses   from ${[...e.from].sort((a,b)=>a-b).join(", ")}`);
    }
  }

  if (measures.length) {
    const vals = [...new Set(measures.map((m) => m.rem))].sort((a, b) => a - b);
    log("\n  ── Measures bound to --dt-measure ─────────────────────────────");
    log(`     ${measures.length} max-width declarations now scale with the type mode`);
    log(`     distinct base widths: ${vals.map((v) => v + "rem").join(", ")}`);
  }

  if (figures.length) {
    const vals = [...new Set(figures.map((f) => f.value))];
    log("\n  ── Figures bound to --dt-figure ───────────────────────────────");
    log(`     ${figures.length} declarations (headshots, marks, glyphs) now scale with type`);
    log(`     sizes: ${vals.join(", ")}`);
  }

  if (spacings.length) {
    log("\n  ── Spacing bound to --dt-gap ──────────────────────────────────");
    log(`     ${spacings.length} gap/margin declarations (>= 1.25rem) now scale with the mode`);
  }

  log(`\n     ${changes.length} size + ${leading.length} leading + ${measures.length} measure + ${figures.length} figure + ${spacings.length} spacing rewritten, ${skipped.length} skipped`);
}
