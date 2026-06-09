/**
 * Local MVP endpoint.
 *
 * This route exposes the active subscription snapshot for the current mock
 * account. It is display and gating data only until a real billing backend is
 * connected.
 */
import { json } from '@sveltejs/kit';
import { getCurrentAccountViewModel } from '$lib/server/account/service';

export function GET() {
  return json(getCurrentAccountViewModel().subscription);
}
