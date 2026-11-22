import type { PageLoad } from './$types';
import { getCurrentAccount } from '#lib/api/account.ts';
import { listManagedAiProviderConnections } from '#lib/api/adminAiProviders.ts';

export const load: PageLoad = async ({ fetch }) => {
  const [connections, account] = await Promise.all([
    listManagedAiProviderConnections(fetch),
    getCurrentAccount(fetch)
  ]);

  return {
    connections,
    account
  };
};
