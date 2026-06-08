import { json } from '@sveltejs/kit';
import { acceptAiCommand } from '$lib/server/dididecks';

export function POST({ params }) {
  return json(acceptAiCommand(params.commandId));
}
