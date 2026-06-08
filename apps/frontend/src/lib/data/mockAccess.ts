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
