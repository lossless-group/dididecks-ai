import { error, json } from '@sveltejs/kit';
import { getDeckMap } from '$lib/server/dididecks';

export function GET({ params }) {
  const map = getDeckMap(params.deckId);
  if (!map) throw error(404, 'Deck not found');
  return json(map);
}
