/**
 * Local MVP endpoint.
 *
 * This route mimics a future admin/provider management contract while using
 * repo-local services and masked provider state only. It must never expose or
 * persist raw provider keys in frontend-visible data.
 */
import type { ManagedAiProviderCreatePayload } from '#lib/types/adminAiProviders.ts';
import { createManagedAiProviderConnection, listManagedAiProviders } from '#lib/server/dididecks/index.ts';
import { canUseManagedProvider } from '#lib/server/account/entitlements.ts';
import { getCurrentAccountViewModel } from '#lib/server/account/service.ts';

export function GET() {
  return Response.json(listManagedAiProviders());
}

export async function POST({ request }) {
  const account = getCurrentAccountViewModel();
  if (!canUseManagedProvider(account.subscription)) {
    return Response.json({ message: 'Current plan cannot use managed providers in MVP.' }, { status: 403 });
  }

  const body = (await request.json()) as Partial<ManagedAiProviderCreatePayload>;
  if (!body.provider) {
    return Response.json({ message: 'Missing provider.' }, { status: 400 });
  }

  if (!body.defaultModel) {
    return Response.json({ message: 'Missing defaultModel.' }, { status: 400 });
  }

  if (!body.apiKey) {
    return Response.json({ message: 'Missing apiKey.' }, { status: 400 });
  }

  const created = createManagedAiProviderConnection({
    provider: body.provider,
    defaultModel: body.defaultModel,
    apiKey: body.apiKey
  });

  return Response.json(created, { status: 201 });
}
