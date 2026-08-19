import type { PageLoad } from './$types';
import { getCurrentAccount, listConnectionEvents } from '$lib/api/account';

export const load: PageLoad = async ({ fetch }) => {
  const [account, connectionEvents] = await Promise.all([getCurrentAccount(fetch), listConnectionEvents(fetch)]);

  return {
    account,
    connectionEvents
  };
};
