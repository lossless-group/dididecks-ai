import type { DeckAccessEntry, DeckShareLink } from '$lib/types/dididecks';
import { getDididecksState } from './repository';

export function getAccess(deckId: string): { entries: DeckAccessEntry[]; shareLinks: DeckShareLink[] } {
  return {
    entries: getDididecksState().accessEntries[deckId] ?? [],
    shareLinks: getDididecksState().shareLinks[deckId] ?? []
  };
}
