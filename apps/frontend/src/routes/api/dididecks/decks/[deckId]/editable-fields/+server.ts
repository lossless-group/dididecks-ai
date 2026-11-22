/**
 * Local MVP endpoint.
 *
 * This route exposes the persistent fields that the current deck allows users
 * to edit. The repo-local service models a future backend response for field
 * editing surfaces.
 */
import { listEditableFields } from '#lib/server/dididecks/index.ts';

export function GET({ params }) {
  if (!params.deckId) {
    return Response.json({ error: 'Missing deckId' }, { status: 400 });
  }

  return Response.json({ fields: listEditableFields(params.deckId) });
}
