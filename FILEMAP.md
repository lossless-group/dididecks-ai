# Filemap · dididecks-ai

> **What is this file?** A living snapshot of this repo's directory shape — top-level dirs annotated for purpose, plus an auto-generated tree to depth 3. Maintained by the [`maintain-filemap`](./context-v/loops/maintain-filemap/SKILL.md) loop. Regenerate via:
>
> ```bash
> bash context-v/loops/maintain-filemap/scripts/regen-filemap.sh
> ```

## Top-level directories

| Path | What it is |
|---|---|
| **`apps/deck-shell/`** | The shared shell — `@dididecks/shell` workspace package. Routes (`/scroll/`, `/play/`, `/toc/`, `/data-assets/`), components (SlideCanvas, DeckMatrix, DeckOverlay, ScrollDeckPage, …), runtime, lib, and the Astro integration that injects them into every client-site. The single source of truth for deck UI behavior. |
| **`changelog/`** | Dated ship notes per the [`changelog-conventions`](./context-v/agent-skills/changelog-conventions/SKILL.md) discipline. `YYYY-MM-DD_NN.md`. Authored at the conclusion of coherent flows of work, not every commit. |
| **`client-sites/`** | Per-client deck workspaces, each a separate Git repo mounted as a submodule. Four live: `calmstorm-decks`, `chroma-decks`, `humain-vc-decks`, `reach-edu-hub`. Each has its own `data/`, `db/`, `src/`, `corpus/`, `DESIGN.md`. Branch-tier alignment with parent per the [`pseudomonorepos`](./context-v/agent-skills/pseudomonorepos/SKILL.md) discipline. |
| **`context-v/`** | Living documentation. Eight categories: `agent-skills/` (in-repo snapshot of upstream skills for collaborators), `explorations/`, `loops/` (definitions of recurring loops, e.g. `Remake-Source-Decks-Queue`), `models/` (filesystem-as-data-store schemas for the future remote DB), `narratives/`, `plans/`, `prompts/` (single-role subagent briefs with `{{VARIABLES}}`; the `/remake-deck` pipeline lives here and in `plans/`, see `prompts/README.md`), `reminders/`, `sitemap/` (living map of every shell artifact), `specs/`. |
| **`corpus/`** | Newly-mounted submodule (`https://github.com/lossless-group/dddecks-corpus`, private). Team-visible home for substantiation material — founder PDFs, intake bursts, brand-asset libraries — that's too large or sensitive for the parent. Per-client `<client>/corpus/` directories remain gitignored for one-operator scratch. |
| **`splash/`** | GitHub Pages target. Public-facing splash for the project per the [`maintain-splash-pages`](./context-v/agent-skills/maintain-splash-pages/SKILL.md) discipline. Renders curated marketing copy + selected changelog entries. |
| **`.claude/commands/`** | Committed Claude Code slash commands (the rest of `.claude/` stays gitignored). Each is a thin wrapper around a `context-v/` plan; every command is listed in `README.md` → "Commands". Currently: `/remake-deck`. |
| **`CLAUDE.md`** | Agent instructions checked into the codebase. Loaded into every Claude Code session opened anywhere under this tree. Carries the relocation HARD STOP rules, branch-tier model, RAG-over-Lossless-corpus backstop, and auth surface conventions. |
| **`README.md`** | Human-facing repo intro — spec pointers, status, parentage, branch model, collaboration discipline (agent skills). |
| **`.gitmodules`** | Five submodule mounts: `calmstorm-decks`, `reach-edu-hub`, `chroma-decks`, `humain-vc-decks` (under `client-sites/`) + `corpus`. Each pins a `branch =` per the branch-alignment discipline. |
| **`pnpm-workspace.yaml`** | pnpm workspace declaration. Includes `apps/*`, `client-sites/chroma-decks`, `client-sites/humain-vc-decks`. Other client-sites have their own pnpm setup. |
| **`package.json`** | Parent package manifest. Mostly meta; the real package work happens in `apps/deck-shell/` + each client-site. |

## Tree (depth 3, auto-generated)

<!-- TREE-START -->
```
.
├── apps
│   └── deck-shell
│       ├── scripts
│       ├── src
│       ├── package.json
│       ├── README.md
│       └── tsconfig.json
├── changelog
│   ├── 2026-05-11_01.md
│   ├── 2026-05-12_01.md
│   ├── 2026-05-12_02.md
│   ├── 2026-05-12_03.md
│   ├── 2026-05-16_01.md
│   ├── 2026-05-17_01.md
│   ├── 2026-05-17_02.md
│   ├── 2026-05-17_03.md
│   ├── 2026-05-17_04.md
│   ├── 2026-05-17_05.md
│   ├── 2026-05-17_06.md
│   ├── 2026-06-06_01.md
│   └── 2026-06-06_02.md
├── client-sites
│   ├── calmstorm-decks
│   │   ├── context-v
│   │   ├── data
│   │   ├── db
│   │   ├── public
│   │   ├── scripts
│   │   ├── src
│   │   ├── astro.config.mjs
│   │   ├── astro.db
│   │   ├── DESIGN.md
│   │   ├── draft-palette__CalmStorm.json
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── pnpm-lock.yaml
│   │   ├── pnpm-workspace.yaml
│   │   ├── README.md
│   │   ├── tsconfig.json
│   │   └── vercel.json
│   ├── chroma-decks
│   │   ├── changelog
│   │   ├── context-v
│   │   ├── corpus
│   │   ├── data
│   │   ├── db
│   │   ├── exports
│   │   ├── public
│   │   ├── scripts
│   │   ├── src
│   │   ├── astro.config.mjs
│   │   ├── auth.db
│   │   ├── DESIGN.md
│   │   ├── draft-palette__Chroma.json
│   │   ├── package.json
│   │   ├── pnpm-lock.yaml
│   │   ├── pnpm-workspace.yaml
│   │   ├── README.md
│   │   ├── tsconfig.json
│   │   └── vercel.json
│   ├── humain-vc-decks
│   │   ├── context-v
│   │   ├── corpus
│   │   ├── data
│   │   ├── src
│   │   ├── astro.config.mjs
│   │   ├── DESIGN.md
│   │   ├── package.json
│   │   ├── README.md
│   │   └── tsconfig.json
│   └── reach-edu-hub
│       ├── changelog
│       ├── context-v
│       ├── public
│       ├── src
│       ├── astro.config.mjs
│       ├── package.json
│       ├── pnpm-lock.yaml
│       ├── README.md
│       ├── tsconfig.json
│       └── vercel.json
├── context-v
│   ├── agent-skills
│   │   ├── astro-knots
│   │   ├── changelog-conventions
│   │   ├── context-vigilance
│   │   ├── crawl-fetch-ingest
│   │   ├── deck-iteration-workflow
│   │   ├── generate-consistent-og-images
│   │   ├── git-conventions
│   │   ├── lossless-flavored-markdown
│   │   ├── maintain-design-md
│   │   ├── maintain-splash-pages
│   │   ├── open-graph-share-seo-geo
│   │   ├── overlay-svg-text
│   │   ├── pseudomonorepos
│   │   ├── search-lossless-corpus
│   │   ├── study-repos-first
│   │   ├── theme-system
│   │   └── README.md
│   ├── explorations
│   │   ├── Chroma-Brand-and-Deck-Notes.md
│   │   ├── Chroma-Parity-and-the-Path-to-a-Shared-Deck-UI-Module.md
│   │   ├── Dididecks-AI-Business-Model.md
│   │   ├── Plans-Inventory-2026-05-16.md
│   │   └── Plans-Inventory-and-Phase-A-Outcome.md
│   ├── loops
│   │   ├── maintain-filemap
│   │   └── README.md
│   ├── models
│   │   ├── Auth-Surface-Data-Model.md
│   │   ├── Company-Data-Model.md
│   │   ├── Deck-Variant-Slot-Registry-Data-Model.md
│   │   ├── Engagement-Telemetry-Data-Model.md
│   │   ├── Firm-Data-Model.md
│   │   ├── Person-Data-Model.md
│   │   ├── README.md
│   │   ├── Slide-Audit-Registry-Data-Model.md
│   │   └── Substantiation-Corpus-Data-Model.md
│   ├── plans
│   │   ├── Componentize-Slides-and-Establish-Component-Library.md
│   │   ├── Init-Chroma-Decks-Client-Site.md
│   │   ├── Init-DidiDecks-as-core-Submodule-of-AI-Labs.md
│   │   ├── Lift-Chroma-Decks-Generic-Code-into-Shared-Shell.md
│   │   ├── Phase-A-Plus-In-Deck-Ranking-Shared-Nav-and-Play-Runtime.md
│   │   ├── Phase-A-Plus-Plus-Play-Fidelity-In-Play-Ranking-and-Variant-URL-Safety.md
│   │   ├── Port-Enhanced-v2-Scroll-Slides-to-Static-16x9-Play-Slides-for-PDF-Export.md
│   │   ├── Redesign-TOC-as-Deck-Level-Dual-Surface-Review-Matrix.md
│   │   ├── Refactor-Data-Assets-Audit-for-Brand-Quality-Ratings-and-Render-Guards.md
│   │   ├── Refactor-Scroll-Ported-Slides-to-Static-Play-Format.md
│   │   ├── Restore-Calmstorm-Nav-Elegance-as-Themable-Shell-Primitives.md
│   │   └── Stand-Up-Dididecks-Shell-and-Ship-Chroma-TOC-Ranking.md
│   ├── reminders
│   │   └── Auth-Loose-Ends.md
│   ├── sitemap
│   │   ├── components
│   │   ├── lib
│   │   ├── routes
│   │   ├── runtime
│   │   └── README.md
│   └── specs
│       ├── Calmstorm-Auth-Inventory.md
│       ├── Cloud-Workspace-for-Dididecks.md
│       ├── Dididecks-AI-DD-Ready-Citation-and-Source-Access.md
│       ├── Dididecks-AI-Slide-Decks-as-Code.md
│       └── Dididecks-AI-Visual-and-Diagram-Component-Library.md
├── corpus
│   ├── narratives
│   │   ├── ChromaDB_Deck-Outline__Enhanced-v1.md
│   │   └── ChromaDB_Deck-Outline__Proto.md
│   └── README.md
├── exports
│   ├── 2025-05-12_Chroma_Series-A_DDDeck-MS-v2.pdf
│   └── 2025-05-12_Chroma_Series-A_DDDeck-MS.pdf
├── splash
│   ├── public
│   │   ├── favicon.svg
│   │   ├── ogimage__DDDecks--Bankers-Safe.png
│   │   └── robots.txt
│   ├── src
│   │   ├── layouts
│   │   ├── pages
│   │   └── styles
│   ├── astro.config.mjs
│   ├── DESIGN.md
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── pnpm-workspace.yaml
│   ├── README.md
│   └── tsconfig.json
├── CLAUDE.md
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```
<!-- TREE-END -->

## See also

- [`context-v/loops/maintain-filemap/SKILL.md`](./context-v/loops/maintain-filemap/SKILL.md) — what governs this file's update cadence
- Per-submodule `FILEMAP.md` files (when submodules are present) for deeper trees
