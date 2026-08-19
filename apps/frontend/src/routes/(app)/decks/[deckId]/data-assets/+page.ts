import type { PageLoad } from './$types';
import { getDataAssets } from '$lib/api/dididecks';

export const load: PageLoad = async ({ params, fetch }) => {
  const payload = await getDataAssets(params.deckId, fetch);

  return {
    deckId: params.deckId,
    payload
  };
};
