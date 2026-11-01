# Agent instructions for `dididecks-ai`

> `CLAUDE.md` is a symlink to this file, so every coding agent reads the same
> instructions. Edit `AGENTS.md`; never replace the symlink with a copy.

DidiDecks is a code-first slide-deck operating system for due-diligence-grade
content. This repo is a child of the `ai-labs` pseudomonorepo and is itself a
pseudomonorepo: it carries the shared deck tooling and, as submodules, one
repo per client engagement.

***

## Read first

1. `context-v/specs/Dididecks-AI-Slide-Decks-as-Code.md`: the parent spec.
2. `FILEMAP.md`: the living map of the repo.
3. `context-v/sitemap/README.md`: every shell route and component. Each client
   site has its own under `client-sites/<client>/context-v/sitemap/`.
4. Sibling specs when the work touches them:
   `Dididecks-AI-DD-Ready-Citation-and-Source-Access.md`,
   `Dididecks-AI-Visual-and-Diagram-Component-Library.md`.

***

## Layout

| Path | What it is |
|---|---|
| `apps/deck-shell/` | `@dididecks/shell` (published name `@lossless-group/dididecks-shell`): the Astro integration every client site installs. Authoring side: slide rater, triage, deck registry, injected `/play` and `/toc` routes. Its viewer components are one-line re-exports from the player. |
| `packages/dididecks-player/` | **Submodule**, its own public repo `lossless-group/dididecks-player`, on npm as `@lossless-group/dididecks-player`. Viewer side: `SlideCanvas`, `DeckPlayer`, `PrintDeck`, `PageAsDeckWrapper`, `DeckChrome`, `ModeToggle`. Usable from any Astro site. Commit there, not here. |
| `packages/deck-export/` | `deck-export` CLI: slide PDFs, full decks, and the `html` single-file tier (`--public` drops post-NDA sections, `--clean` strips authoring tools for a client's own site). Run with `pnpm export …`. |
| `packages/shared/` | `@dididecks/shared`: shared types and helpers. |
| `apps/frontend/` | `@dididecks/frontend`: the SvelteKit product shell for Vercel. Persistence, auth, billing and AI workflows belong to the backend (`aistack-backend/app/products/dididecks`), never here. See `architecture/`. |
| `client-sites/<client>/` | **Submodules**, one private repo per engagement: calmstorm-decks, chroma-decks, eventcut-ai, humain-vc-decks, lfg-hub, lossless-decks, reach-edu-hub, the-water-foundation. `.gitmodules` is authoritative. `jobmachine/` is a gitignored local checkout. |
| `corpus/` | **Submodule**: example decks and slide archetypes. |
| `splash/` | GitHub Pages site. Standalone install (`--ignore-workspace`), deploys on push to `main`. |
| `context-v/` | Specs, plans, prompts, loops, and a snapshot of the skills this repo depends on. |

***

## Scroll-UI and Play-UI: two implementations, not two views

Every deck is built twice, coordinated by **slot identity** (`pitch/enhanced-v1/05`
is the same slot in both):

| | Scroll-UI | Play-UI |
|---|---|---|
| Where | sections in one `src/pages/scroll/<deck>/<variant>/index.astro` | one file per slide, `src/components/slides/<variant>/<NN>-<slug>.astro` |
| Rendered by | the page itself | the shell's `/play/<deck>/<variant>/<slot>/` route inside `SlideCanvas` |
| Rules | responsive CSS, scripts and reveal animations allowed | fixed 1920×1080, **no responsive CSS, no JS in the slide**, static HTML/CSS only |
| For | designing and iterating; reading on the web | presenting and PDF export |

**Workflow:** design in Scroll-UI, then recreate each section as its Play-UI
slide ("recreate, don't extract"). A deck has Play-UI only when its slide files
exist; a `/scroll/` route does not imply `/play/`.

**Why:** agents are good at responsive sections and poor at rigid fixed-aspect
layouts. Scroll is where ideas get cheap; Play is where they get pinned.

**Both ship.** Scroll is the better web experience; Play and the PDF exist for
presenting and for people who want an attachment. When putting a deck on a
client's site, offer the scroll deck first (`deck-export html --public --clean`)
with play and PDF alongside.

**Vocabulary:** a *slide* is one slot; a *variant* is an ordered set of slides
(`enhanced-v1`); a *deck* is a variant as rendered in either UI. Paired overlay
components carry the mode in their name: `DeckOverlay--Scroll-UI`,
`DeckOverlay--Play-UI`.

**PDF pitfalls:** blurred `box-shadow` prints as grey boxes in Preview, and
CSS-masked logos leave hairlines. Play CSS should drop shadows and draw marks
as filtered images.

***

## Commands and skills

- `/remake-deck <Company> <client-site> <source-deck> [KEY=value …]`: a source
  deck becomes N clean-room design variants in Scroll-UI. Runs
  `context-v/plans/Remake-Source-Deck-into-Design-Variants.md`; read
  `context-v/prompts/README.md` first.
- `/slide-target <deck> <variant> <slot>`: scope work to one slide.
- `README.md` → "Commands" lists every command. To add one: procedure in
  `context-v/` first, a thin `.claude/commands/<name>.md`, a mirror skill in
  `context-v/agent-skills/<name>/`, and a README row.

Load these skills here: `deck-iteration-workflow`, `remake-deck`,
`setup-new-dddecks-workspace` (new client), `astro-knots`, `theme-system`,
`pseudomonorepos`, `context-vigilance`, `changelog-conventions`,
`git-conventions`, `maintain-splash-pages` (under `splash/`).

`context-v/agent-skills/` is a checked-in **snapshot** for collaborators;
agents load skills from their own install location. Keep the snapshot current
with what you use, and push skill changes back to it.

***

## Working rules

- **Branches:** `development` → `main` → `master`; `development` is default.
  Each submodule tracks the branch named in `.gitmodules`. Don't push to `main`
  or `master` without a ship reason.
- **Submodules:** commit inside the child repo. Leave this repo's gitlinks
  dirty during a session; bump them once at wrap-up in a
  `chore(submodule): bump <names>` commit.
- **Installs:** there is no workspace lockfile for now (submodule lockfiles
  collide with it). Install with `pnpm install --no-lockfile`, and don't
  recreate `pnpm-lock.yaml` at the root. `splash/` keeps its own lockfile.
- **Privacy:** client sites are private. Their content never rolls up to the
  splash or any public surface, and post-NDA slides carry `data-tier="post-nda"`
  so exports can drop them.
- **Dev servers:** never use port 3000; pick from 3100 up.
- **Changelogs:** `changelog/YYYY-MM-DD_NN.md` here and in each client site,
  per `changelog-conventions`. Section breaks are `***`, never `---`.

***

## Auth on client sites

Client sites share one auth pattern: middleware-gated routes, `Identity`,
`Session` and `MintedToken` tables, OAuth via `arctic`, magic links, and a
passcode fallback. Install plan per site:
`client-sites/<client>/context-v/plans/Install-Auth-Surface-from-Calmstorm-Pattern.md`.

- `Organization.id` is the org's email domain (`lossless.group`,
  `trychroma.com`); `slug` is the readable handle. Every deck seeds
  `lossless.group` and the client's domain; personal email signs up as
  `personal`. Rationale: `../context-v/explorations/Shared-Auth-for-Applied-AI-Labs.md`.
- Passcodes must contain no dashes: the matcher reads everything after the
  first dash as a label.

***

## Prior work (ChromaDB)

The `chroma` MCP server indexes the whole Lossless tree:
`context-vigilance-corpus`, `lossless-changelog`, `claude-code-sessions`,
`claude-code-tool-traces`. For "what did we decide / when did we ship / has
this broken before", query it before answering from memory: `n_results=5`,
at most five queries, cite `source_path`. Full method in the
`search-lossless-corpus` skill. Never re-ingest as a side effect; the user runs
`context-v-corpus/scripts/ingest-all.sh` deliberately.

***

<!-- lossless:browser-drive:start -->
## Verify in a browser before handing over

Drive a real browser before asking a human to walk a surface.

- **Playwright MCP** (default, headless): add at project scope,
  `claude mcp add -s project playwright -- npx @playwright/mcp@latest`.
  New MCP servers load next session.
- **`claude --chrome`** (interactive): drives the operator's Chrome while they
  watch.

Prefer accessibility snapshots to screenshots unless the question is visual.
Read freely; write only to a designated safe target. Name the click-path in the
phase plan. A drive proves the buttons work; the human still judges whether
the surface is usable. Pattern:
`context-v/blueprints/Browser-Drive-Verification-For-Agent-Sessions.md` at the
anchor monorepo root.
<!-- lossless:browser-drive:end -->
