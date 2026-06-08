import { json } from '@sveltejs/kit';
import { applyFieldChanges } from '$lib/server/dididecks';

export async function POST({ params, request }) {
  const body = (await request.json()) as { changes: [] };
  return json(applyFieldChanges(params.deckId, body.changes));
}
