import { json } from '@sveltejs/kit';
import { listVersions } from '$lib/server/dididecks';

export function GET({ params }) {
  return json(listVersions(params.deckId));
}
