import path from "node:path";
import type { DididecksShellOptions, ResolvedShellOptions } from "./types/index.js";

const DEFAULTS = {
  decksRegistryPath: "./src/data/decks.ts",
  slotsRegistryPath: "./src/data/slides.ts",
  auditsPath: "./data/audits/slides.json",
  slidesComponentsRoot: "./src/components/slides",
  scrollPagesRoot: "./src/pages/scroll",
  distributionTier: "private" as const,
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
  };

  return {
    ...merged,
    absolute: {
      decksRegistry: path.resolve(projectRoot, merged.decksRegistryPath),
      slotsRegistry: path.resolve(projectRoot, merged.slotsRegistryPath),
      audits: path.resolve(projectRoot, merged.auditsPath),
      slidesComponentsRoot: path.resolve(projectRoot, merged.slidesComponentsRoot),
      scrollPagesRoot: path.resolve(projectRoot, merged.scrollPagesRoot),
    },
  };
}

export interface ResolvedAbsolutePaths {
  decksRegistry: string;
  slotsRegistry: string;
  audits: string;
  slidesComponentsRoot: string;
  scrollPagesRoot: string;
}
