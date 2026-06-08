import { json } from '@sveltejs/kit';
import { getAccess } from '$lib/server/dididecks';

export function GET({ params }) {
  return json(getAccess(params.deckId));
}
