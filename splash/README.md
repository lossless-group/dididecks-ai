# dididecks-ai splash

GitHub Pages landing page for the `dididecks-ai` pseudomonorepo.
Live target: `https://lossless-group.github.io/dididecks-ai/`.

## Local dev

```bash
pnpm install --ignore-workspace
pnpm dev
# visit http://localhost:4321/dididecks-ai/
```

`--ignore-workspace` is required because the parent (`ai-labs/`) workspace
boundaries do not include this splash; the splash installs its own deps.

## Build

```bash
pnpm build
# output in dist/
```

## Deploy

Push to `main`. A GitHub Actions workflow (TBD) builds `splash/` and deploys
via `actions/deploy-pages@v4`. Pages source must be set to "GitHub Actions"
in the repo settings on first run.

## Where content lives

- **Hero, principles, system map:** `src/pages/index.astro` (hand-curated copy).
- **Tokens:** `src/styles/global.css`.
- **`/changelog/` and `/context-v/`:** read at build time, never copied into
  this repo (`src/content.config.ts`):
  - dididecks-ai's own `changelog/` and `context-v/` from the checkout;
  - each child in `../.gitmodules` from the GitHub API
    (`src/loaders/github.ts`: one tree call per child, then blobs by sha).

A child is read only when its repo is **public** and it is **not** under
`client-sites/`. Anything that can't be shown to be public is skipped with a
warning, so a private repo can never leak here. Files with `publish: false` or
`private: true` are held back, and `context-v/extra/` and
`context-v/agent-skills/` never become pages.

There is no sync step. A deploy picks up whatever the children have on their
tracked branch (`branch =` in `.gitmodules`). Locally, set `GITHUB_API_TOKEN`
(or `GITHUB_TOKEN`) to raise the API rate limit; CI passes its own token.

## Status

Hero, North Stars, principles, system map, spec gallery, changelog and
context-v render. Search (Pagefind) and sort controls are not added yet.
