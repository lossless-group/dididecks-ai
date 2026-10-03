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

## Commands

Type these into an agent chat opened at this repo's root. In Claude Code they
are slash commands that arrive with `git pull` (`.claude/commands/`). In other
agent chats (Claude desktop, pi, Cursor, Codex), load the matching skill from
[`context-v/agent-skills/`](./context-v/agent-skills/).

| Command | What it does |
|---|---|
| `/remake-deck <Company> <client-site> <source-deck> [KEY=value …]` | Turns a source deck (PDF, PPTX, or slide images) into 3 clean-room design variants that play in the Scroll-UI shell at `/scroll/<deck>/v1…v3/`. It extracts and audits the deck, designs each variant from the content only, refactors each into `Section__<Name>.astro` components, and verifies them in a real browser. Optional overrides: `N_VARIANTS`, `DECK_SLUG`, `CONTENT_POLICY`, `BRAND_POLICY`, `INCLUDE_FAITHFUL`. Runs for 30–60 minutes. |
| `/slide-target <deck> <variant> <slot>` | Loads everything about one slide and scopes the work to it. Skill only: [`slide-target`](./context-v/agent-skills/slide-target/SKILL.md). |

Example:

```text
/remake-deck "Edit on the Spot" eventcut-ai client-sites/eventcut-ai/inputs/2026-08-02_EventCut_Deck/EventCut-Deck-2026-08-02.pdf
```

How `/remake-deck` is put together (Loop → Plan → Prompt, the variables, and
where outputs land) is in
[`context-v/prompts/README.md`](./context-v/prompts/README.md). The plan it
runs is
[`Remake-Source-Deck-into-Design-Variants`](./context-v/plans/Remake-Source-Deck-into-Design-Variants.md).
**To add a command:** write the procedure in `context-v/` first, add a thin
`.claude/commands/<name>.md` that points at it, mirror it as a skill in
`context-v/agent-skills/<name>/`, and add a row here.

## Status

**Website frontend active.** The deployable product shell lives in `apps/frontend`
and is intended to ship as the website surface. The durable backend remains a
separate product boundary.

## Frontend / Backend Split

DidiDecks must be treated as a real SaaS product shell, not just a static deck
UI.

The clean split is:

```text
dididecks-ai/apps/frontend
  = deployable frontend shell on Vercel
  = routes, components, typed API clients

aistack-backend/app/products/dididecks
  = product backend
  = persistence, auth, billing, deck state, review state, and AI workflows
```

The frontend may render the full product shell, but it must not become the
source of truth for persistence, billing, auth, AI command execution, or
database writes outside approved APIs.

## Parentage

Part of the [`ai-labs`](https://github.com/lossless-group/ai-labs) pseudomonorepo —
sibling to `memopop-ai`. Inherits the same architectural shape (backend / frontend /
cross-platform divisions) and the same spec-writing rhythm.

## Branches

Three-tier model per the Lossless `pseudomonorepos` discipline:

- `development` — default. Day-to-day work lands here.
- `main` — noteworthy ships; what the splash deploys from.
- `master` — long-lived release tier.
