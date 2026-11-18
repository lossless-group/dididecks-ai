# dididecks-ai splash

GitHub Pages landing page for the `dididecks-ai` pseudomonorepo.
Live target: `https://lossless-group.github.io/dididecks-ai/`.

## Local dev

```bash
pnpm install
pnpm dev
# visit http://localhost:4321/dididecks-ai/
```

The splash's own `pnpm-workspace.yaml` keeps it out of any workspace above it
and approves the build scripts for esbuild and sharp, so don't pass
`--ignore-workspace` (that skips the file and the approvals with it).

## Build

```bash
pnpm build
# output in dist/
```

## Deploy

Push to `main`. `.github/workflows/pages.yml` builds `splash/` and deploys it
with `actions/deploy-pages@v4`. The build reads two things from GitHub:
`OPENPANEL_CLIENT_ID` (a repo Variable, for analytics in production) and the
workflow's own `GITHUB_TOKEN` (for the API reads below).

## Where content lives

- **Home page copy:** `src/pages/index.astro` (the bar, the loop, the two bets
  and seven rules, the reading list).
- **Toolkit cards:** one file each in `src/content/toolkit/`. Add a file to add
  a card; `order` sets its place.
- **Share images:** `src/lib/share-cards.ts` says what each page's card reads;
  `src/lib/og-render.ts` draws a tall og:image and a wide twitter:image for
  every page at build time (after `astro-knots/sites/cathode-site`).
- **Tokens:** `src/styles/theme.css` (two tiers, three modes). `DESIGN.md` is
  the readable contract for the same values.
- **llms.txt prose:** `src/llms/*.md`.
- **Remake-deck diagram:** copied from `../context-v/diagrams/` by
  `scripts/sync-diagrams.mjs` on every dev and build.
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

Rebuilt 2026-11-18 on the ai-labs splash structure: sticky header with search
and the light/dark/vibrant toggle, LFM-rendered entries, Pagefind search,
sort controls, llms.txt, per-page share cards, and OpenPanel analytics.
