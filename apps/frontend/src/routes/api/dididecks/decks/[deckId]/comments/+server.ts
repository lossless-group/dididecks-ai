/**
 * Local MVP endpoint.
 *
 * This route exposes deck comments through the local service layer. It is
 * useful for product-shell development but still relies on in-memory data.
 */
import { listComments } from '#lib/server/dididecks/index.ts';

export function GET({ params }) {
  if (!params.deckId) {
    return Response.json({ error: 'Missing deckId' }, { status: 400 });
  }

  return Response.json(listComments(params.deckId));
}
