import type { PageLoad } from './$types';
import { listSlides } from '$lib/api/dididecks';

export const load: PageLoad = async ({ params, fetch }) => {
  const slides = await listSlides(params.deckId, fetch);

  return {
    deckId: params.deckId,
    slides
  };
};
