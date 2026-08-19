/**
 * Local MVP endpoint.
 *
 * This route returns the deck access roster and share links for the current
 * deck. Access data is mock-backed today and should later be driven by a real
 * permission backend.
 */
import { json } from '@sveltejs/kit';
import { getAccess } from '$lib/server/dididecks';

export function GET({ params }) {
  if (!params.deckId) {
    return json({ error: 'Missing deckId' }, { status: 400 });
  }

  return json(getAccess(params.deckId));
}
