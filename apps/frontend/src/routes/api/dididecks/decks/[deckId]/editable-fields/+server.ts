import { json } from '@sveltejs/kit';
import { listEditableFields } from '$lib/server/dididecks';

export function GET({ params }) {
  return json({ fields: listEditableFields(params.deckId) });
}
