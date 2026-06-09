/**
 * Local MVP endpoint.
 *
 * This route returns the review-matrix view for a deck. The underlying data is
 * a repo-local mock until review workflows move into a real backend.
 */
import { json } from '@sveltejs/kit';
import { getReviewMatrix } from '$lib/server/dididecks';

export function GET({ params }) {
  if (!params.deckId) {
    return json({ error: 'Missing deckId' }, { status: 400 });
  }

  return json(getReviewMatrix(params.deckId));
}
