import type { Deck } from '$lib/types/dididecks';

export const mockDecks: Deck[] = [
  {
    id: 'deck-001',
    name: 'Northstar Seed Narrative',
    status: 'investor-ready',
    summary: 'Core fundraising story with traction, moat, and ask aligned.',
    owner: 'Andrea',
    updatedAt: '2h ago'
  },
  {
    id: 'deck-002',
    name: 'Acme Ventures LP Update',
    status: 'in-review',
    summary: 'Quarterly LP update with portfolio highlights and pipeline.',
    owner: 'Mila',
    updatedAt: '5h ago'
  },
  {
    id: 'deck-003',
    name: 'Reach Education Board Pack',
    status: 'draft',
    summary: 'Board-ready narrative with roadmap and financial posture.',
    owner: 'Rene',
    updatedAt: 'Yesterday'
  }
];
