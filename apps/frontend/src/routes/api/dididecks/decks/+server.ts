/**
 * Local MVP endpoint.
 *
 * This route exposes the future deck-list contract through the repo-local
 * SvelteKit backend. It uses mock data and active-workspace filtering only.
 */
import { json } from '@sveltejs/kit';
import { createDeck, listDecks } from '$lib/server/dididecks';

export function GET() {
  return json(listDecks());
}

export async function POST({ request }) {
  // The MVP only needs a name. Production should validate a richer payload.
  const body = (await request.json()) as { name?: string };
  return json(createDeck(body.name?.trim() || 'Untitled deck'));
}
