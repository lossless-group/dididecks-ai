/**
 * Local MVP deck access helpers.
 *
 * Access entries and share links are mock-backed. This module exposes the
 * data shape a future backend would return without implementing full auth.
 */
import type { DeckAccessEntry, DeckShareLink } from '$lib/types/dididecks';
import { getDididecksState } from './repository';

export function getAccess(deckId: string): { entries: DeckAccessEntry[]; shareLinks: DeckShareLink[] } {
  return {
    entries: getDididecksState().accessEntries[deckId] ?? [],
    shareLinks: getDididecksState().shareLinks[deckId] ?? []
  };
}
