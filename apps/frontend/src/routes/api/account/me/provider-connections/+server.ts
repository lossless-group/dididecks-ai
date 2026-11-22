/**
 * Local MVP endpoint.
 *
 * This route returns masked provider-connection records for the current mock
 * customer account. Raw API keys never leave the server layer and are never
 * persisted in frontend state.
 */
import { getCurrentAccountViewModel } from '#lib/server/account/service.ts';

export function GET() {
  return Response.json(getCurrentAccountViewModel().providerConnections);
}
