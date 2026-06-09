/**
 * Local MVP endpoint.
 *
 * This route accepts a previously proposed AI command. The underlying service
 * still applies local guardrail checks before any mock deck mutation occurs.
 */
import { json } from '@sveltejs/kit';
import { acceptAiCommand } from '$lib/server/dididecks';

export function POST({ params }) {
  if (!params.commandId) {
    return json({ error: 'Missing commandId' }, { status: 400 });
  }

  return json(acceptAiCommand(params.commandId));
}
