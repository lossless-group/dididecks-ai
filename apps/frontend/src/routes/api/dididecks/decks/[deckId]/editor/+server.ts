/**
 * Local MVP endpoint.
 *
 * This route returns the structured editor view model used by editor, scroll,
 * play, and print surfaces. It is mock-backed for now.
 */
import { error, json } from '@sveltejs/kit';
import { getDeckEditorView } from '$lib/server/dididecks';

export function GET({ params }) {
  if (!params.deckId) throw error(400, 'Deck id is required');
  const editorView = getDeckEditorView(params.deckId);
  if (!editorView) throw error(404, 'Deck not found');
  return json(editorView);
}
