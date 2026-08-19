/**
 * Local MVP endpoint.
 *
 * Apply mutates the repo-local mock deck state and creates a mock version
 * snapshot. Production should keep the contract but replace the persistence.
 */
import { json } from '@sveltejs/kit';
import { applyFieldChanges } from '$lib/server/dididecks';
import type { ChangeRequest } from '$lib/types/dididecks';

export async function POST({ params, request }) {
  if (!params.deckId) {
    throw new Error('Deck id is required');
  }

  const body = (await request.json()) as { changes?: ChangeRequest[] };
  if (!Array.isArray(body.changes)) {
    throw new Error('Changes array is required');
  }

  return json(applyFieldChanges(params.deckId, body.changes));
}
