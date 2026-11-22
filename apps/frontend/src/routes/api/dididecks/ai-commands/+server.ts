/**
 * Local MVP endpoint.
 *
 * This route creates and lists AI change proposals through the repo-local
 * DidiDecks service. Proposals do not mutate a deck until they are explicitly
 * accepted through a later endpoint.
 */
import { createAiCommandProposal, listAiCommands } from '#lib/server/dididecks/index.ts';

export function GET({ url }) {
  const deckId = url.searchParams.get('deckId');
  if (!deckId) {
    return Response.json({ error: 'Missing deckId' }, { status: 400 });
  }

  return Response.json(listAiCommands(deckId));
}

export async function POST({ request }) {
  const body = (await request.json()) as Partial<{ deckId: string; command: string }>;
  if (!body.deckId) {
    return Response.json({ error: 'Missing deckId' }, { status: 400 });
  }

  if (!body.command?.trim()) {
    return Response.json({ error: 'Missing command' }, { status: 400 });
  }

  return Response.json(createAiCommandProposal(body.deckId, body.command.trim()));
}
