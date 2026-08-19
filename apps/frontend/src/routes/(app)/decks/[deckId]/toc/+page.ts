import type { PageLoad } from './$types';
import { getDeckEditorView } from '$lib/api/dididecks';

export const load: PageLoad = async ({ params, fetch }) => {
  const model = await getDeckEditorView(params.deckId, fetch);

  return {
    deckId: params.deckId,
    model
  };
};
