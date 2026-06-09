/**
 * Persistent-field fixtures for the local MVP editor.
 *
 * These fields intentionally bind the Northstar demo deck metrics to specific
 * blocks so preview/apply flows can explain which blocks change when a field
 * value is updated.
 */
import type { FieldUsage, PersistentField } from '$lib/types/dididecks';

export const mockPersistentFields: PersistentField[] = [
  {
    id: 'field-1',
    deckId: 'deck-001',
    fieldKey: 'company.name',
    fieldLabel: 'Company name',
    fieldGroup: 'company',
    fieldType: 'text',
    category: 'company',
    label: 'Company name',
    value: 'DidiDecks',
    valueJson: { value: 'DidiDecks' }
  },
  {
    id: 'field-2',
    deckId: 'deck-001',
    fieldKey: 'founder.ceo_name',
    fieldLabel: 'Founder / CEO',
    fieldGroup: 'founder',
    fieldType: 'text',
    category: 'founder',
    label: 'Founder / CEO',
    value: 'Andrea Rivera',
    valueJson: { value: 'Andrea Rivera' }
  },
  {
    id: 'field-3',
    deckId: 'deck-001',
    fieldKey: 'founder.linkedin_profile',
    fieldLabel: 'Founder LinkedIn',
    fieldGroup: 'founder',
    fieldType: 'url',
    category: 'founder',
    label: 'Founder LinkedIn',
    value: 'https://linkedin.com/in/andrea-rivera',
    valueJson: { value: 'https://linkedin.com/in/andrea-rivera' }
  },
  {
    id: 'field-4',
    deckId: 'deck-001',
    fieldKey: 'problem.headline',
    fieldLabel: 'Problem headline',
    fieldGroup: 'problem',
    fieldType: 'long_text',
    category: 'problem',
    label: 'Problem headline',
    value: 'Investor decks still live in disconnected slides, comments, and export files.',
    valueJson: { value: 'Investor decks still live in disconnected slides, comments, and export files.' }
  },
  {
    id: 'field-5',
    deckId: 'deck-001',
    fieldKey: 'metrics.arr',
    fieldLabel: 'ARR',
    fieldGroup: 'metrics',
    fieldType: 'currency',
    category: 'traction',
    label: 'ARR',
    value: '$1.8M',
    valueJson: { value: '$1.8M' }
  },
  {
    id: 'field-6',
    deckId: 'deck-001',
    fieldKey: 'brand.primary_color',
    fieldLabel: 'Brand primary color',
    fieldGroup: 'brand',
    fieldType: 'color',
    category: 'brand',
    label: 'Brand primary color',
    value: '#6F5CFF',
    valueJson: { value: '#6F5CFF' }
  }
];

export const mockFieldUsage: FieldUsage[] = [
  {
    id: 'usage-1',
    deckId: 'deck-001',
    persistentFieldId: 'field-1',
    fieldKey: 'company.name',
    fieldId: 'field-1',
    slideId: 'slide-1',
    blockId: 'block-1',
    usageType: 'text_render',
    usedInBlockIds: ['block-1', 'block-10'],
    usedInSlideIds: ['slide-1', 'slide-3']
  },
  {
    id: 'usage-2',
    deckId: 'deck-001',
    persistentFieldId: 'field-2',
    fieldKey: 'founder.ceo_name',
    fieldId: 'field-2',
    slideId: 'slide-2',
    blockId: 'block-6',
    usageType: 'text_render',
    usedInBlockIds: ['block-6'],
    usedInSlideIds: ['slide-2']
  },
  {
    id: 'usage-3',
    deckId: 'deck-001',
    persistentFieldId: 'field-3',
    fieldKey: 'founder.linkedin_profile',
    fieldId: 'field-3',
    slideId: 'slide-2',
    blockId: 'block-7',
    usageType: 'link_render',
    usedInBlockIds: ['block-7'],
    usedInSlideIds: ['slide-2']
  },
  {
    id: 'usage-4',
    deckId: 'deck-001',
    persistentFieldId: 'field-4',
    fieldKey: 'problem.headline',
    fieldId: 'field-4',
    slideId: 'slide-2',
    blockId: 'block-5',
    usageType: 'text_render',
    usedInBlockIds: ['block-5'],
    usedInSlideIds: ['slide-2']
  },
  {
    id: 'usage-5',
    deckId: 'deck-001',
    persistentFieldId: 'field-5',
    fieldKey: 'metrics.arr',
    fieldId: 'field-5',
    slideId: 'slide-3',
    blockId: 'block-8',
    usageType: 'metric_render',
    usedInBlockIds: ['block-8'],
    usedInSlideIds: ['slide-3']
  },
  {
    id: 'usage-6',
    deckId: 'deck-001',
    persistentFieldId: 'field-6',
    fieldKey: 'brand.primary_color',
    fieldId: 'field-6',
    slideId: 'slide-1',
    blockId: 'block-4',
    usageType: 'style_token',
    usedInBlockIds: ['block-4', 'block-9'],
    usedInSlideIds: ['slide-1', 'slide-3']
  }
];
