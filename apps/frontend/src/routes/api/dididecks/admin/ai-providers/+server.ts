/**
 * Local MVP endpoint.
 *
 * This route mimics a future admin/provider management contract while using
 * repo-local services and masked provider state only. It must never expose or
 * persist raw provider keys in frontend-visible data.
 */
import { json } from '@sveltejs/kit';
import type { ManagedAiProviderCreatePayload } from '$lib/types/adminAiProviders';
import { createManagedAiProviderConnection, listManagedAiProviders } from '$lib/server/dididecks';
import { canUseManagedProvider } from '$lib/server/account/entitlements';
import { getCurrentAccountViewModel } from '$lib/server/account/service';

export function GET() {
  return json(listManagedAiProviders());
}

export async function POST({ request }) {
  const account = getCurrentAccountViewModel();
  if (!canUseManagedProvider(account.subscription)) {
    return json({ message: 'Current plan cannot use managed providers in MVP.' }, { status: 403 });
  }

  const body = (await request.json()) as Partial<ManagedAiProviderCreatePayload>;
  if (!body.provider) {
    return json({ message: 'Missing provider.' }, { status: 400 });
  }

  if (!body.defaultModel) {
    return json({ message: 'Missing defaultModel.' }, { status: 400 });
  }

  if (!body.apiKey) {
    return json({ message: 'Missing apiKey.' }, { status: 400 });
  }

  const created = createManagedAiProviderConnection({
    provider: body.provider,
    defaultModel: body.defaultModel,
    apiKey: body.apiKey
  });

  return json(created, { status: 201 });
}
