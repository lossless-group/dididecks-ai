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
      "astro:config:setup": ({ logger, injectRoute }) => {
        logger.info(`loaded for client: ${options.client}`);

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
      },
      "astro:config:done": ({ config, logger }) => {
        const projectRoot = fileURLToPath(config.root);
        const resolved = resolveOptions(options, projectRoot);
        globalThis.__dididecksShellOptions = resolved;
        logger.info(
          `paths resolved · decks=${resolved.decksRegistryPath} · slots=${resolved.slotsRegistryPath} · audits=${resolved.auditsPath}`,
        );
      },
    },
  };
}
