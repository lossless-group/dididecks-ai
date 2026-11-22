/**
 * Local MVP endpoint.
 *
 * This route returns the deck map/workspace view through the repo-local
 * DidiDecks service. It is an HTTP wrapper around mock-backed product data.
 */
import { error } from '@sveltejs/kit';
import { getDeckMap } from '#lib/server/dididecks/index.ts';

export function GET({ params }) {
  if (!params.deckId) {
    throw error(400, 'Missing deckId');
  }

  const map = getDeckMap(params.deckId);
  if (!map) throw error(404, 'Deck not found');
  return Response.json(map);
}
