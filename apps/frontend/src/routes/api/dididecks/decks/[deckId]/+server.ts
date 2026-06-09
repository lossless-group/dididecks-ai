/**
 * Local MVP endpoint.
 *
 * This route mirrors the future deck-detail contract and delegates ownership
 * checks to the repo-local service layer.
 */
import { error, json } from '@sveltejs/kit';
import { getDeck } from '$lib/server/dididecks';

export function GET({ params }) {
  if (!params.deckId) throw error(400, 'Deck id is required');
  const deck = getDeck(params.deckId);
  if (!deck) throw error(404, 'Deck not found');
  return json(deck);
}
