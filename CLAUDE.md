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
