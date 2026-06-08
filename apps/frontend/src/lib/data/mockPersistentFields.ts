import type { FieldUsage, PersistentField } from '$lib/types/dididecks';

export const mockPersistentFields: PersistentField[] = [
  { id: 'field-1', deckId: 'deck-001', category: 'fundraising', label: 'Raise target', value: '$4M' },
  { id: 'field-2', deckId: 'deck-001', category: 'traction', label: 'ARR', value: '$1.8M' },
  { id: 'field-3', deckId: 'deck-001', category: 'traction', label: 'Net retention', value: '131%' }
];

export const mockFieldUsage: FieldUsage[] = [
  { fieldId: 'field-1', usedInBlockIds: ['block-3'], usedInSlideIds: ['slide-2'] },
  { fieldId: 'field-2', usedInBlockIds: ['block-4'], usedInSlideIds: ['slide-3'] },
  { fieldId: 'field-3', usedInBlockIds: [], usedInSlideIds: ['slide-3'] }
];
