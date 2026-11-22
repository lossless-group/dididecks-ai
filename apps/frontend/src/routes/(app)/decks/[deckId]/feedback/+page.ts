import type { PageLoad } from './$types';
import { listComments, listReviews } from '#lib/api/dididecks.ts';

export const load: PageLoad = async ({ params, fetch }) => {
  const [comments, reviews] = await Promise.all([
    listComments(params.deckId, fetch),
    listReviews(params.deckId, fetch)
  ]);

  return {
    deckId: params.deckId,
    comments,
    reviews
  };
};
