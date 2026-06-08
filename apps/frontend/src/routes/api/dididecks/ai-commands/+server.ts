import { json } from '@sveltejs/kit';
import { createAiCommandProposal } from '$lib/server/dididecks';

export async function POST({ request }) {
  const body = (await request.json()) as { deckId: string; command: string };
  return json(createAiCommandProposal(body.deckId, body.command));
}
