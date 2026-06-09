/**
 * Local MVP endpoint.
 *
 * This route exposes the current account view through the repo-local account
 * service. It is a same-origin stand-in for a future authenticated backend
 * endpoint and returns only frontend-safe data.
 */
import { json } from '@sveltejs/kit';
import { getCurrentAccountViewModel } from '$lib/server/account/service';

export function GET() {
  return json(getCurrentAccountViewModel());
}
