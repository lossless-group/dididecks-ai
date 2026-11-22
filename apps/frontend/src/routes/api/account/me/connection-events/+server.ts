/**
 * Local MVP endpoint.
 *
 * This route exposes safe audit-style events for mock provider connection
 * activity. It intentionally returns hashes and metadata only, never raw
 * session cookies or provider secrets.
 */
import { getCurrentAccountViewModel, listConnectionEvents } from '#lib/server/account/service.ts';

export function GET() {
  const account = getCurrentAccountViewModel();
  return Response.json(listConnectionEvents(account.customerAccount.id));
}
