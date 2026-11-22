/**
 * Local MVP endpoint.
 *
 * This route accepts a previously proposed AI command. The underlying service
 * still applies local guardrail checks before any mock deck mutation occurs.
 */
import { acceptAiCommand } from '#lib/server/dididecks/index.ts';

export function POST({ params }) {
  if (!params.commandId) {
    return Response.json({ error: 'Missing commandId' }, { status: 400 });
  }

  return Response.json(acceptAiCommand(params.commandId));
}
