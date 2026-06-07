# Agent instructions for dididecks-ai

## What this repo is

`dididecks-ai` is a core child of the `ai-labs` pseudomonorepo. It is the
home for a code-first slide-deck operating system aimed at Due-Diligence-grade
content. The driving narrative lives in `context-v/specs/Dididecks-AI-Slide-Decks-as-Code.md`.

## Read these before working here

1. `context-v/specs/Dididecks-AI-Slide-Decks-as-Code.md` — the parent spec.
2. `context-v/specs/Dididecks-AI-DD-Ready-Citation-and-Source-Access.md` — sibling spec.
3. `context-v/specs/Dididecks-AI-Visual-and-Diagram-Component-Library.md` — sibling spec.
4. `context-v/explorations/Dididecks-AI-Business-Model.md` — business-model exploration.
5. `context-v/sitemap/README.md` — living map of every shell artifact (routes + components). Per-client sitemaps live in `client-sites/<client>/context-v/sitemap/`.
6. `client-sites/calmstorm-decks/` and `client-sites/reach-edu-hub/` — the two live client engagements that exercise the DidiDecks pattern.

## Naming is fuzzy here — Scroll-UI vs. Play-UI

DidiDecks' proprietary process maintains **two coordinated implementations** of every deck — NOT two views of the same content. They are different components with different constraints, deliberately coupled by slot identity.

- **Scroll-UI slide** — a **section** component inside one long `/scroll/{deck}/{variant}/index.astro` page. Responsive CSS, vertical reading, can carry inline scripts and reveal animations. This is the surface Claude (and most humans) design **in**, because responsive sections come naturally.
- **Play-UI slide** — a **standalone component file** at `src/components/slides/{variant}/{slot}-{slug}.astro`, rendered by the shell's `/play/[deck]/[variant]/[slot]/` route inside `SlideCanvas`. Rigid 16:9 aspect ratio at the 1920×1080 design size. **No responsive CSS. No JS in the slide itself.** Static HTML/CSS only, so it letterboxes cleanly to any viewport and can be exported to PDF without runtime hydration. This is the surface Claude is **bad at** — the rigid-aspect, no-responsive, no-JS constraint is unfamiliar.

### The workflow this implies

Design first in Scroll-UI, then **convert each section into its Play-UI counterpart**. The conversion is non-trivial — it's the "recreate, don't extract" discipline encoded in `/api/slide-decompose`. This is Phase 1 → Phase 2 of the deck-iteration-workflow. The two implementations are coordinated by **slot identity** (e.g. `pitch/enhanced-v3/05` is the same conceptual slot in both), but the files are different and live in different parts of the tree.

### Practical consequences

- A deck **has** Play-UI only when its per-slide files exist at `src/components/slides/{variant}/`. The presence of a `/scroll/` route does **not** imply `/play/` is available. The `/play/` chooser should reflect per-slide-file existence at runtime, not a static `format` field in the registry.
- When asked to "add a slide," ask which UI you're working in. If you're designing fresh, default to Scroll-UI; if you're presenting/shipping, the Play-UI counterpart must exist.
- Several **overlay** components ship in paired variants (`<DeckOverlay--Scroll-UI>` and `<DeckOverlay--Play-UI>`) because the overlay surfaces themselves differ; the `--Scroll-UI` / `--Play-UI` suffix is part of the public name.
- A **slide** is one slot's worth of content; a **variant** is an ordered set of slides (e.g. `enhanced-v3`); a **deck** is the variant *as-rendered* in whichever UI mode the reader is in.

### Why we work this way

Claude (and modern LLMs in general) are good at responsive section-based design and poor at rigid no-JS static-aspect-ratio layouts. The Scroll-UI is where ideas get explored cheaply; the Play-UI is where they get pinned to fundraise-grade presentation discipline. The shell exists to keep those two implementations coordinated without forcing premature pinning.

## Skills to load when working here

- `context-vigilance` — directory roles, frontmatter, versioning for context-v/.
- `astro-knots` — framework rules, prohibitions, tech hierarchy for any Astro work (the splash and the client-sites both live in this constraint set).
- `pseudomonorepos` — parent-repo patterns, branch alignment, submodule mechanics. This repo is itself a pseudomonorepo (it carries client-sites as submodules) AND a child of `ai-labs`.
- `maintain-splash-pages` — splash conventions when working under `splash/`.
- `deck-iteration-workflow` — slide-iteration rhythm aligned with the calmstorm-decks pattern.

### Where the canonical snapshot of these skills lives in-repo

A checked-in snapshot of every skill load-bearing for dididecks-ai work
lives at `context-v/agent-skills/`. Each agent reads skills from
*its own* install location (Claude Code from `~/.claude/skills/`,
Pi from `~/.pi/skills/`, etc.), so the in-repo copy is **not** what
agents actually load at runtime.

**Each collaborator will have their own system for managing
agent-skills on their machine. Collaborators should make sure their
skills are current with `dididecks-ai`'s `agent-skills` in
`context-v`. Alternately, if they iterate on or create agent-skills,
they should update them in the `dididecks-ai` repo as best they can.**

See `context-v/agent-skills/README.md` for the full list, the
authoring discipline, and what's deliberately not included.

## Branch discipline

Three tiers: `development` → `main` → `master`. Default branch is `development`.
Do not push directly to `main` or `master` without a deliberate ship reason.

## Submodules carried by this repo

- `client-sites/calmstorm-decks` — Calm/Storm fundraise materials (tracks `development`).
- `client-sites/reach-edu-hub` — Reach University fundraising surface (tracks `main`).

Both are independent repos on GitHub. The `branch =` line in `.gitmodules` is
required per the pseudomonorepos branch-alignment discipline.

## Auth surface conventions

The deck client-sites (calmstorm-decks, chroma-decks, future) install a
shared auth pattern: middleware-gated routes, `Identity` + `Session` +
`MintedToken` tables in astro:db, OAuth via `arctic`, magic-link redemption,
passcode tier-3 fallback. Plan files live in each client-site's
`context-v/plans/Install-Auth-Surface-from-Calmstorm-Pattern.md`.

**Organization naming convention — domain-as-id.** `Organization.id` is the
org's canonical email domain (e.g. `lossless.group`, `trychroma.com`,
`calmstormvc.com`). `Organization.slug` carries the human-readable handle.
Every deck seeds **`lossless.group`** (operating-team org) plus
**`{client-domain}`** (the client this deck represents). Personal-email
signups bucket as `id = "personal"`. Full rationale + edge-case handling
in the parent ai-labs Shared-Auth exploration:
`../context-v/explorations/Shared-Auth-for-Applied-AI-Labs.md` → section
"Organization naming convention — domain-as-id."

## Local RAG over the Lossless corpus (ChromaDB)

A local Chroma database is wired into Claude Code via the `chroma` MCP server. Four collections aggregate prior Lossless work across the whole tree:

- `context-vigilance-corpus` — section-chunked `context-v/` files across every repo
- `lossless-changelog`        — every `<repo>/changelog/` entry, cross-repo
- `claude-code-sessions`      — every prior Claude Code message turn
- `claude-code-tool-traces`   — every prior tool invocation, with success/error flag

**Use it before answering from training data.** When the user asks a question that prior work might answer — *"what did we decide about X"*, *"when did we ship X"*, *"why did we choose X over Y"*, *"has this errored before"*, *"where did we put X"* — call `mcp__chroma__chroma_query_documents` against the most relevant collection (start with `n_results=5`). If results cover the question, synthesize an answer and cite `source_path` + timestamp + `source_repo_slug` for every claim. If there is a gap, run one more focused query. **Cap at 5 chroma queries per question** — if the corpus has no answer, say so explicitly rather than silently falling back to training data.

The full algorithm (decompose → execute → evaluate → synthesize, plus `where`-filter patterns, anti-patterns, and when NOT to use it) lives in the `search-lossless-corpus` skill, which auto-loads when the question matches the trigger shapes. This block is the backstop so the corpus is known to exist even when the skill description does not match.

Ingestion lives under `ai-labs/context-vigilance-kit/scripts/` (`ingest-all.sh` is the master). Do not re-ingest as a side effect of unrelated work — the user runs it deliberately.
