import type { Deck, DeckEditorViewModel } from '$lib/types/dididecks';
import { getDididecksState } from './repository';

export function listDecks(): Deck[] {
  return getDididecksState().decks;
}

export function createDeck(name: string): Deck {
  const deck: Deck = {
    id: `deck-${Date.now()}`,
    name,
    status: 'draft',
    summary: 'New local MVP deck scaffold.',
    owner: 'Local user',
    updatedAt: new Date().toISOString()
  };

  getDididecksState().decks.unshift(deck);
  return deck;
}

export function getDeck(deckId: string): Deck | null {
  return getDididecksState().decks.find((deck) => deck.id === deckId) ?? null;
}

export function getDeckEditorView(deckId: string): DeckEditorViewModel | null {
  return getDididecksState().editorViews[deckId] ?? null;
}

export function getDeckMap(deckId: string): DeckEditorViewModel | null {
  return getDididecksState().editorViews[deckId] ?? null;
}

export function listExports(deckId: string) {
  return getDididecksState().exports[deckId] ?? [];
}
