import type { PageLoad } from './$types';
import { getGuardrails } from '#lib/api/dididecks.ts';

export const load: PageLoad = async ({ params, fetch }) => {
  const payload = await getGuardrails(params.deckId, fetch);

  return {
    deckId: params.deckId,
    payload
  };
};
