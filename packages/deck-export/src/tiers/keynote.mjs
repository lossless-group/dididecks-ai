/**
 * Tier 3b — Keynote (.key).
 *
 * ── Why this is a conversion and not a writer ─────────────────────────────
 * Keynote has no published file format and no third-party writer. `.key` is
 * an opaque package built around Apple's private IWA (protobuf) encoding;
 * there is no `pptxgenjs` equivalent, and hand-rolling one would be a
 * reverse-engineering project, not an export feature.
 *
 * The only way to produce a genuine `.key` is to have Keynote itself make
 * one. So this module drives the installed Keynote app over AppleScript:
 * open the PPTX we already generated, export it as Keynote, quit. The result
 * is a real Keynote document with Keynote's own conversion of the PPTX.
 *
 * ── Requirements ──────────────────────────────────────────────────────────
 *   - macOS
 *   - Keynote installed (/Applications/Keynote.app)
 *   - Terminal (or whichever app runs this) granted Automation permission for
 *     Keynote, under System Settings → Privacy & Security → Automation. The
 *     first run triggers the prompt; in a headless/CI context it will simply
 *     fail, which is why this tier is opt-in rather than part of `all`.
 *
 * ── The fallback that is usually fine ─────────────────────────────────────
 * Keynote opens `.pptx` natively — double-clicking the PPTX we already
 * produce gets a recipient into Keynote without this step at all. This tier
 * exists for when the deliverable must literally be a `.key` file.
 */

import { access } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { basename, dirname, join } from "node:path";

const run = promisify(execFile);

const KEYNOTE_APP = "/Applications/Keynote.app";

/** Is a real Keynote conversion possible on this machine? */
export async function keynoteAvailable() {
  if (process.platform !== "darwin") {
    return { ok: false, reason: "not macOS — Keynote automation is macOS-only" };
  }
  try {
    await access(KEYNOTE_APP);
    return { ok: true };
  } catch {
    return { ok: false, reason: `Keynote not installed at ${KEYNOTE_APP}` };
  }
}

/**
 * Convert one PPTX to .key via Keynote.
 * Resolves to the output path, or throws with the AppleScript error.
 */
export async function pptxToKeynote(pptxPath, { log = console.log } = {}) {
  const avail = await keynoteAvailable();
  if (!avail.ok) throw new Error(avail.reason);

  const outPath = join(
    dirname(pptxPath),
    basename(pptxPath).replace(/\.pptx$/i, ".key"),
  );

  /*
   * `save <doc> in <file>` writes Keynote's NATIVE format — that is what we
   * want, and adding `as Keynote` breaks it: Keynote's `as` parameter takes an
   * *export* format enum, and passing the native format there fails with
   * `AppleEvent handler failed (-10000)`. Verified against Keynote 14 on
   * 2026-08-22; the no-`as` form produced a valid 20 MB .key from a 17-slide
   * PPTX, the `as Keynote` form produced nothing.
   *
   * The `delay` gives Keynote time to finish importing the PPTX before the
   * save is issued; without it the save can race the import on large decks.
   * We close without saving afterwards so a failed run never leaves a modal
   * document open and blocking the next conversion.
   */
  const script = `
    set inFile to POSIX file "${pptxPath}"
    set outFile to POSIX file "${outPath}"
    tell application "Keynote"
      set wasRunning to running
      activate
      set theDoc to open inFile
      delay 2
      save theDoc in outFile
      close theDoc saving no
      if not wasRunning then quit
    end tell
    return "${outPath}"
  `;

  try {
    await run("osascript", ["-e", script], { timeout: 180_000 });
  } catch (err) {
    const detail = (err.stderr || err.message || "").trim();
    throw new Error(
      `Keynote conversion failed for ${basename(pptxPath)}.\n` +
        `  ${detail}\n` +
        `  If this mentions "Not authorized to send Apple events", grant this\n` +
        `  terminal Automation access to Keynote in System Settings →\n` +
        `  Privacy & Security → Automation.`,
    );
  }

  log(`    ✓ ${basename(outPath)}`);
  return outPath;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Convert a batch; returns { converted: [], failed: [{path, error}] }.
 *
 * Retries once per file. Keynote is a GUI app being driven over Apple events:
 * when a second document is opened while the previous one is still closing,
 * the send fails outright — observed converting two decks back to back, where
 * the first failed and the identical command succeeded moments later. A settle
 * pause between files plus one retry turns a coin flip into a reliable batch.
 */
export async function convertAll(pptxPaths, { log = console.log, settleMs = 1500 } = {}) {
  const converted = [];
  const failed = [];
  for (const [i, p] of pptxPaths.entries()) {
    if (i > 0) await sleep(settleMs);
    try {
      converted.push(await pptxToKeynote(p, { log }));
    } catch (first) {
      log(`    … ${basename(p)} — retrying (${first.message.split("\n")[0]})`);
      await sleep(settleMs * 2);
      try {
        converted.push(await pptxToKeynote(p, { log }));
      } catch (err) {
        failed.push({ path: p, error: err.message });
        log(`    ✗ ${basename(p)} — ${err.message.split("\n")[0]}`);
      }
    }
  }
  return { converted, failed };
}
