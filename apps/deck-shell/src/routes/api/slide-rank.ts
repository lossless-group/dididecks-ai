/**
 * /api/slide-rank — read + write per-slide rank state into the consuming
 * client-site's audits file (`data/audits/slides.json` by default).
 *
 * Storage shape (schema 1):
 *   {
 *     "schema": 1,
 *     "ranks": {
 *       "<deckSlug>/<variantSlug>/<slot>": {
 *         "status": "urgent-redo" | "non-urgent-could-be-better" | "passable" | "perfect",
 *         "rankedAt": "<ISO-8601>",
 *         "rankedBy": "founder",
 *         "notes": null
 *       }
 *     }
 *   }
 *
 * Status "pending" is the implicit default — it is never persisted; a POST with
 * status === "pending" deletes the existing entry.
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

  let body: { deckSlug?: string; variantSlug?: string; slot?: string; status?: string; notes?: string | null };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid JSON body" }), { status: 400 });
  }

  const { deckSlug, variantSlug, slot, status, notes } = body;
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

  const key = buildRankKey(deckSlug, variantSlug, slot);
  const audit = await loadAuditRegistry(opts.absolute.audits);

  if (status === "pending") {
    delete audit.ranks[key];
  } else {
    audit.ranks[key] = {
      status: status as "urgent-redo" | "non-urgent-could-be-better" | "passable" | "perfect",
      rankedAt: new Date().toISOString(),
      rankedBy: "founder",
      notes: notes ?? null,
    };
  }

  await writeAuditRegistry(opts.absolute.audits, audit);

  return new Response(JSON.stringify({ key, status, registry: audit }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
