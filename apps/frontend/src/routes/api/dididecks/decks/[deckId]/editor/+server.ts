import { error, json } from '@sveltejs/kit';
import { getDeckEditorView } from '$lib/server/dididecks';

export function GET({ params }) {
  const editorView = getDeckEditorView(params.deckId);
  if (!editorView) throw error(404, 'Deck not found');
  return json(editorView);
}
