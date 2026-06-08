import { json } from '@sveltejs/kit';
import { rejectAiCommand } from '$lib/server/dididecks';

export function POST({ params }) {
  return json(rejectAiCommand(params.commandId));
}
