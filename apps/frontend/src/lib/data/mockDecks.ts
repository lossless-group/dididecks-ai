/**
 * Core deck catalog for the local MVP.
 *
 * `deck-001` in `workspace-001` is the primary demo path used across the
 * editor, review, play, and export routes. Other decks show that workspace and
 * ownership filtering already exist even though persistence is still in-memory.
 */
import type { Deck } from '$lib/types/dididecks';

export const mockDecks: Deck[] = [
  {
    id: 'deck-001',
    title: 'Northstar Seed Narrative',
    name: 'Northstar Seed Narrative',
    workspaceId: 'workspace-001',
    ownerUserId: 'user-001',
    status: 'investor-ready',
    progressPercent: 84,
    reviewScore: 92,
    currentVersionId: 'ver-1',
    summary: 'Core fundraising story with traction, moat, and ask aligned.',
    owner: 'Andrea',
    updatedAt: '2h ago'
  },
  {
    id: 'deck-002',
    title: 'Acme Ventures LP Update',
    name: 'Acme Ventures LP Update',
    workspaceId: 'workspace-001',
    ownerUserId: 'user-001',
    status: 'in-review',
    progressPercent: 61,
    reviewScore: 78,
    summary: 'Quarterly LP update with portfolio highlights and pipeline.',
    owner: 'Mila',
    updatedAt: '5h ago'
  },
  {
    id: 'deck-003',
    title: 'Reach Education Board Pack',
    name: 'Reach Education Board Pack',
    workspaceId: 'workspace-002',
    ownerUserId: 'user-002',
    status: 'draft',
    progressPercent: 35,
    summary: 'Board-ready narrative with roadmap and financial posture.',
    owner: 'Rene',
    updatedAt: 'Yesterday'
  }
];
