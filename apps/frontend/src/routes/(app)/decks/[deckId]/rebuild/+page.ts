import type { PageLoad } from './$types';
import { getDeckEditorView } from '$lib/api/dididecks';
import { getAffectedBlockIds, getAffectedSlideIds, getFieldUsagesForField } from '$lib/utils/dididecks';

export const load: PageLoad = async ({ params, fetch, url }) => {
  const editorView = await getDeckEditorView(params.deckId, fetch);
  const fieldKey = url.searchParams.get('field') ?? '';
  const selectedField = editorView.persistentFields.find((field) => field.fieldKey === fieldKey) ?? null;
  const selectedFieldUsages = getFieldUsagesForField(selectedField, editorView.fieldUsages);

  return {
    deckId: params.deckId,
    editorView,
    fieldKey,
    selectedField,
    selectedFieldUsages,
    affectedSlideIds: getAffectedSlideIds(selectedFieldUsages),
    affectedBlockIds: getAffectedBlockIds(selectedFieldUsages)
  };
};
