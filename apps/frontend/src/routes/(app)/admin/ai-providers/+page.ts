import type { PageLoad } from './$types';
import { getCurrentAccount } from '$lib/api/account';
import { listManagedAiProviderConnections } from '$lib/api/adminAiProviders';

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
