/**
 * Local MVP endpoint.
 *
 * This route returns deck review notes through the same repo-local service
 * layer used by the rest of the control room surfaces.
 */
import { listReviews } from '#lib/server/dididecks/index.ts';

export function GET({ params }) {
  if (!params.deckId) {
    return Response.json({ error: 'Missing deckId' }, { status: 400 });
  }

  return Response.json(listReviews(params.deckId));
}
