export interface Deck {
  id: string;
  name: string;
  status: 'draft' | 'in-review' | 'investor-ready';
  summary: string;
  owner: string;
  updatedAt: string;
}

export interface DeckSlideVariant {
  id: string;
  label: string;
  audience: string;
}

export interface DeckSlide {
  id: string;
  deckId: string;
  title: string;
  note: string;
  variants: DeckSlideVariant[];
}

export interface DeckBlock {
  id: string;
  slideId: string;
  type: 'heading' | 'paragraph' | 'chart' | 'image' | 'metric';
  content: string;
  boundFieldId?: string;
}

export interface PersistentField {
  id: string;
  deckId: string;
  category: string;
  label: string;
  value: string;
}

export interface FieldUsage {
  fieldId: string;
  usedInBlockIds: string[];
  usedInSlideIds: string[];
}

export interface DeckEditorViewModel {
  deck: Deck;
  slides: DeckSlide[];
  blocks: DeckBlock[];
  persistentFields: PersistentField[];
  fieldUsages: FieldUsage[];
}

export interface ChangeRequest {
  fieldId: string;
  nextValue: string;
  rationale?: string;
}

export interface ChangePreview {
  deckId: string;
  changes: Array<{
    fieldId: string;
    previousValue: string;
    nextValue: string;
    affectedSlideIds: string[];
  }>;
}

export interface RebuildJob {
  id: string;
  deckId: string;
  status: 'queued' | 'running' | 'completed';
}

export interface DeckVersion {
  id: string;
  deckId: string;
  label: string;
  createdAt: string;
  summary: string;
}

export interface DeckExport {
  id: string;
  deckId: string;
  format: 'pdf' | 'pptx' | 'share-link';
  status: 'ready' | 'queued';
  createdAt: string;
}

export interface DeckComment {
  id: string;
  deckId: string;
  slideId?: string;
  blockId?: string;
  author: string;
  body: string;
  createdAt: string;
}

export interface DeckAccessEntry {
  id: string;
  deckId: string;
  principal: string;
  accessLevel: 'viewer' | 'editor' | 'owner';
}

export interface DeckShareLink {
  id: string;
  deckId: string;
  label: string;
  status: 'active' | 'revoked';
}

export interface AiCommand {
  id: string;
  deckId: string;
  command: string;
  status: 'proposed' | 'accepted' | 'rejected';
}

export interface AiChangeProposal {
  id: string;
  commandId: string;
  deckId: string;
  summary: string;
  changes: ChangeRequest[];
}

export interface GuardrailDecision {
  status: 'allow' | 'warn' | 'block';
  reason: string;
}
