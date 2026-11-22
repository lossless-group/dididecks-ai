/**
 * Local MVP endpoint.
 *
 * This route returns the review-matrix view for a deck. The underlying data is
 * a repo-local mock until review workflows move into a real backend.
 */
import { getReviewMatrix } from '#lib/server/dididecks/index.ts';

export function GET({ params }) {
  if (!params.deckId) {
    return Response.json({ error: 'Missing deckId' }, { status: 400 });
  }

  return Response.json(getReviewMatrix(params.deckId));
}
