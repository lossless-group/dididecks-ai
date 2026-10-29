# @lossless-group/didideck-player

The viewer half of DidiDecks: everything needed to show a deck, nothing
needed to author one. Static Astro components with scoped CSS, themed by
`--ddd-chrome-*` tokens. No Tailwind, no filesystem access, no registry.

| Component | What it does |
|---|---|
| `DeckPlayer` + `PlayerSlide` | Single-page play deck: one 16:9 slide at a time, keyboard, swipe, ToC skip (T/J), fullscreen (F), `#N` deep links, print one slide per page |
| `SlideCanvas` | Scales a 1920×1080 stage to any container in pure CSS (container queries), centred and letterboxed |
| `ContentFit` | Opt-in island that scales overflowing content down to fit its box |
| `PageAsDeckWrapper` + `SlidePaginator` | Scroll deck: scroll-snap sections, keyboard, double-click, `NN / total` with type-to-jump |
| `DeckChrome` | Floating navigation capsule for play and scroll routes |
| `ModeToggle` + `runtime/mode-switcher.ts` | light / dark / vibrant on `html[data-mode]` |
| `PrintDeck` | Print layout: each child one landscape page |

```astro
---
import DeckPlayer from "@lossless-group/didideck-player/components/DeckPlayer.astro";
import PlayerSlide from "@lossless-group/didideck-player/components/PlayerSlide.astro";
---
<DeckPlayer title="Firm deck" pdfHref="/deck.pdf">
  <PlayerSlide title="Cover" image="/slides/01.jpg" />
  <PlayerSlide title="Thesis"><MyThesisSlide /></PlayerSlide>
</DeckPlayer>
```

## Event contract

`deck:section-changed` `{ index, total, isFirst, isLast }` is emitted on
`window` by the play and scroll decks; `deck:section-goto` `{ index }`,
`deck:section-prev` and `deck:section-next` move them.

## What stays in `@dididecks/shell`

The rater and triage tools (`SlideRankPill`, `/api/slide-rank`,
`/api/slide-decompose`, `DeckMatrix`, review ToC), the registry loader, and
the injected `/play` and `/toc` routes. They write to the filesystem and are
dev-only authoring tools. The shell depends on this package and re-exports
these components at their old paths.

Plan of record:
`dididecks-ai/context-v/plans/Extract-Didideck-Player-Package-and-Ship-Humain-Decks-Page.md`.
