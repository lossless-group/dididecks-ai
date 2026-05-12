# @dididecks/shell

Astro integration that wraps a client-site deck workspace with shared chrome.

**v0.1.0 surface:** TOC route + slide-ranking UI + decomposition stub generator. That's it. Later releases will lift calmstorm-decks' mature primitives (`PageAsDeckWrapper`, `SlideCanvas`, mode-switcher, etc.), the `/play` runtime, auth + telemetry, and the export pipeline into this package.

## Install

```sh
pnpm add @dididecks/shell
```

You will also need an `.npmrc` in your project root pointing the `@dididecks` scope at the private registry, plus a `GITHUB_TOKEN` (or `NPM_AUTH_TOKEN`) env var with `read:packages` scope. See the dididecks-ai plan `Stand-Up-Dididecks-Shell-and-Ship-Chroma-TOC-Ranking.md` for the install flow.

## Use

```ts
// astro.config.mjs
import { defineConfig } from "astro/config";
import dididecksShell from "@dididecks/shell";

export default defineConfig({
  integrations: [
    dididecksShell({
      client: "chroma-decks",
      decksRegistryPath: "./src/data/decks.ts",
      slotsRegistryPath: "./src/data/slides.ts",
      auditsPath: "./data/audits/slides.json",
      slidesComponentsRoot: "./src/components/slides",
      distributionTier: "private",
    }),
  ],
});
```

## What you need to provide in your client-site

| Path | What | Required for |
|---|---|---|
| `src/data/decks.ts` | Deck registry — exports `DECKS: Deck[]` | TOC route to know which decks/variants exist |
| `src/data/slides.ts` | Slot registry — exports `SLOTS: SlotsByVariant` | TOC route to know which slots a variant has |
| `data/audits/slides.json` | Slide-rank state — `{schema:1, ranks:{}}` to start | Persisted ranks (the API writes to this file in dev) |

## Routes the integration injects

| Route | Static / dev | Purpose |
|---|---|---|
| `/toc/[deckSlug]/[variantSlug]/` | Static | TOC with per-slot rank pills and conditional decompose button |
| `/api/slide-rank` | Dev-only (`prerender = false`) | GET registry, POST upsert |
| `/api/slide-decompose` | Dev-only (`prerender = false`) | POST scaffolds an empty per-slide stub in `slidesComponentsRoot` |

The dev-only routes are intentionally skipped by static Vercel builds.

## Source plan

`dididecks-ai/context-v/plans/Stand-Up-Dididecks-Shell-and-Ship-Chroma-TOC-Ranking.md`.
