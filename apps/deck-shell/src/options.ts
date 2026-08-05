import path from "node:path";
import type { DididecksShellOptions, ResolvedShellOptions } from "./types/index.js";

const DEFAULTS = {
  decksRegistryPath: "./src/data/decks.ts",
  slotsRegistryPath: "./src/data/slides.ts",
  auditsPath: "./data/audits/slides.json",
  slidesComponentsRoot: "./src/components/slides",
  scrollPagesRoot: "./src/pages/scroll",
  distributionTier: "private" as const,
  /* Every client-site in the tree funnels its theme through this one entry
     point (it @imports tailwind + theme.css), so it is the right default.
     A consumer with a different layout overrides; `[]` opts out. */
  themeStylesheets: ["./src/styles/global.css"],
};

export function resolveOptions(
  options: DididecksShellOptions,
  projectRoot: string,
): ResolvedShellOptions & { absolute: ResolvedAbsolutePaths } {
  const merged: ResolvedShellOptions = {
    client: options.client,
    decksRegistryPath: options.decksRegistryPath ?? DEFAULTS.decksRegistryPath,
    slotsRegistryPath: options.slotsRegistryPath ?? DEFAULTS.slotsRegistryPath,
    auditsPath: options.auditsPath ?? DEFAULTS.auditsPath,
    slidesComponentsRoot: options.slidesComponentsRoot ?? DEFAULTS.slidesComponentsRoot,
    scrollPagesRoot: options.scrollPagesRoot ?? DEFAULTS.scrollPagesRoot,
    distributionTier: options.distributionTier ?? DEFAULTS.distributionTier,
    // `?? `, not `||` — an explicit `[]` is a meaningful opt-out and must
    // survive, where `||` would silently restore the default.
    themeStylesheets: options.themeStylesheets ?? DEFAULTS.themeStylesheets,
  };

  return {
    ...merged,
    absolute: {
      decksRegistry: path.resolve(projectRoot, merged.decksRegistryPath),
      slotsRegistry: path.resolve(projectRoot, merged.slotsRegistryPath),
      audits: path.resolve(projectRoot, merged.auditsPath),
      slidesComponentsRoot: path.resolve(projectRoot, merged.slidesComponentsRoot),
      scrollPagesRoot: path.resolve(projectRoot, merged.scrollPagesRoot),
      themeStylesheets: merged.themeStylesheets.map((p) => path.resolve(projectRoot, p)),
    },
  };
}

export interface ResolvedAbsolutePaths {
  decksRegistry: string;
  slotsRegistry: string;
  audits: string;
  slidesComponentsRoot: string;
  scrollPagesRoot: string;
  themeStylesheets: string[];
}
