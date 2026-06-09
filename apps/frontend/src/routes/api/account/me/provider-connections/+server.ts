/**
 * Local MVP endpoint.
 *
 * This route returns masked provider-connection records for the current mock
 * customer account. Raw API keys never leave the server layer and are never
 * persisted in frontend state.
 */
import { json } from '@sveltejs/kit';
import { getCurrentAccountViewModel } from '$lib/server/account/service';

export function GET() {
  return json(getCurrentAccountViewModel().providerConnections);
}
