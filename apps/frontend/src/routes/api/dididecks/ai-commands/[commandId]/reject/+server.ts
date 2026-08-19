/**
 * Local MVP endpoint.
 *
 * This route rejects a previously proposed AI command and records the decision
 * in the repo-local mock service without mutating the deck.
 */
import { json } from '@sveltejs/kit';
import { rejectAiCommand } from '$lib/server/dididecks';

export function POST({ params }) {
  if (!params.commandId) {
    return json({ error: 'Missing commandId' }, { status: 400 });
  }

  return json(rejectAiCommand(params.commandId));
}
