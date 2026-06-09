export interface Deck {
  id: string;
  title?: string;
  name: string;
  clientName?: string;
  workspaceId?: string;
  ownerUserId?: string;
  status: 'draft' | 'in-review' | 'investor-ready' | 'in_review' | 'ready' | 'archived';
  progressPercent?: number;
  reviewScore?: number;
  currentVersionId?: string;
  summary: string;
  owner: string;
  updatedAt: string;
}

export interface DeckSlideVariant {
  id: string;
  slideId?: string;
  variantKey?: string;
  label: string;
  audience: string;
  surfaceAvailability?: {
    editor?: boolean;
    scroll?: boolean;
    play?: boolean;
    print?: boolean;
    thumbnail?: boolean;
  };
}

export interface DeckSlide {
  id: string;
  deckId: string;
  slideNumber?: number;
  slideKey?: string;
  title: string;
  slideType?: string;
  status?: 'draft' | 'active' | 'needs_work' | 'ready';
  note: string;
  variants: DeckSlideVariant[];
}

export interface DeckBlock {
  id: string;
  deckId?: string;
  slideId: string;
  variantId?: string;
  blockKey?: string;
  type: 'heading' | 'paragraph' | 'chart' | 'image' | 'metric' | 'text' | 'shape' | 'logo' | 'card';
  blockType?: 'text' | 'image' | 'shape' | 'metric' | 'chart' | 'table' | 'logo' | 'card';
  content: string;
  contentJson?: Record<string, unknown>;
  styleJson?: Record<string, unknown>;
  positionJson?: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
  };
  dataBindingKey?: string;
  isLocked?: boolean;
  isGenerated?: boolean;
  boundFieldId?: string;
}

export interface PersistentField {
  id: string;
  deckId: string;
  fieldKey?: string;
  fieldLabel?: string;
  fieldGroup?: string;
  fieldType?: 'text' | 'long_text' | 'url' | 'image' | 'color' | 'number' | 'currency' | 'percentage';
  category: string;
  label: string;
  value: string;
  valueJson?: Record<string, unknown>;
}

export interface FieldUsage {
  id?: string;
  deckId?: string;
  persistentFieldId?: string;
  fieldKey?: string;
  fieldId: string;
  slideId?: string;
  blockId?: string;
  usageType?: 'text_render' | 'link_render' | 'image_render' | 'style_token' | 'metric_render';
  isRequired?: boolean;
  usedInBlockIds: string[];
  usedInSlideIds: string[];
}

export interface DeckEditorViewModel {
  deck: Deck;
  slides: DeckSlide[];
  variants?: DeckSlideVariant[];
  blocks: DeckBlock[];
  persistentFields: PersistentField[];
  fieldUsages: FieldUsage[];
  versions?: DeckVersion[];
  exports?: DeckExport[];
}

export interface ChangeRequest {
  fieldId: string;
  nextValue: string;
  rationale?: string;
}

export interface ChangeRequestItem {
  fieldId: string;
  fieldKey?: string;
  previousValue: string;
  nextValue: string;
  rationale?: string;
  affectedSlideIds: string[];
}

export interface ChangeRequestRecord {
  id: string;
  deckId: string;
  status: string;
  requestedBy: string;
  createdAt: string;
  items: ChangeRequestItem[];
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

export interface DeckAuditRecord {
  id: string;
  deckId: string;
  entityType: string;
  entityId: string;
  action: string;
  beforeValue?: string;
  afterValue?: string;
  createdAt: string;
  linkedChangeRequestId?: string;
  linkedVersionId?: string;
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

export interface DeckReview {
  id: string;
  deckId: string;
  slideId?: string;
  variantId?: string;
  reviewer: string;
  status: SurfaceReviewStatus;
  note?: string;
  surface?: ReviewSurface;
  updatedAt?: string;
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

export interface DeckRating {
  id: string;
  deckId: string;
  slideId?: string;
  variantId?: string;
  reviewer: string;
  status: SurfaceReviewStatus;
  note?: string;
  surface?: ReviewSurface;
  updatedAt?: string;
}

export interface BrandProfile {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'archived';
  tokenMode: 'system' | 'semantic' | 'brand';
  summary: string;
  updatedAt: string;
}

export interface UploadRecord {
  id: string;
  filename: string;
  contentType?: string;
  status: 'queued' | 'uploaded' | 'processed';
  deckId?: string;
  createdAt: string;
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

export interface GuardrailFinding {
  title: string;
  severity: string;
  note: string;
}

export interface GuardrailPayload {
  findings: GuardrailFinding[];
  rules: string[];
  prompts: string[];
}

export interface DataAssetRecord {
  name: string;
  status: string;
  note: string;
}

export interface DataAssetsPayload {
  warnings: string[];
  companies: DataAssetRecord[];
  people: DataAssetRecord[];
}

export type ReviewSurface = 'editor' | 'scroll' | 'play' | 'print' | 'thumbnail';

export type SurfaceReviewStatus =
  | 'perfect'
  | 'passable'
  | 'urgent-redo'
  | 'ready'
  | 'needs_work'
  | 'blocked'
  | 'pending';

export interface DeckReviewMatrixItem {
  id?: string;
  deckId?: string;
  slideId?: string;
  variantId?: string;
  slide: string;
  surface?: ReviewSurface;
  status: SurfaceReviewStatus;
  reviewer: string;
  note?: string;
}

export interface ReviewMatrix {
  deckId: string;
  items: DeckReviewMatrixItem[];
}
