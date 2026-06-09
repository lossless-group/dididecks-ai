import type { PageLoad } from './$types';
import { getDeck, getDeckEditorView } from '$lib/api/dididecks';

export const load: PageLoad = async ({ params, fetch }) => {
  const [deck, editorView] = await Promise.all([
    getDeck(params.deckId, fetch),
    getDeckEditorView(params.deckId, fetch)
  ]);

  return {
    deckId: params.deckId,
    deck,
    editorView
  };
};
