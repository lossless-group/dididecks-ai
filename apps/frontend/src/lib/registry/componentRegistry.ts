export type RegistryCategoryKey =
  | 'slides'
  | 'primitives'
  | 'patterns'
  | 'diagrams'
  | 'audit'
  | 'basics';

export type RegistryEntry = {
  key: string;
  title: string;
  category: RegistryCategoryKey;
  layer: 'design-system' | 'component-library';
  summary: string;
  props?: string[];
  dependencies?: string[];
  usedBy?: string[];
  notes?: string[];
};

export const componentRegistryCategories: Array<{
  key: RegistryCategoryKey;
  title: string;
  description: string;
}> = [
  { key: 'slides', title: 'Slides', description: 'Renderable deck surfaces and slide-level shells.' },
  { key: 'primitives', title: 'Primitives', description: 'Base layout, fit, framing, and token-aware UI building blocks.' },
  { key: 'patterns', title: 'Patterns', description: 'Reusable workflow and product interaction patterns.' },
  { key: 'diagrams', title: 'Diagrams', description: 'Structured data displays that can swap without changing the underlying data shape.' },
  { key: 'audit', title: 'Audit', description: 'Review, guardrail, and readiness components for operational deck QA.' },
  { key: 'basics', title: 'Basics', description: 'General shell, navigation, and support components.' }
];

export const componentRegistry: RegistryEntry[] = [
  {
    key: 'slide-canvas',
    title: 'SlideCanvas',
    category: 'slides',
    layer: 'component-library',
    summary: 'Base slide canvas contract for editor previews, structured block placement, and export-safe rendering.',
    props: ['slide', 'variant', 'blocks', 'selectedBlockId'],
    dependencies: ['buildCanvasBlockStyle'],
    usedBy: ['/decks/[deckId]/editor', '/decks/[deckId]/play'],
    notes: ['Acts as the source layout model for swappable block displays.']
  },
  {
    key: 'content-fit',
    title: 'ContentFit',
    category: 'primitives',
    layer: 'design-system',
    summary: 'Scales authored content into the slide frame without manual font and spacing re-tuning.',
    props: ['maxWidth', 'maxHeight', 'align', 'padding'],
    dependencies: [],
    usedBy: ['/decks/[deckId]/scroll', '/decks/[deckId]/play'],
    notes: ['This is the rendering primitive that keeps portable slide layouts DRY.']
  },
  {
    key: 'variant-cycle-pill',
    title: 'VariantCyclePill',
    category: 'patterns',
    layer: 'component-library',
    summary: 'Cycles slide variants while preserving slide identity and current viewing mode.',
    props: ['variants', 'activeVariantKey', 'onSelectVariant'],
    dependencies: [],
    usedBy: ['/decks/[deckId]/scroll', '/decks/[deckId]/play']
  },
  {
    key: 'scroll-deck-viewer',
    title: 'ScrollDeckViewer',
    category: 'slides',
    layer: 'component-library',
    summary: 'Vertical narrative deck reader where up/down changes slides and left/right cycles the active slide variant.',
    props: ['deckId', 'model'],
    dependencies: ['ContentFit', 'VariantCyclePill', 'DeckTOC'],
    usedBy: ['/decks/[deckId]/scroll']
  },
  {
    key: 'play-mode',
    title: 'PlayDeckViewer',
    category: 'slides',
    layer: 'component-library',
    summary: 'Presentation runtime where left/right changes slides and up/down changes active slide variants.',
    props: ['deckId', 'model'],
    dependencies: ['PlayChrome', 'PlaySlideCanvas', 'VariantCyclePill'],
    usedBy: ['/decks/[deckId]/play']
  },
  {
    key: 'deck-registry-workspace',
    title: 'ComponentRegistry',
    category: 'audit',
    layer: 'design-system',
    summary: 'Single source of truth for what components exist and what AI/backends are allowed to generate.',
    props: ['title', 'items'],
    dependencies: ['componentRegistry'],
    usedBy: ['/design-system', '/component-library']
  },
  {
    key: 'info-display-switcher',
    title: 'InfoDisplaySwitcher',
    category: 'diagrams',
    layer: 'component-library',
    summary: 'Maps the same data shape into different presentation components to create new slide variants without rewriting data.',
    props: ['displays', 'activeKey'],
    dependencies: [],
    usedBy: ['/component-library'],
    notes: ['Represents NumberedColumnGrid, HorizontalSlatStack, NewspaperGrid, TeamGrid, Timeline, and Matrix2x2 as interchangeable render targets.']
  },
  {
    key: 'deck-mode-switcher',
    title: 'DeckModeSwitcher',
    category: 'basics',
    layer: 'design-system',
    summary: 'Stable route-level mode navigation between overview, map, scroll, play, and workflow routes.',
    props: ['deckId'],
    dependencies: [],
    usedBy: ['/decks/[deckId]']
  },
  {
    key: 'deck-review-matrix',
    title: 'DeckReviewMatrix',
    category: 'audit',
    layer: 'component-library',
    summary: 'Cross-surface review matrix for editor, scroll, play, and print readiness checks.',
    props: ['items'],
    dependencies: [],
    usedBy: ['/decks/[deckId]/review-matrix']
  }
];

export const designSystemRules = [
  'Design tokens remain the stable contract across client-site brand inheritance.',
  'Canvas rules must keep 16:9 deck rendering safe across editor, scroll, play, and print.',
  'Accessibility rules apply to contrast, keyboard navigation, and active slide focus state.',
  'Component registry entries define what the UI can render and what the AI can generate.'
];

export const infoDisplayOptions = [
  {
    key: 'numbered-column-grid',
    title: 'NumberedColumnGrid',
    summary: 'A sequential proof stack for structured narratives and operator walkthroughs.'
  },
  {
    key: 'horizontal-slat-stack',
    title: 'HorizontalSlatStack',
    summary: 'A compact surface for stacked proof, roadmap, or diligence slices.'
  },
  {
    key: 'newspaper-grid',
    title: 'NewspaperGrid',
    summary: 'An editorial layout for mixed signals, supporting evidence, and citations.'
  },
  {
    key: 'team-grid',
    title: 'TeamGrid',
    summary: 'A people-focused display with swappable emphasis on roles, logos, or operating history.'
  },
  {
    key: 'timeline',
    title: 'Timeline',
    summary: 'A sequence-first display for milestones, diligence paths, and product progression.'
  },
  {
    key: 'matrix-2x2',
    title: 'Matrix2x2',
    summary: 'A structured comparison display for market framing and strategic positioning.'
  }
];
