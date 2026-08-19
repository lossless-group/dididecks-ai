/**
 * Local MVP endpoint.
 *
 * This route exposes deck comments through the local service layer. It is
 * useful for product-shell development but still relies on in-memory data.
 */
import { json } from '@sveltejs/kit';
import { listComments } from '$lib/server/dididecks';

export function GET({ params }) {
  if (!params.deckId) {
    return json({ error: 'Missing deckId' }, { status: 400 });
  }

  return json(listComments(params.deckId));
}
