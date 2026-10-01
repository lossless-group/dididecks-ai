/**
 * Tier 3a — PPTX (image-backed), and the Keynote handoff.
 *
 * ── Read this before assuming "PPTX export" means editable text ───────────
 * There are two genuinely different PPTX exports, and conflating them is how
 * a client ends up opening a deck they cannot edit:
 *
 *   1. IMAGE-BACKED (this file). One full-bleed 1920×1080 picture per slide.
 *      Pixel-perfect fidelity — gradients, blend modes, custom fonts, the
 *      watercolor wash, all exactly as the web deck renders. Nothing is
 *      editable. Works for ANY deck, today, with zero authoring changes.
 *
 *   2. NATIVE-SHAPE. Real text boxes and autoshapes via pptxgenjs, so every
 *      word stays editable and Google Slides imports cleanly. Requires the
 *      deck's copy to exist as structured data — the content-module pattern
 *      in `context-v/blueprints/Shared-Content-Modules-Across-Deck-Surfaces.md`
 *      (`src/data/deck-content/<variant>.mjs`). A deck whose copy lives only
 *      inside hand-authored Astro markup CANNOT get a native export without
 *      that transcription first. reach-edu-hub has the modules; calmstorm
 *      does not.
 *
 * This module implements (1) and is explicit that it is doing so — the
 * generated file carries a speaker note on slide 1 saying the text is not
 * editable, so nobody discovers it mid-meeting.
 *
 * ── 16:9 geometry ────────────────────────────────────────────────────────
 * pptxgenjs's LAYOUT_16x9 is 10×5.625in. We use 13.333×7.5in instead — the
 * same size PowerPoint and Keynote themselves use for widescreen, and what
 * reach-edu-hub's native exporter already targets. Keeping the two exporters
 * on one geometry means a deck can switch tiers without re-measuring.
 */

import { mkdir } from "node:fs/promises";
import { join } from "node:path";

export const SLIDE_W_IN = 13.333;
export const SLIDE_H_IN = 7.5;

/**
 * Build one image-backed PPTX per variant.
 * Returns [{ variant, path, slides }].
 */
export async function buildImagePptx({
  manifest,
  outDir,
  deckName = "deck",
  log = console.log,
}) {
  const PptxGenJS = (await import("pptxgenjs")).default;
  const { byVariant } = await import("../routes.mjs");

  const present = manifest.filter((m) => !m.missing && m.files?.png);
  if (!present.length) {
    log("    ! no captured slides — skipping PPTX.");
    return [];
  }

  await mkdir(outDir, { recursive: true });
  const groups = byVariant(present);
  const written = [];

  for (const [variant, routes] of groups) {
    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: "DIDI_16x9", width: SLIDE_W_IN, height: SLIDE_H_IN });
    pptx.layout = "DIDI_16x9";
    pptx.author = "DidiDecks";
    pptx.company = "The Lossless Group";
    pptx.title = `${deckName} · ${variant}`;

    routes.forEach((r, i) => {
      const slide = pptx.addSlide();
      slide.addImage({
        path: join(outDir, r.files.png),
        x: 0,
        y: 0,
        w: SLIDE_W_IN,
        h: SLIDE_H_IN,
      });
      if (i === 0) {
        slide.addNotes(
          [
            `${deckName} — variant ${variant}. Exported from the DidiDecks web deck.`,
            "",
            "NOTE ON EDITING: each slide is a full-bleed image, so the text in this",
            "file is not editable in PowerPoint or Keynote. This preserves exact",
            "visual fidelity. For an editable, native-shape version the deck's copy",
            "has to be lifted into a content module first — see",
            "context-v/blueprints/Shared-Content-Modules-Across-Deck-Surfaces.md.",
            "",
            "To change a slide, edit the deck in code and re-export.",
          ].join("\n"),
        );
      } else if (r.title) {
        slide.addNotes(`Slot ${r.slot} — ${r.title}`);
      }
    });

    const outPath = join(outDir, `${deckName}-${variant}.pptx`);
    await pptx.writeFile({ fileName: outPath });
    written.push({ variant, path: outPath, slides: routes.length });
    log(`    ✓ ${deckName}-${variant}.pptx (${routes.length} slides, image-backed)`);
  }

  return written;
}
