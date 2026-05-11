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

- **Hero, principles, system map** — `src/pages/index.astro` (hand-curated copy).
- **Long-form** — the splash links into the repo's `context-v/specs/` and
  `changelog/`; future iteration will roll up those files via
  `pnpm rollup:sync` per the `maintain-splash-pages` habit.
- **Tokens** — `src/styles/global.css`.

## Status

First-pass scaffold. Hero, two North Stars, Design Principles, system map,
and sibling-spec gallery render. Rollup pipeline and per-entry detail routes
will follow.
