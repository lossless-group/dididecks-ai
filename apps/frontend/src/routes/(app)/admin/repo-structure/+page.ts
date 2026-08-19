import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  return {
    repoRoot: 'dididecks-ai',
    sourceOfTruth: {
      frontend: 'apps/frontend',
      backend: 'backend',
      shared: 'packages/shared',
      shell: 'apps/deck-shell'
    },
    duplicates: [
      {
        path: 'frontend',
        status: 'duplicate',
        note: 'Top-level Svelte app copy. Not the workspace source of truth.'
      }
    ],
    deployment: {
      vercel: 'apps/frontend via root pnpm build',
      railway: 'backend'
    }
  };
};
