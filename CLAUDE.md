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
5. `client-sites/calmstorm-decks/` and `client-sites/reach-edu-hub/` — the two live client engagements that exercise the DidiDecks pattern.

## Skills to load when working here

- `context-vigilance` — directory roles, frontmatter, versioning for context-v/.
- `astro-knots` — framework rules, prohibitions, tech hierarchy for any Astro work (the splash and the client-sites both live in this constraint set).
- `pseudomonorepos` — parent-repo patterns, branch alignment, submodule mechanics. This repo is itself a pseudomonorepo (it carries client-sites as submodules) AND a child of `ai-labs`.
- `maintain-splash-pages` — splash conventions when working under `splash/`.
- `deck-iteration-workflow` — slide-iteration rhythm aligned with the calmstorm-decks pattern.

## Branch discipline

Three tiers: `development` → `main` → `master`. Default branch is `development`.
Do not push directly to `main` or `master` without a deliberate ship reason.

## Submodules carried by this repo

- `client-sites/calmstorm-decks` — Calm/Storm fundraise materials (tracks `development`).
- `client-sites/reach-edu-hub` — Reach University fundraising surface (tracks `main`).

Both are independent repos on GitHub. The `branch =` line in `.gitmodules` is
required per the pseudomonorepos branch-alignment discipline.

## Local RAG over the Lossless corpus (ChromaDB)

A local Chroma database is wired into Claude Code via the `chroma` MCP server. Four collections aggregate prior Lossless work across the whole tree:

- `context-vigilance-corpus` — section-chunked `context-v/` files across every repo
- `lossless-changelog`        — every `<repo>/changelog/` entry, cross-repo
- `claude-code-sessions`      — every prior Claude Code message turn
- `claude-code-tool-traces`   — every prior tool invocation, with success/error flag

**Use it before answering from training data.** When the user asks a question that prior work might answer — *"what did we decide about X"*, *"when did we ship X"*, *"why did we choose X over Y"*, *"has this errored before"*, *"where did we put X"* — call `mcp__chroma__chroma_query_documents` against the most relevant collection (start with `n_results=5`). If results cover the question, synthesize an answer and cite `source_path` + timestamp + `source_repo_slug` for every claim. If there is a gap, run one more focused query. **Cap at 5 chroma queries per question** — if the corpus has no answer, say so explicitly rather than silently falling back to training data.

The full algorithm (decompose → execute → evaluate → synthesize, plus `where`-filter patterns, anti-patterns, and when NOT to use it) lives in the `search-lossless-corpus` skill, which auto-loads when the question matches the trigger shapes. This block is the backstop so the corpus is known to exist even when the skill description does not match.

Ingestion lives under `ai-labs/context-vigilance-kit/scripts/` (`ingest-all.sh` is the master). Do not re-ingest as a side effect of unrelated work — the user runs it deliberately.
