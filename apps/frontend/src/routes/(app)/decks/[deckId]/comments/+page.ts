import type { PageLoad } from './$types';
import { listComments } from '$lib/api/dididecks';

export const load: PageLoad = async ({ params, fetch }) => {
  const comments = await listComments(params.deckId, fetch);

  return {
    deckId: params.deckId,
    comments
  };
};
