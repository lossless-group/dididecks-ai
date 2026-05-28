import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import type { DididecksShellOptions, ResolvedShellOptions } from "./types/index.js";
import type { ResolvedAbsolutePaths } from "./options.js";
import { resolveOptions } from "./options.js";

export type { DididecksShellOptions } from "./types/index.js";
export { STATUSES, buildRankKey } from "./types/index.js";

/**
 * Cached resolved options keyed by integration instance, so route handlers can
 * look them up via `globalThis` (the only state-passing channel injected routes
 * cleanly support across Astro's setup/build/runtime split).
 */
declare global {
  // eslint-disable-next-line no-var
  var __dididecksShellOptions: (ResolvedShellOptions & { absolute: ResolvedAbsolutePaths }) | undefined;
}

export default function dididecksShell(options: DididecksShellOptions): AstroIntegration {
  return {
    name: "@dididecks/shell",
    hooks: {
      "astro:config:setup": ({ config, logger, injectRoute, updateConfig }) => {
        logger.info(`loaded for client: ${options.client}`);

        const projectRoot = fileURLToPath(config.root);
        const resolved = resolveOptions(options, projectRoot);

        // Tell Vite's file watcher NOT to watch the audits file. When the
        // /api/slide-rank POST writes to it, the default watch behaviour
        // would emit `full-reload` (JSON isn't HMR-recoverable), which
        // destroys the reader's scroll position in the middle of ranking.
        updateConfig({
          vite: {
            server: {
              watch: {
                ignored: [resolved.absolute.audits],
              },
            },
          },
        });

        injectRoute({
          pattern: "/toc/[deckSlug]",
          entrypoint: new URL("./routes/toc-deck.astro", import.meta.url).href,
        });

        injectRoute({
          pattern: "/toc/[deckSlug]/[variantSlug]",
          entrypoint: new URL("./routes/toc.astro", import.meta.url).href,
        });

        injectRoute({
          pattern: "/api/slide-rank",
          entrypoint: new URL("./routes/api/slide-rank.ts", import.meta.url).href,
        });

        injectRoute({
          pattern: "/api/slide-decompose",
          entrypoint: new URL("./routes/api/slide-decompose.ts", import.meta.url).href,
        });

        injectRoute({
          pattern: "/play/[deckSlug]/[variantSlug]",
          entrypoint: new URL("./routes/play/[deckSlug]/[variantSlug]/index.astro", import.meta.url).href,
        });

        injectRoute({
          pattern: "/play/[deckSlug]/[variantSlug]/[slot]",
          entrypoint: new URL("./routes/play/[deckSlug]/[variantSlug]/[slot].astro", import.meta.url).href,
        });

        injectRoute({
          pattern: "/play/[deckSlug]/[variantSlug]/print",
          entrypoint: new URL("./routes/play/[deckSlug]/[variantSlug]/print.astro", import.meta.url).href,
        });

        // Dev-only icon-pair review page (Phase 4 of TOC redesign). Removed
        // once the founder picks a pair; do not link to it from any other route.
        injectRoute({
          pattern: "/dev/icons",
          entrypoint: new URL("./routes/dev/icons.astro", import.meta.url).href,
        });

        // /data-assets/* — reviewer audit pages. Read consumer's data/ tree
        // via Vite globs (consumer-root-relative); handle calmstorm's
        // single-firm layout (data/firms/{firm}/portfolio|team/) and chroma's
        // multi-investor layout (data/investors/{firm}/portfolio/, flat
        // data/team/) with the same glob patterns.
        injectRoute({
          pattern: "/data-assets/companies",
          entrypoint: new URL("./routes/data-assets/companies.astro", import.meta.url).href,
        });
        injectRoute({
          pattern: "/data-assets/people",
          entrypoint: new URL("./routes/data-assets/people.astro", import.meta.url).href,
        });
      },
      "astro:config:done": ({ config, logger }) => {
        const projectRoot = fileURLToPath(config.root);
        const resolved = resolveOptions(options, projectRoot);
        globalThis.__dididecksShellOptions = resolved;
        logger.info(
          `paths resolved · decks=${resolved.decksRegistryPath} · slots=${resolved.slotsRegistryPath} · scroll=${resolved.scrollPagesRoot} · audits=${resolved.auditsPath}`,
        );
      },
    },
  };
}
