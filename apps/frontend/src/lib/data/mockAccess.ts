/**
 * Access-control fixtures for the main demo deck.
 *
 * These records drive the Access page and show owner/editor/viewer plus
 * share-link states without implying real permission persistence yet.
 */
import type { DeckAccessEntry, DeckShareLink } from '$lib/types/dididecks';

export const mockAccessEntries: DeckAccessEntry[] = [
  { id: 'access-1', deckId: 'deck-001', principal: 'Andrea', accessLevel: 'owner' },
  { id: 'access-2', deckId: 'deck-001', principal: 'Mila', accessLevel: 'editor' },
  { id: 'access-3', deckId: 'deck-001', principal: 'Rene', accessLevel: 'viewer' }
];

export const mockShareLinks: DeckShareLink[] = [
  { id: 'share-1', deckId: 'deck-001', label: 'Investor room', status: 'active' },
  { id: 'share-2', deckId: 'deck-001', label: 'Board review', status: 'revoked' }
];
