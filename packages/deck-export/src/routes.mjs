/**
 * Route discovery — how the exporter learns which slides exist.
 *
 * The exporter is deliberately site-agnostic: it never imports a client-site's
 * slide registry, because every client-site names and nests those differently
 * (calmstorm globs `src/slides/by-title/*.astro`; shell-based sites resolve
 * `/play/[deck]/[variant]/[slot]/`). Instead a site hands over a flat list of
 * capture targets, and everything downstream works off that one shape.
 *
 * A route is:
 *   {
 *     id:      "05-problem-intro-v3",   // stable, filename-safe, unique
 *     url:     "/dev/shot/05/v3",       // path on the running site
 *     slot:    "05",                    // ordering key within a variant
 *     variant: "v3",                    // groups routes into one deck
 *     title:   "Problem"                // human label (optional)
 *   }
 *
 * Two ways to supply them, in precedence order:
 *   1. `--routes <file.json>` — an explicit array. Any site can emit this.
 *   2. `--pattern <template>` + `--slots` + `--variants` — a convenience for
 *      sites whose capture URLs are a pure function of slot and variant.
 */

import { readFile } from "node:fs/promises";

/** Expand "01-17" / "1,3,5" / "01,05,09" into a padded slot list. */
export function expandSlots(spec) {
  const out = [];
  for (const part of String(spec).split(",")) {
    const range = part.trim().match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      const lo = Number(range[1]);
      const hi = Number(range[2]);
      if (hi < lo) throw new Error(`Slot range "${part}" runs backwards.`);
      for (let n = lo; n <= hi; n++) out.push(String(n).padStart(2, "0"));
    } else if (part.trim()) {
      out.push(part.trim().padStart(2, "0"));
    }
  }
  if (!out.length) throw new Error(`No slots parsed from "${spec}".`);
  return out;
}

/**
 * Build routes from a URL template. `{slot}` and `{variant}` are substituted.
 * Routes that 404 are dropped later by the capture step, not here — this
 * function only enumerates candidates.
 */
export function routesFromPattern({ pattern, slots, variants }) {
  if (!pattern.includes("{slot}") && !pattern.includes("{variant}")) {
    throw new Error(
      `--pattern must contain {slot} and/or {variant}; got "${pattern}".`,
    );
  }
  const routes = [];
  for (const variant of variants) {
    for (const slot of slots) {
      routes.push({
        id: `${slot}-${variant}`,
        url: pattern.replaceAll("{slot}", slot).replaceAll("{variant}", variant),
        slot,
        variant,
      });
    }
  }
  return routes;
}

/** Load and validate an explicit routes file. */
export async function routesFromFile(path) {
  let parsed;
  try {
    parsed = JSON.parse(await readFile(path, "utf8"));
  } catch (err) {
    throw new Error(`Could not read routes file "${path}": ${err.message}`);
  }
  if (!Array.isArray(parsed)) {
    throw new Error(`Routes file "${path}" must contain a JSON array.`);
  }
  parsed.forEach((r, i) => {
    for (const key of ["id", "url", "slot", "variant"]) {
      if (!r[key]) throw new Error(`Route ${i} in "${path}" is missing "${key}".`);
    }
  });
  return parsed;
}

/** Group a flat route list into { variant: [route, …] }, slot-ordered. */
export function byVariant(routes) {
  const groups = new Map();
  for (const r of routes) {
    if (!groups.has(r.variant)) groups.set(r.variant, []);
    groups.get(r.variant).push(r);
  }
  for (const list of groups.values()) {
    list.sort((a, b) => String(a.slot).localeCompare(String(b.slot)));
  }
  return groups;
}
