/**
 * Local MVP endpoint.
 *
 * This route returns mock version history for a deck. Production version data
 * should later come from durable persistence and background jobs.
 */
import { json } from '@sveltejs/kit';
import { listVersions } from '$lib/server/dididecks';

export function GET({ params }) {
  if (!params.deckId) {
    return json({ error: 'Missing deckId' }, { status: 400 });
  }

  return json(listVersions(params.deckId));
}
