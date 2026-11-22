/**
 * Local MVP endpoint.
 *
 * This route exposes the active subscription snapshot for the current mock
 * account. It is display and gating data only until a real billing backend is
 * connected.
 */
import { getCurrentAccountViewModel } from '#lib/server/account/service.ts';

export function GET() {
  return Response.json(getCurrentAccountViewModel().subscription);
}
