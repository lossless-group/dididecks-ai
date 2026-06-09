import type { PageLoad } from './$types';
import { listReviews } from '$lib/api/dididecks';

export const load: PageLoad = async ({ params, fetch }) => {
  const reviews = await listReviews(params.deckId, fetch);

  return {
    deckId: params.deckId,
    reviews
  };
};
