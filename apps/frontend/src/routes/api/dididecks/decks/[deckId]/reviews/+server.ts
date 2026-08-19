/**
 * Local MVP endpoint.
 *
 * This route returns deck review notes through the same repo-local service
 * layer used by the rest of the control room surfaces.
 */
import { json } from '@sveltejs/kit';
import { listReviews } from '$lib/server/dididecks';

export function GET({ params }) {
  if (!params.deckId) {
    return json({ error: 'Missing deckId' }, { status: 400 });
  }

  return json(listReviews(params.deckId));
}
