import type { PageLoad } from './$types';
import { getReviewMatrix } from '#lib/api/dididecks.ts';

export const load: PageLoad = async ({ params, fetch }) => {
  const matrix = await getReviewMatrix(params.deckId, fetch);

  return {
    deckId: params.deckId,
    matrix
  };
};
