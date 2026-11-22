/**
 * Local MVP endpoint.
 *
 * This route returns mock version history for a deck. Production version data
 * should later come from durable persistence and background jobs.
 */
import { listVersions } from '#lib/server/dididecks/index.ts';

export function GET({ params }) {
  if (!params.deckId) {
    return Response.json({ error: 'Missing deckId' }, { status: 400 });
  }

  return Response.json(listVersions(params.deckId));
}
