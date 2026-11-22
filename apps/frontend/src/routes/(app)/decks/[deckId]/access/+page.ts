import type { PageLoad } from './$types';
import { getAccess } from '#lib/api/dididecks.ts';

export const load: PageLoad = async ({ params, fetch }) => {
  const access = await getAccess(params.deckId, fetch);

  return {
    deckId: params.deckId,
    accessEntries: access.entries,
    shareLinks: access.shareLinks
  };
};
