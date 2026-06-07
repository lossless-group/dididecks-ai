# DidiDecks-AI

A code-first slide-deck operating system for Due-Diligence-grade content,
built by [The Lossless Group](https://lossless.group).

The codename **DidiDecks** is a contraction of **Due Diligence** — the bar this
product is built to clear. We are not building a "better Gamma." We are building
the end-to-end deck-content operating system for high-stakes, time-pressured,
recurring VC/Private Markets/Philanthropy work that single-deck tools don't address.

## Where things live

- **Living spec:** [`context-v/specs/Dididecks-AI-Slide-Decks-as-Code.md`](./context-v/specs/Dididecks-AI-Slide-Decks-as-Code.md)
- **Sibling specs:**
  - [`Dididecks-AI-DD-Ready-Citation-and-Source-Access`](./context-v/specs/Dididecks-AI-DD-Ready-Citation-and-Source-Access.md)
  - [`Dididecks-AI-Visual-and-Diagram-Component-Library`](./context-v/specs/Dididecks-AI-Visual-and-Diagram-Component-Library.md)
- **Business-model exploration:** [`context-v/explorations/Dididecks-AI-Business-Model.md`](./context-v/explorations/Dididecks-AI-Business-Model.md)
- **Splash (GitHub Pages target):** [`splash/`](./splash/)
- **Client engagements driving the pattern:** [`client-sites/`](./client-sites/) (submodules)
- **Agent skills (shared snapshot):** [`context-v/agent-skills/`](./context-v/agent-skills/)
- **Living filemap (auto-generated, hand-curated preface):** [`FILEMAP.md`](./FILEMAP.md) — new collaborators open this first; maintained by the [`maintain-filemap`](./context-v/loops/maintain-filemap/SKILL.md) loop.

## Collaborating across machines — agent skills

Each collaborator runs Claude Code (or Pi / Cursor / etc.) with skills
installed at their *own* path (`~/.claude/skills/`, `~/.pi/skills/`,
…). Skills wire the same conventions into every collaborator's agent
so the team's discipline is consistent across hands.

The canonical snapshot of every skill load-bearing for `dididecks-ai`
work lives at [`context-v/agent-skills/`](./context-v/agent-skills/).

> **Each collaborator will have their own system for managing
> agent-skills on their machine. Collaborators should make sure their
> skills are current with `dididecks-ai`'s `agent-skills` in
> `context-v`. Alternately, if they iterate on or create
> agent-skills, they should update them in the `dididecks-ai` repo as
> best they can.**

See [`context-v/agent-skills/README.md`](./context-v/agent-skills/README.md)
for the full skill list, the discipline, and what's deliberately not
included in the snapshot.

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
