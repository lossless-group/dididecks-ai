# DidiDecks-AI

A code-first slide-deck operating system for Due-Diligence-grade content,
built by [The Lossless Group](https://lossless.group).

The codename **DidiDecks** is a contraction of **Due Diligence** — the bar this
product is built to clear. We are not building a "better Gamma." We are building
the end-to-end deck-content operating system for high-stakes, time-pressured,
recurring VC work that single-deck tools don't address.

## Where things live

- **Living spec:** [`context-v/specs/Dididecks-AI-Slide-Decks-as-Code.md`](./context-v/specs/Dididecks-AI-Slide-Decks-as-Code.md)
- **Sibling specs:**
  - [`Dididecks-AI-DD-Ready-Citation-and-Source-Access`](./context-v/specs/Dididecks-AI-DD-Ready-Citation-and-Source-Access.md)
  - [`Dididecks-AI-Visual-and-Diagram-Component-Library`](./context-v/specs/Dididecks-AI-Visual-and-Diagram-Component-Library.md)
- **Business-model exploration:** [`context-v/explorations/Dididecks-AI-Business-Model.md`](./context-v/explorations/Dididecks-AI-Business-Model.md)
- **Splash (GitHub Pages target):** [`splash/`](./splash/)
- **Client engagements driving the pattern:** [`client-sites/`](./client-sites/) (submodules)

## Status

**Early architecture.** No core implementation yet. The splash page, the specs,
and the two existing client engagements (`calmstorm-decks`, `reach-edu-hub`) are
the entire surface area today. Implementation prompts will follow under
`context-v/prompts/`.

## Parentage

Part of the [`ai-labs`](https://github.com/lossless-group/ai-labs) pseudomonorepo —
sibling to `memopop-ai`. Inherits the same architectural shape (backend / frontend /
cross-platform divisions) and the same spec-writing rhythm.

## Branches

Three-tier model per the Lossless `pseudomonorepos` discipline:

- `development` — default. Day-to-day work lands here.
- `main` — noteworthy ships; what the splash deploys from.
- `master` — long-lived release tier.
