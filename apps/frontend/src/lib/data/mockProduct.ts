import { mockAccessEntries, mockShareLinks } from './mockAccess';
import { mockDeckEditorView } from './mockDeckEditor';
import { mockDecks } from './mockDecks';
import { mockAiCommands, mockComments, mockExports, mockVersions } from './mockDeckWorkspace';
import { mockFieldUsage, mockPersistentFields } from './mockPersistentFields';
import { mockReviewMatrix } from './mockReviewMatrix';

export function getDeckById(deckId: string) {
  return mockDecks.find((deck) => deck.id === deckId) ?? mockDecks[0];
}

export function getEditorViewByDeckId(deckId: string) {
  if (deckId === 'deck-001') {
    return mockDeckEditorView;
  }

  return {
    ...mockDeckEditorView,
    deck: getDeckById(deckId),
    slides: mockDeckEditorView.slides.map((slide) => ({ ...slide, deckId })),
    blocks: mockDeckEditorView.blocks.map((block) => ({ ...block })),
    persistentFields: mockPersistentFields.map((field) => ({ ...field, deckId })),
    fieldUsages: mockFieldUsage.map((usage) => ({ ...usage }))
  };
}

export function getVersionsByDeckId(deckId: string) {
  return deckId === 'deck-001' ? mockVersions : [];
}

export function getExportsByDeckId(deckId: string) {
  return deckId === 'deck-001' ? mockExports : [];
}

export function getAccessEntriesByDeckId(deckId: string) {
  return deckId === 'deck-001' ? mockAccessEntries : [];
}

export function getShareLinksByDeckId(deckId: string) {
  return deckId === 'deck-001' ? mockShareLinks : [];
}

export function getAiCommandsByDeckId(deckId: string) {
  return mockAiCommands.filter((command) => command.deckId === deckId);
}

export function getReviewMatrixByDeckId(deckId: string) {
  return deckId === 'deck-001' ? mockReviewMatrix : [];
}

export function getCommentsByDeckId(deckId: string) {
  return mockComments.filter((comment) => comment.deckId === deckId);
}
