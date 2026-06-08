import type { ChangePreview, ChangeRequest, DeckEditorViewModel } from '$lib/types/dididecks';
import { getDididecksState } from './repository';
import { createVersionSnapshot } from './versions';

export function listEditableFields(deckId: string) {
  return getDididecksState().editorViews[deckId]?.persistentFields ?? [];
}

export function previewFieldChanges(deckId: string, changes: ChangeRequest[]): ChangePreview {
  const editorView = getDididecksState().editorViews[deckId];

  return {
    deckId,
    changes: changes.map((change) => {
      const field = editorView.persistentFields.find((candidate) => candidate.id === change.fieldId);
      const usage = editorView.fieldUsages.find((candidate) => candidate.fieldId === change.fieldId);

      return {
        fieldId: change.fieldId,
        previousValue: field?.value ?? '',
        nextValue: change.nextValue,
        affectedSlideIds: usage?.usedInSlideIds ?? []
      };
    })
  };
}

export function applyFieldChanges(deckId: string, changes: ChangeRequest[]): DeckEditorViewModel {
  const editorView = getDididecksState().editorViews[deckId];

  for (const change of changes) {
    const field = editorView.persistentFields.find((candidate) => candidate.id === change.fieldId);
    if (field) field.value = change.nextValue;

    for (const block of editorView.blocks) {
      if (block.boundFieldId === change.fieldId) {
        block.content = change.nextValue;
      }
    }
  }

  createVersionSnapshot(deckId, 'Persistent fields updated from local MVP changes API.');
  return editorView;
}
