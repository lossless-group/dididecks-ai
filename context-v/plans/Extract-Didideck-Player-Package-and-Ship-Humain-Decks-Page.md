---
title: "Extract @lossless-group/dididecks-player and ship a gated decks page on humain-web"
lede: "Split the viewer half of @dididecks/shell into a standalone, publishable package (LFM-shaped), keep the rater and triage tools in dididecks, and give humain-web a passcode-gated decks page built on the player."
date_created: 2026-10-28
date_modified: 2026-10-28
authors:
  - Michael Staton
augmented_with: Claude Code on Claude Opus 5.5 (1M context)
semantic_version: 0.0.1.0
status: In-Progress
tags:
  - Dididecks-Shell
  - Didideck-Player
  - Package-Extraction
  - Humain-Web
  - Privacy-Gate
publish: false
type: Plans
---

# Extract `@lossless-group/dididecks-player` and ship Humain's decks page

## Why Care?

Every Lossless site that shows a deck rebuilt its own viewer: mpstaton-site
copied `PageAsDeckWrapper`, hypernova and twf_site carry their own slide
layouts. Reveal.js was dropped because its globals collided with ordinary web
development. The dididecks shell already has the right viewer pieces, but they
are bundled with dev-only authoring tools (the rater writes JSON to disk), so
nothing outside a dididecks client-site can use them.

## The split (audit, 2026-10-28)

| Layer | Contents | Ships where |
|---|---|---|
| **Player** | `SlideCanvas` (pure-CSS 16:9 scaling), `DeckChrome`, `SlidePaginator`, `PageAsDeckWrapper` (scroll deck), `ModeToggle` + `runtime/mode-switcher.ts`, `chrome-tokens.css`, `themes/neutral.css`, and a new `DeckPlayer` (single-page play deck: keyboard, ToC skip, fullscreen, print) | **`@lossless-group/dididecks-player`**, `packages/dididecks-player/`, publishable to JSR beside LFM |
| **Rater / triage** | `SlideRankPill`, `/api/slide-rank`, `/api/slide-decompose`, `DeckMatrix`, `DeckStatsPanel`, review ToC | Stays in `@dididecks/shell` (dev-only: writes to the filesystem) |
| **Integration** | registry loader, slot scanner, injected `/play` `/toc` routes | Stays in `@dididecks/shell` |

The shell depends on the player and keeps shims at the old component paths,
so no client-site import changes.

## Phases

1. **Extract.** Move the player files into `packages/dididecks-player/`; leave
   one-line shims in `apps/deck-shell`. Add `DeckPlayer.astro`. Verify every
   client-site still builds (humain-vc-decks as the check).
2. **Humain decks page.** In humain-web:
   - snapshot the public deck (slide images + PDF) into
     `src/content/decks/<slug>/` (private, like memos, never a public asset);
   - add scope `deck:*` to the LP passcode and Fund I / GP roster entries;
   - gated routes `/lp/decks/`, `/lp/decks/<slug>/` (DeckPlayer over the
     slide images), `/lp/decks/<slug>/slides/<file>` and `/lp/decks/<slug>/pdf`;
   - a public `/decks/` listing that links into the gate.
   Until the player is published, humain-web vendors `DeckPlayer` +
   `SlideCanvas` under `src/components/deck/` with a header naming the
   package version, and swaps to the JSR import once published.
3. **Publish** (needs a go-ahead: outward-facing). `jsr publish` from
   `packages/dididecks-player/`; humain-web, mpstaton-site, hypernova and
   twf_site migrate to the import.

## Status (2026-10-28)

- **Phase 1 done (v0.1.0, unpublished).** `packages/dididecks-player/`:
  SlideCanvas (shell base + CSS centring + calmstorm's wash layer),
  ContentFit (calmstorm), DeckChrome (shell, with the `deck:section-changed`
  listener fixed and modifier keys passed through), SlidePaginator,
  PageAsDeckWrapper, ModeToggle + mode-switcher, chrome tokens, and new
  DeckPlayer, PlayerSlide, PrintDeck. Shell shims in place; humain-vc-decks
  builds and its play/print output is unchanged.
- **Phase 2 done.** humain-web `/decks/` (public), `/lp/decks/` and
  `/lp/decks/firm-deck/` (gated, `deck:*`), gated slide and PDF routes.
  The deck page offers **Scroll · Play · PDF**, Scroll by default: the
  scroll deck is a single-file export (`deck-export html --public --clean`:
  post-NDA sections dropped, rater pill and dev overlays stripped, a small
  runtime for keys, counter and mode toggle injected) served from the gated
  `/lp/decks/<slug>/scroll` route into an iframe. Play uses the player over
  slide snapshots. The player comes from the package (git tag v0.1.0 until
  the npm release clears), not a vendored copy.
- **Open from the audit:** replace PageAsDeckWrapper with
  lossless-slides-site's `PageDeck` (re-tokenised), add fullstack-vc's jump
  panel, unify the chrome-hidden attribute on `html[data-chrome="off"]`, and
  fix the print route's nested SlideCanvas. Publishing target to confirm:
  JSR (like LFM) if it serves `.astro` files to npm consumers, else npm.

## Verification

- `pnpm build` + `astro check` in humain-vc-decks after phase 1; the print
  route still yields one page per slide.
- humain-web: `pnpm test` (gate unit tests), `astro check`, and a drive:
  `/decks/` lists the deck publicly; `/lp/decks/<slug>/` without a session
  rewrites to the unlock page; with the passcode it plays; the slide-image and
  PDF routes return 404 to a session without `deck:` scope.
