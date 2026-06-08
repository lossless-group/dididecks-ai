import { json } from '@sveltejs/kit';
import { createDeck, listDecks } from '$lib/server/dididecks';

export function GET() {
  return json(listDecks());
}

export async function POST({ request }) {
  const body = (await request.json()) as { name?: string };
  return json(createDeck(body.name?.trim() || 'Untitled deck'));
}
