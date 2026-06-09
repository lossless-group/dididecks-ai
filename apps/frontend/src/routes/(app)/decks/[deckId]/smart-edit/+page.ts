import type { PageLoad } from './$types';
import { getDeckEditorView, listAiCommands } from '$lib/api/dididecks';
import { getAffectedBlockIds, getAffectedSlideIds, getFieldUsagesForField } from '$lib/utils/dididecks';

export const load: PageLoad = async ({ params, fetch, url }) => {
  const [editorView, commands] = await Promise.all([
    getDeckEditorView(params.deckId, fetch),
    listAiCommands(params.deckId, fetch)
  ]);

  const fieldKey = url.searchParams.get('field') ?? '';
  const sourceSlideId = url.searchParams.get('slide') ?? '';
  const sourceBlockId = url.searchParams.get('block') ?? '';
  const selectedField = editorView.persistentFields.find((field) => field.fieldKey === fieldKey) ?? null;
  const selectedFieldUsages = getFieldUsagesForField(selectedField, editorView.fieldUsages);

  return {
    deckId: params.deckId,
    editorView,
    commands,
    fieldKey,
    sourceSlideId,
    sourceBlockId,
    selectedField,
    selectedFieldUsages,
    affectedSlideIds: getAffectedSlideIds(selectedFieldUsages),
    affectedBlockIds: getAffectedBlockIds(selectedFieldUsages)
  };
};
