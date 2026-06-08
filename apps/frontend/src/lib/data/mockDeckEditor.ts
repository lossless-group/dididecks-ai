import type { DeckBlock, DeckEditorViewModel } from '$lib/types/dididecks';
import { mockFieldUsage, mockPersistentFields } from './mockPersistentFields';
import { mockDecks } from './mockDecks';

export const mockBlocks: DeckBlock[] = [
  { id: 'block-1', slideId: 'slide-1', type: 'heading', content: 'The future of work is AI-native.' },
  { id: 'block-2', slideId: 'slide-1', type: 'paragraph', content: 'DidiDecks turns deck workflows into infrastructure.' },
  { id: 'block-3', slideId: 'slide-2', type: 'metric', content: '$4M raise target', boundFieldId: 'field-1' },
  { id: 'block-4', slideId: 'slide-3', type: 'metric', content: '$1.8M ARR', boundFieldId: 'field-2' }
];

export const mockDeckEditorView: DeckEditorViewModel = {
  deck: mockDecks[0],
  slides: [
    {
      id: 'slide-1',
      deckId: 'deck-001',
      title: 'Narrative hook',
      note: 'Lead with the category shift.',
      variants: [
        { id: 'var-1', label: 'Default', audience: 'Investor' },
        { id: 'var-2', label: 'Board', audience: 'Board' }
      ]
    },
    {
      id: 'slide-2',
      deckId: 'deck-001',
      title: 'Problem',
      note: 'Frame operational pain precisely.',
      variants: [{ id: 'var-3', label: 'Default', audience: 'Investor' }]
    },
    {
      id: 'slide-3',
      deckId: 'deck-001',
      title: 'Traction',
      note: 'Bind hard metrics to persistent fields.',
      variants: [{ id: 'var-4', label: 'Default', audience: 'Investor' }]
    }
  ],
  blocks: mockBlocks,
  persistentFields: mockPersistentFields,
  fieldUsages: mockFieldUsage
};
