/**
 * Local MVP endpoint.
 *
 * This route exposes the persistent fields that the current deck allows users
 * to edit. The repo-local service models a future backend response for field
 * editing surfaces.
 */
import { json } from '@sveltejs/kit';
import { listEditableFields } from '$lib/server/dididecks';

export function GET({ params }) {
  if (!params.deckId) {
    return json({ error: 'Missing deckId' }, { status: 400 });
  }

  return json({ fields: listEditableFields(params.deckId) });
}
