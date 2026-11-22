import type { PageLoad } from './$types';
import { listDecks } from '#lib/api/dididecks.ts';

export const load: PageLoad = async ({ fetch }) => {
  const decks = await listDecks(fetch);

  return {
    decks
  };
};
