import type { PageLoad } from './$types';
import { getDeckEditorView, listComments, listExports, listVersions } from '$lib/api/dididecks';

export const load: PageLoad = async ({ params, fetch }) => {
  const [model, versions, exportsList, comments] = await Promise.all([
    getDeckEditorView(params.deckId, fetch),
    listVersions(params.deckId, fetch),
    listExports(params.deckId, fetch),
    listComments(params.deckId, fetch)
  ]);

  return {
    deckId: params.deckId,
    model,
    versions,
    exportsList,
    comments
  };
};
