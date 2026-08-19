/**
 * Local MVP endpoint.
 *
 * Preview explains the impact of field changes without mutating the in-memory
 * repository. The future backend can keep the same contract with real storage.
 */
import { json } from '@sveltejs/kit';
import { previewFieldChanges } from '$lib/server/dididecks';
import type { ChangeRequest } from '$lib/types/dididecks';

export async function POST({ params, request }) {
  if (!params.deckId) {
    throw new Error('Deck id is required');
  }

  const body = (await request.json()) as { changes?: ChangeRequest[] };
  if (!Array.isArray(body.changes)) {
    throw new Error('Changes array is required');
  }

  return json(previewFieldChanges(params.deckId, body.changes));
}
