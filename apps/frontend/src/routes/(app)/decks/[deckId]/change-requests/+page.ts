import type { PageLoad } from './$types';
import { listChangeRequests } from '$lib/api/dididecks';

export const load: PageLoad = async ({ params, fetch }) => {
  const requests = await listChangeRequests(params.deckId, fetch);

  return {
    deckId: params.deckId,
    requests
  };
};
