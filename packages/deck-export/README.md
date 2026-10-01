# @dididecks/deck-export

Every export tier for a DidiDecks client-site, from one CLI.

The exporter drives a **running site over HTTP** and never imports its source.
That is the design decision everything else follows from: it works against
`astro dev`, `astro preview`, or a deployed URL, and it needs no knowledge of
how a given client-site organises slides. A site hands over a list of capture
URLs; the exporter does the rest.

```bash
pnpm --filter @dididecks/deck-export exec deck-export all \
  --base-url  http://localhost:4321 \
  --site-root client-sites/calmstorm-decks \
  --pattern   '/dev/shot/{slot}/{variant}' \
  --slots 01-17 --variants v1,v2,v3 \
  --deck-name calmstorm-teaser
```

## The tiers

| Command | Produces | Editable? |
|---|---|---|
| `slides` | `slides/png/*.png` @2x, `slides/png-transparent/*.png`, `slides/svg/*.svg` | SVG: geometry yes, text no (outlined) |
| `pdf` | `deck-<variant>.pdf` — one per variant | Text is **live** and extractable |
| `pptx` | `<deck>-<variant>.pptx` — one per variant | **No** — image-backed (see below) |
| `keynote` | `<deck>-<variant>.key` | Inherits whatever the PPTX had |
| `elements` | `elements/**` + `manifest.json` + `index.html` | n/a — source assets |
| `all` | slides → pdf → pptx → elements | — |

`keynote` is deliberately excluded from `all`: it drives the Keynote app via
AppleScript and needs Automation permission, so it fails in headless contexts.

## Three things worth knowing before you promise a client something

### 1. The PPTX is image-backed, not native-shape

Each slide is one full-bleed 1920×1080 picture. Fidelity is exact — blend
modes, custom fonts, the watercolor wash, gradients, all pixel-perfect — and
**nothing is editable**. Slide 1's speaker notes say so, so nobody discovers
it mid-meeting.

A **native-shape** PPTX (real text boxes, editable in PowerPoint, clean Google
Slides import) is a different build, and it has a prerequisite: the deck's copy
must exist as structured data, per
`context-v/blueprints/Shared-Content-Modules-Across-Deck-Surfaces.md`
(`src/data/deck-content/<variant>.mjs`). `reach-edu-hub` has those modules and
a working native exporter at `scripts/export-pitch-decks-pptx.mjs`.
`calmstorm-decks` does not — its copy lives inside hand-authored Astro markup,
so a native export requires transcribing 17 slots × 3 variants into content
modules first. That is real work, not a flag.

### 2. SVG text is outlined; PDF text is live

Measured, not assumed. `pdftocairo -svg` emits each glyph as `<symbol>`+`<use>`
paths rather than a `<text>` element. The SVG scales and recolors cleanly in
Figma or Illustrator, but a headline cannot be re-typed. The **PDF** keeps live
text — `pdftotext` extracts it, so it is searchable, selectable, and accessible.

Reach for the PDF when the text matters, the SVG when the geometry does.

### 3. `.key` requires Keynote on the machine

Keynote has no published format and no third-party writer — `.key` is an opaque
package around Apple's private IWA encoding. The only way to get a genuine one
is to have Keynote itself make it, which is what the `keynote` command does over
AppleScript.

Requirements: macOS, `/Applications/Keynote.app`, and Automation permission for
the calling terminal (System Settings → Privacy & Security → Automation).

Verified 2026-08-22 against Keynote 14: three 17-slide PPTX files converted to
valid `.key` (16–20 MB each).

⚠️ **Do not add `as Keynote` to the save command.** Keynote's `as` parameter
takes an *export* format enum; passing the native format there fails with
`AppleEvent handler failed (-10000)` and writes nothing. `save <doc> in <file>`
already writes native format. This cost a debugging cycle — the failure message
names neither the parameter nor the file.

**Often you don't need this tier at all.** Keynote opens `.pptx` natively —
handing over the PPTX gets a recipient into Keynote without it.

## Prerequisites

- **Playwright Chromium.** Pinned to `playwright@1.59.1` to match the browsers
  the client-sites already have installed; bumping it means a fresh
  `playwright install chromium` (~150 MB).
- **poppler** (`brew install poppler`) for `pdftocairo`. Absent → SVG is
  skipped with a warning rather than faked.
- **ImageMagick** (optional) for asset dimensions and alpha detection. Absent →
  those manifest fields are omitted, nothing fails.

## Route discovery

Two ways to tell the exporter what to capture.

**`--pattern`** when capture URLs are a pure function of slot and variant:

```
--pattern '/dev/shot/{slot}/{variant}' --slots 01-17 --variants v1,v2,v3
```

**`--routes routes.json`** for anything else — a site can emit this from its own
slide registry:

```json
[{ "id": "05-problem-v3", "url": "/play/pitch/v3/05", "slot": "05", "variant": "v3", "title": "Problem" }]
```

Routes that 404 are recorded as `missing` rather than failing the run, so a
sparse deck (not every slot adapted for every variant) exports cleanly.

### Gotcha: dev-only capture routes

`calmstorm-decks` serves `/dev/shot/{slot}/{variant}` **only under `astro dev`** —
it returns 404 in production and is gated by middleware. Point `--base-url` at
the dev server, not `astro preview`, for that site.

## The elements tier

Copies every design asset out of the repo into `elements/<category>/`, with a
`manifest.json` (category, source path, dimensions, bytes, vector flag) and a
browsable `index.html` contact sheet.

Categories nest — `public/backdrops` lives inside `public` — so **each file is
claimed by the first category that walks it**. List the most specific category
first; the defaults already do.

Assets are copied, never moved, and the manifest records the original
repo-relative path. The export is a snapshot; the repo stays authoritative.

## Output shape

```
exports/<name>/
  deck-v1.pdf  deck-v2.pdf  deck-v3.pdf        vector text
  calmstorm-teaser-v1.pptx  …                  image-backed
  slides/png/01-...-v1.png                     @2x raster
  slides/png-transparent/…                     omitBackground
  slides/svg/01-...-v1.svg                     outlined vector
  elements/…  elements/manifest.json  elements/index.html
  export-summary.json                          what ran, what landed
```
