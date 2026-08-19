import type { PageLoad } from './$types';
import { getDeckEditorView, listExports } from '$lib/api/dididecks';

export const load: PageLoad = async ({ params, fetch }) => {
  const [model, exportsList] = await Promise.all([
    getDeckEditorView(params.deckId, fetch),
    listExports(params.deckId, fetch)
  ]);

  return {
    deckId: params.deckId,
    model,
    exportsList
  };
};
