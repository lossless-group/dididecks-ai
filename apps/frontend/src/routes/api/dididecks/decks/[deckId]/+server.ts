import { error, json } from '@sveltejs/kit';
import { getDeck } from '$lib/server/dididecks';

export function GET({ params }) {
  const deck = getDeck(params.deckId);
  if (!deck) throw error(404, 'Deck not found');
  return json(deck);
}
