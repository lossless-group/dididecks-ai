import type { PageLoad } from './$types';
import { getCurrentAccount } from '#lib/api/account.ts';
import { listDecks } from '#lib/api/dididecks.ts';

export const load: PageLoad = async ({ fetch }) => {
  const [decks, account] = await Promise.all([listDecks(fetch), getCurrentAccount(fetch)]);

  return {
    decks,
    account
  };
};
