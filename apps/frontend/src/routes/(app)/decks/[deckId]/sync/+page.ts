import type { PageLoad } from './$types';
import { getDataAssets, getGuardrails } from '$lib/api/dididecks';

export const load: PageLoad = async ({ params, fetch }) => {
  const [assets, guardrails] = await Promise.all([
    getDataAssets(params.deckId, fetch),
    getGuardrails(params.deckId, fetch)
  ]);

  return {
    deckId: params.deckId,
    assets,
    guardrails
  };
};
