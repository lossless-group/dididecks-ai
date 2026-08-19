/**
 * Editor workspace fixture for the main DidiDecks demo deck.
 *
 * This file defines the slides, blocks, and field bindings used by local
 * editor, map, play, scroll, and print routes. It is intentionally small so a
 * new developer can trace how data flows through the MVP.
 */
import type { DeckBlock, DeckEditorViewModel } from '$lib/types/dididecks';
import { mockFieldUsage, mockPersistentFields } from './mockPersistentFields';
import { mockDecks } from './mockDecks';
import { mockExports, mockVersions } from './mockDeckWorkspace';

export const mockBlocks: DeckBlock[] = [
  {
    id: 'block-1',
    deckId: 'deck-001',
    slideId: 'slide-1',
    blockKey: 'company-name-headline',
    type: 'text',
    blockType: 'text',
    content: 'DidiDecks',
    contentJson: { text: 'DidiDecks', role: 'headline' },
    styleJson: { color: '#F8FAFF', fontSize: '44px', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em' },
    positionJson: { x: 7, y: 10, width: 52, height: 20 },
    dataBindingKey: 'company.name',
    isLocked: true,
    boundFieldId: 'field-1'
  },
  {
    id: 'block-2',
    deckId: 'deck-001',
    slideId: 'slide-1',
    variantId: 'var-1',
    blockKey: 'investor-hero-copy',
    type: 'paragraph',
    blockType: 'text',
    content: 'Turn investor decks into infrastructure that can be rebuilt, reviewed, and exported with confidence.',
    contentJson: {
      text: 'Turn investor decks into infrastructure that can be rebuilt, reviewed, and exported with confidence.'
    },
    styleJson: { color: '#C8D2EC', fontSize: '18px', lineHeight: 1.45 },
    positionJson: { x: 7, y: 32, width: 48, height: 18 },
    isGenerated: true
  },
  {
    id: 'block-3',
    deckId: 'deck-001',
    slideId: 'slide-1',
    variantId: 'var-2',
    blockKey: 'board-hero-copy',
    type: 'paragraph',
    blockType: 'text',
    content: 'Present the operating system behind deck quality, review control, and narrative consistency.',
    contentJson: {
      text: 'Present the operating system behind deck quality, review control, and narrative consistency.'
    },
    styleJson: { color: '#C8D2EC', fontSize: '18px', lineHeight: 1.45 },
    positionJson: { x: 7, y: 32, width: 48, height: 18 },
    isGenerated: true
  },
  {
    id: 'block-4',
    deckId: 'deck-001',
    slideId: 'slide-1',
    blockKey: 'brand-logo-card',
    type: 'logo',
    blockType: 'logo',
    content: 'DidiDecks monogram',
    contentJson: { label: 'D', alt: 'DidiDecks monogram', imageUrl: '/mock/dididecks-mark.svg' },
    styleJson: {
      background: 'linear-gradient(135deg, rgba(111,92,255,0.95), rgba(147,93,255,0.85))',
      color: '#ffffff',
      borderRadius: '24px',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '40px',
      fontWeight: 700
    },
    positionJson: { x: 66, y: 10, width: 18, height: 22 },
    dataBindingKey: 'brand.primary_color',
    boundFieldId: 'field-6'
  },
  {
    id: 'block-5',
    deckId: 'deck-001',
    slideId: 'slide-2',
    blockKey: 'problem-headline',
    type: 'heading',
    blockType: 'text',
    content: 'Investor decks still live in disconnected slides, comments, and export files.',
    contentJson: {
      text: 'Investor decks still live in disconnected slides, comments, and export files.'
    },
    styleJson: { color: '#F6F8FE', fontSize: '34px', fontWeight: 650, lineHeight: 1.08 },
    positionJson: { x: 8, y: 12, width: 72, height: 20 },
    dataBindingKey: 'problem.headline',
    isGenerated: true,
    boundFieldId: 'field-4'
  },
  {
    id: 'block-6',
    deckId: 'deck-001',
    slideId: 'slide-2',
    variantId: 'var-3',
    blockKey: 'founder-identity',
    type: 'text',
    blockType: 'text',
    content: 'CEO: Andrea Rivera',
    contentJson: { label: 'CEO', text: 'Andrea Rivera' },
    styleJson: { color: '#CBD4EF', fontSize: '18px', fontWeight: 600 },
    positionJson: { x: 8, y: 42, width: 34, height: 10 },
    dataBindingKey: 'founder.ceo_name',
    isLocked: true,
    boundFieldId: 'field-2'
  },
  {
    id: 'block-7',
    deckId: 'deck-001',
    slideId: 'slide-2',
    variantId: 'var-4',
    blockKey: 'founder-linkedin',
    type: 'text',
    blockType: 'text',
    content: 'linkedin.com/in/andrea-rivera',
    contentJson: {
      label: 'LinkedIn profile',
      href: 'https://linkedin.com/in/andrea-rivera',
      text: 'Open founder profile'
    },
    styleJson: { color: '#9EC4FF', fontSize: '16px', textAlign: 'left' },
    positionJson: { x: 8, y: 56, width: 40, height: 10 },
    dataBindingKey: 'founder.linkedin_profile',
    isGenerated: true,
    boundFieldId: 'field-3'
  },
  {
    id: 'block-8',
    deckId: 'deck-001',
    slideId: 'slide-3',
    blockKey: 'arr-metric',
    type: 'metric',
    blockType: 'metric',
    content: '$1.8M ARR',
    contentJson: { label: 'ARR', value: '$1.8M', footnote: 'Annual recurring revenue' },
    styleJson: { color: '#FFFFFF', fontSize: '36px', fontWeight: 700 },
    positionJson: { x: 8, y: 18, width: 28, height: 18 },
    dataBindingKey: 'metrics.arr',
    isLocked: true,
    boundFieldId: 'field-5'
  },
  {
    id: 'block-9',
    deckId: 'deck-001',
    slideId: 'slide-3',
    blockKey: 'brand-accent-card',
    type: 'shape',
    blockType: 'card',
    content: 'Brand accent',
    contentJson: { label: 'Brand accent card', text: 'Primary color token' },
    styleJson: {
      background: 'linear-gradient(135deg, rgba(111,92,255,0.35), rgba(111,92,255,0.12))',
      border: '1px solid rgba(111,92,255,0.5)',
      borderRadius: '24px',
      color: '#F2F5FF',
      padding: '16px'
    },
    positionJson: { x: 56, y: 14, width: 28, height: 26 },
    dataBindingKey: 'brand.primary_color',
    isGenerated: true,
    boundFieldId: 'field-6'
  },
  {
    id: 'block-10',
    deckId: 'deck-001',
    slideId: 'slide-3',
    blockKey: 'company-footer',
    type: 'text',
    blockType: 'text',
    content: 'DidiDecks growth loop',
    contentJson: { label: 'Company', text: 'DidiDecks growth loop' },
    styleJson: { color: '#C7D3F2', fontSize: '16px' },
    positionJson: { x: 8, y: 66, width: 40, height: 10 },
    dataBindingKey: 'company.name',
    boundFieldId: 'field-1'
  }
];

export const mockDeckEditorView: DeckEditorViewModel = {
  deck: mockDecks[0],
  slides: [
    {
      id: 'slide-1',
      deckId: 'deck-001',
      slideNumber: 1,
      slideKey: 'company-hook',
      title: 'Narrative hook',
      slideType: 'hero',
      status: 'ready',
      note: 'Lead with the category shift.',
      variants: [
        {
          id: 'var-1',
          slideId: 'slide-1',
          variantKey: 'investor-default',
          label: 'Investor default',
          audience: 'Investor',
          surfaceAvailability: { editor: true, scroll: true, play: true, print: true, thumbnail: true }
        },
        {
          id: 'var-2',
          slideId: 'slide-1',
          variantKey: 'board-condensed',
          label: 'Board condensed',
          audience: 'Board',
          surfaceAvailability: { editor: true, scroll: true, play: true, print: true, thumbnail: true }
        }
      ]
    },
    {
      id: 'slide-2',
      deckId: 'deck-001',
      slideNumber: 2,
      slideKey: 'problem-proof',
      title: 'Problem',
      slideType: 'narrative',
      status: 'active',
      note: 'Frame operational pain precisely.',
      variants: [
        {
          id: 'var-3',
          slideId: 'slide-2',
          variantKey: 'investor-proof',
          label: 'Investor proof',
          audience: 'Investor',
          surfaceAvailability: { editor: true, scroll: true, play: true, print: true }
        },
        {
          id: 'var-4',
          slideId: 'slide-2',
          variantKey: 'diligence-context',
          label: 'Diligence context',
          audience: 'Diligence',
          surfaceAvailability: { editor: true, scroll: true, play: false, print: true }
        }
      ]
    },
    {
      id: 'slide-3',
      deckId: 'deck-001',
      slideNumber: 3,
      slideKey: 'traction-brand',
      title: 'Traction',
      slideType: 'traction',
      status: 'ready',
      note: 'Bind hard metrics to persistent fields.',
      variants: [
        {
          id: 'var-5',
          slideId: 'slide-3',
          variantKey: 'investor-metric',
          label: 'Investor metric',
          audience: 'Investor',
          surfaceAvailability: { editor: true, scroll: true, play: true, print: true }
        }
      ]
    }
  ],
  blocks: mockBlocks,
  persistentFields: mockPersistentFields,
  fieldUsages: mockFieldUsage,
  versions: mockVersions,
  exports: mockExports
};
