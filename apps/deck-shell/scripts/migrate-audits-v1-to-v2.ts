#!/usr/bin/env -S node --experimental-strip-types
/**
 * One-shot migrator: audits schema v1 → v2.
 *
 * v1 stored one rating per (deck, variant, slot) — `{status, rankedAt, ...}`.
 * v2 stores up to two ratings per row, keyed by surface — `{scroll?, play?}`.
 * The v1 pill was scroll-mounted only, so every v1 rating maps to .scroll.
 *
 * Usage:
 *   tsx apps/deck-shell/scripts/migrate-audits-v1-to-v2.ts <path-to-audits.json>
 *
 * Or, from the consumer site (e.g. client-sites/chroma-decks/):
 *   tsx ../../apps/deck-shell/scripts/migrate-audits-v1-to-v2.ts data/audits/slides.json
 *
 * Idempotent — a v2 file passes through unchanged.
 * Writes the migrated content back to the same path; prints a one-line summary.
 */
import { promises as fs } from "node:fs";
import { resolve } from "node:path";

interface V1Entry {
  status: "urgent-redo" | "non-urgent-could-be-better" | "passable" | "perfect";
  rankedAt: string;
  rankedBy: string;
  notes: string | null;
}
interface V1Audit {
  schema: 1;
  ranks: Record<string, V1Entry>;
}
interface V2Audit {
  schema: 2;
  ranks: Record<string, { scroll?: V1Entry; play?: V1Entry }>;
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error("usage: migrate-audits-v1-to-v2.ts <path-to-audits.json>");
    process.exit(2);
  }
  const absPath = resolve(process.cwd(), arg);
  const raw = await fs.readFile(absPath, "utf-8");
  const parsed = JSON.parse(raw);

  if (!parsed || typeof parsed !== "object") {
    console.error(`refusing: not an object (${absPath})`);
    process.exit(1);
  }

  if (parsed.schema === 2) {
    console.log(`already schema v2: ${absPath} (${Object.keys(parsed.ranks ?? {}).length} rows)`);
    return;
  }
  if (parsed.schema !== 1) {
    console.error(`refusing: unknown schema ${parsed.schema} (${absPath})`);
    process.exit(1);
  }

  const v1 = parsed as V1Audit;
  const v2: V2Audit = { schema: 2, ranks: {} };
  for (const [key, entry] of Object.entries(v1.ranks)) {
    v2.ranks[key] = { scroll: entry };
  }

  // Sorted keys, trailing newline, two-space indent — matches writeAuditRegistry.
  const sorted: V2Audit = {
    schema: 2,
    ranks: Object.fromEntries(
      Object.entries(v2.ranks).sort(([a], [b]) => a.localeCompare(b)),
    ),
  };
  await fs.writeFile(absPath, JSON.stringify(sorted, null, 2) + "\n", "utf-8");
  console.log(
    `migrated v1 → v2: ${absPath} (${Object.keys(sorted.ranks).length} rows → all under .scroll)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
