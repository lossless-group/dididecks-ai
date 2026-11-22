/**
 * Local MVP endpoint.
 *
 * This route returns the current user's workspace memberships from the
 * repo-local account service. Production auth will later determine the current
 * user from a real session rather than the mock account selector.
 */
import { getCurrentUserMock, listUserWorkspaces } from '#lib/server/account/service.ts';

export function GET() {
  return Response.json(listUserWorkspaces(getCurrentUserMock().id));
}
