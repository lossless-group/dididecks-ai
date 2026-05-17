/**
 * /api/slide-rank — read + write per-slide rank state into the consuming
 * client-site's audits file (`data/audits/slides.json` by default).
 *
 * Storage shape (schema 2 — dual-surface):
 *   {
 *     "schema": 2,
 *     "ranks": {
 *       "<deckSlug>/<variantSlug>/<slot>": {
 *         "scroll": { "status": "...", "rankedAt": "...", "rankedBy": "founder", "notes": null },
 *         "play":   { "status": "...", "rankedAt": "...", "rankedBy": "founder", "notes": null }
 *       }
 *     }
 *   }
 *
 * POST body requires `surface: "scroll" | "play"`. Transitionally, a missing
 * surface is accepted with a 200 + server-log warning and defaulted to scroll
 * (matches pre-v2 behavior) so consumers can update at their pace. The default
 * is removed in a later release.
 *
 * Status "pending" is the implicit default — it is never persisted; a POST with
 * status === "pending" deletes the existing surface entry (and the row entirely
 * if no other surface remains).
 *
 * Dev-only — `prerender = false` makes this route on-demand. Static Vercel
 * builds skip it cleanly.
 */
import type { APIRoute } from "astro";
import { buildRankKey } from "../../types/index.js";
import { loadAuditRegistry, writeAuditRegistry } from "../../registry-loader.js";

export const prerender = false;

const VALID_STATUSES = new Set([
  "urgent-redo",
  "non-urgent-could-be-better",
  "passable",
  "perfect",
  "pending",
]);

const VALID_SURFACES = new Set(["scroll", "play"] as const);
type Surface = "scroll" | "play";

function getOptionsOrThrow() {
  const opts = globalThis.__dididecksShellOptions;
  if (!opts) {
    throw new Error("@dididecks/shell: options not resolved");
  }
  return opts;
}

export const GET: APIRoute = async () => {
  const opts = getOptionsOrThrow();
  const audit = await loadAuditRegistry(opts.absolute.audits);
  return new Response(JSON.stringify(audit), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const opts = getOptionsOrThrow();

  let body: {
    deckSlug?: string;
    variantSlug?: string;
    slot?: string;
    status?: string;
    surface?: string;
    notes?: string | null;
  };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid JSON body" }), { status: 400 });
  }

  const { deckSlug, variantSlug, slot, status, surface: bodySurface, notes } = body;
  if (!deckSlug || !variantSlug || !slot) {
    return new Response(
      JSON.stringify({ error: "missing 'deckSlug', 'variantSlug', or 'slot'" }),
      { status: 400 },
    );
  }
  if (!status || !VALID_STATUSES.has(status)) {
    return new Response(
      JSON.stringify({ error: `'status' must be one of: ${[...VALID_STATUSES].join(", ")}` }),
      { status: 400 },
    );
  }

  let surface: Surface;
  if (bodySurface === undefined) {
    console.warn(
      "[@dididecks/shell] /api/slide-rank: POST missing 'surface' — defaulting to 'scroll' for backcompat. This default will be removed; update your <SlideRankPill surface={…}> mounts.",
    );
    surface = "scroll";
  } else if (!VALID_SURFACES.has(bodySurface as Surface)) {
    return new Response(
      JSON.stringify({ error: `'surface' must be one of: ${[...VALID_SURFACES].join(", ")}` }),
      { status: 400 },
    );
  } else {
    surface = bodySurface as Surface;
  }

  const key = buildRankKey(deckSlug, variantSlug, slot);
  const audit = await loadAuditRegistry(opts.absolute.audits);

  if (status === "pending") {
    const row = audit.ranks[key];
    if (row) {
      delete row[surface];
      if (!row.scroll && !row.play) delete audit.ranks[key];
    }
  } else {
    const row = audit.ranks[key] ?? {};
    row[surface] = {
      status: status as "urgent-redo" | "non-urgent-could-be-better" | "passable" | "perfect",
      rankedAt: new Date().toISOString(),
      rankedBy: "founder",
      notes: notes ?? null,
    };
    audit.ranks[key] = row;
  }

  await writeAuditRegistry(opts.absolute.audits, audit);

  return new Response(JSON.stringify({ key, status, registry: audit }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
