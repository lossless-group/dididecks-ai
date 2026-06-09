import type { PageLoad } from './$types';
import { listVersions } from '$lib/api/dididecks';

export const load: PageLoad = async ({ params, fetch }) => {
  const versions = await listVersions(params.deckId, fetch);

  return {
    deckId: params.deckId,
    versions
  };
};
