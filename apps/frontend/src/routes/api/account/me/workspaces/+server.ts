/**
 * Local MVP endpoint.
 *
 * This route returns the current user's workspace memberships from the
 * repo-local account service. Production auth will later determine the current
 * user from a real session rather than the mock account selector.
 */
import { json } from '@sveltejs/kit';
import { getCurrentUserMock, listUserWorkspaces } from '$lib/server/account/service';

export function GET() {
  return json(listUserWorkspaces(getCurrentUserMock().id));
}
