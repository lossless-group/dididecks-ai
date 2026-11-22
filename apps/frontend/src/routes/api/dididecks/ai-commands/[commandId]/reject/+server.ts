/**
 * Local MVP endpoint.
 *
 * This route rejects a previously proposed AI command and records the decision
 * in the repo-local mock service without mutating the deck.
 */
import { rejectAiCommand } from '#lib/server/dididecks/index.ts';

export function POST({ params }) {
  if (!params.commandId) {
    return Response.json({ error: 'Missing commandId' }, { status: 400 });
  }

  return Response.json(rejectAiCommand(params.commandId));
}
