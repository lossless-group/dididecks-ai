# @dididecks/frontend

This is the active SvelteKit product app for DidiDecks inside Michael's `dididecks-ai` repo.

## Strategy

- No AiStack backend code is copied here.
- No AiStack private implementation files are referenced here.
- Local SvelteKit API routes provide an MVP repo-local contract under `/api/dididecks/*`.
- This local API is only for local product development and testing.

## Boundaries

- `apps/deck-shell` remains the Astro integration/reference package.
- `splash` remains the Astro landing/reference site.
- `context-v` remains product/spec source material.
- `client-sites` and `.gitmodules` remain untouched.
- No secrets belong in committed frontend files.

## Commands

```bash
pnpm install
pnpm --filter @dididecks/frontend check
pnpm --filter @dididecks/frontend build
pnpm --filter @dididecks/frontend dev
```
