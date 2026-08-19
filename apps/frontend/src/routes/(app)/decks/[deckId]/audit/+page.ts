import type { PageLoad } from './$types';
import { listAuditRecords } from '$lib/api/dididecks';

export const load: PageLoad = async ({ params, fetch }) => {
  const records = await listAuditRecords(params.deckId, fetch);

  return {
    deckId: params.deckId,
    records
  };
};
