import { json } from '@sveltejs/kit';
import { previewFieldChanges } from '$lib/server/dididecks';

export async function POST({ params, request }) {
  const body = (await request.json()) as { changes: [] };
  return json(previewFieldChanges(params.deckId, body.changes));
}
