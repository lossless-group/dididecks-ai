/**
 * Local MVP endpoint.
 *
 * This route returns the deck access roster and share links for the current
 * deck. Access data is mock-backed today and should later be driven by a real
 * permission backend.
 */
import { getAccess } from '#lib/server/dididecks/index.ts';

export function GET({ params }) {
  if (!params.deckId) {
    return Response.json({ error: 'Missing deckId' }, { status: 400 });
  }

  return Response.json(getAccess(params.deckId));
}
