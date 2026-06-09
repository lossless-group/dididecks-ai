/**
 * Frontend-safe DidiDecks API client.
 *
 * Pages and components should depend on this module rather than importing
 * server-only code. Each helper targets the DidiDecks backend contract and
 * returns typed data for SvelteKit load functions.
 */
import type {
  AiChangeProposal,
  AiCommand,
  ChangePreview,
  ChangeRequestRecord,
  DataAssetsPayload,
  ChangeRequest,
  Deck,
  DeckAccessEntry,
  DeckAuditRecord,
  DeckBlock,
  DeckComment,
  DeckEditorViewModel,
  DeckExport,
  DeckRating,
  GuardrailPayload,
  DeckReviewMatrixItem,
  DeckShareLink,
  DeckSlide,
  DeckVersion,
  PersistentField
} from '@dididecks/shared/dididecks';
import { apiGet, apiPost } from './client';

const PRODUCT_PREFIX = '/api/products/dididecks';

export interface CreateDeckPayload {
  name: string;
}

export interface ChangeRequestPayload {
  changes: ChangeRequest[];
}

export interface AiCommandPayload {
  deckId: string;
  command: string;
}

export interface CreateShareLinkPayload {
  label: string;
}

export interface CreateCommentPayload {
  author: string;
  body: string;
  slide_id?: string;
  block_id?: string;
}

export interface CreateRatingPayload {
  reviewer: string;
  status: string;
  note?: string;
  surface?: string;
  slide_id?: string;
  variant_id?: string;
}

export interface CreateBrandProfilePayload {
  name: string;
  summary: string;
  token_mode?: 'system' | 'semantic' | 'brand';
}

export interface ProductBrandProfile {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'archived';
  token_mode: 'system' | 'semantic' | 'brand';
  summary: string;
  updated_at: string;
}

export interface ProductUploadRecord {
  id: string;
  filename: string;
  content_type?: string;
  status: 'queued' | 'uploaded' | 'processed';
  deck_id?: string;
  created_at: string;
}

export interface CreateUploadPayload {
  filename: string;
  content_type?: string;
  deck_id?: string;
}

export function listDecks(fetcher?: typeof fetch): Promise<Deck[]> {
  return apiGet<Deck[]>(`${PRODUCT_PREFIX}/decks`, fetcher);
}

export function createDeck(payload: CreateDeckPayload, fetcher?: typeof fetch): Promise<Deck> {
  return apiPost<Deck>(`${PRODUCT_PREFIX}/decks`, payload, fetcher);
}

export function getDeck(deckId: string, fetcher?: typeof fetch): Promise<Deck> {
  return apiGet<Deck>(`${PRODUCT_PREFIX}/decks/${deckId}`, fetcher);
}

export function getDeckEditorView(deckId: string, fetcher?: typeof fetch): Promise<DeckEditorViewModel> {
  return apiGet<DeckEditorViewModel>(`${PRODUCT_PREFIX}/decks/${deckId}/editor`, fetcher);
}

export function getDeckMap(deckId: string, fetcher?: typeof fetch): Promise<DeckEditorViewModel> {
  return apiGet<DeckEditorViewModel>(`${PRODUCT_PREFIX}/decks/${deckId}/map`, fetcher);
}

export function getEditableFields(deckId: string, fetcher?: typeof fetch): Promise<{ fields: PersistentField[] }> {
  return apiGet<{ fields: PersistentField[] }>(`${PRODUCT_PREFIX}/decks/${deckId}/editable-fields`, fetcher);
}

export function previewChanges(deckId: string, payload: ChangeRequestPayload, fetcher?: typeof fetch): Promise<ChangePreview> {
  return apiPost<ChangePreview>(`${PRODUCT_PREFIX}/decks/${deckId}/changes/preview`, payload, fetcher);
}

export function applyChanges(deckId: string, payload: ChangeRequestPayload, fetcher?: typeof fetch): Promise<DeckEditorViewModel> {
  return apiPost<DeckEditorViewModel>(`${PRODUCT_PREFIX}/decks/${deckId}/changes/apply`, payload, fetcher);
}

export function createAiCommand(payload: AiCommandPayload, fetcher?: typeof fetch): Promise<{ command: AiCommand; proposal: AiChangeProposal }> {
  return apiPost<{ command: AiCommand; proposal: AiChangeProposal }>(`${PRODUCT_PREFIX}/ai-commands`, payload, fetcher);
}

export function listAiCommands(deckId: string, fetcher?: typeof fetch): Promise<AiCommand[]> {
  return apiGet<AiCommand[]>(`${PRODUCT_PREFIX}/ai-commands?deckId=${encodeURIComponent(deckId)}`, fetcher);
}

export function acceptAiCommand(commandId: string, fetcher?: typeof fetch): Promise<{ command: AiCommand; proposal: AiChangeProposal | null }> {
  return apiPost<{ command: AiCommand; proposal: AiChangeProposal | null }>(`${PRODUCT_PREFIX}/ai-commands/${commandId}/accept`, {}, fetcher);
}

export function rejectAiCommand(commandId: string, fetcher?: typeof fetch): Promise<{ command: AiCommand; proposal: AiChangeProposal | null }> {
  return apiPost<{ command: AiCommand; proposal: AiChangeProposal | null }>(`${PRODUCT_PREFIX}/ai-commands/${commandId}/reject`, {}, fetcher);
}

export function listVersions(deckId: string, fetcher?: typeof fetch): Promise<DeckVersion[]> {
  return apiGet<DeckVersion[]>(`${PRODUCT_PREFIX}/decks/${deckId}/versions`, fetcher);
}

export function listAuditRecords(deckId: string, fetcher?: typeof fetch): Promise<DeckAuditRecord[]> {
  return apiGet<DeckAuditRecord[]>(`${PRODUCT_PREFIX}/decks/${deckId}/audit`, fetcher);
}

export function listChangeRequests(deckId: string, fetcher?: typeof fetch): Promise<ChangeRequestRecord[]> {
  return apiGet<ChangeRequestRecord[]>(`${PRODUCT_PREFIX}/decks/${deckId}/change-requests`, fetcher);
}

export function listExports(deckId: string, fetcher?: typeof fetch): Promise<DeckExport[]> {
  return apiGet<DeckExport[]>(`${PRODUCT_PREFIX}/decks/${deckId}/exports`, fetcher);
}

export function createExport(
  deckId: string,
  payload: { format: 'pdf' | 'pptx' | 'share-link' },
  fetcher?: typeof fetch
): Promise<DeckExport> {
  return apiPost<DeckExport>(`${PRODUCT_PREFIX}/decks/${deckId}/exports`, payload, fetcher);
}

export function getAccess(deckId: string, fetcher?: typeof fetch): Promise<{ entries: DeckAccessEntry[]; shareLinks: DeckShareLink[] }> {
  return apiGet<{ entries: DeckAccessEntry[]; shareLinks: DeckShareLink[] }>(`${PRODUCT_PREFIX}/decks/${deckId}/access`, fetcher);
}

export function listComments(deckId: string, fetcher?: typeof fetch): Promise<DeckComment[]> {
  return apiGet<DeckComment[]>(`${PRODUCT_PREFIX}/decks/${deckId}/comments`, fetcher);
}

export function listReviews(deckId: string, fetcher?: typeof fetch): Promise<DeckReviewMatrixItem[]> {
  return apiGet<DeckReviewMatrixItem[]>(`${PRODUCT_PREFIX}/decks/${deckId}/reviews`, fetcher);
}

export function getReviewMatrix(deckId: string, fetcher?: typeof fetch): Promise<DeckReviewMatrixItem[]> {
  return apiGet<DeckReviewMatrixItem[]>(`${PRODUCT_PREFIX}/decks/${deckId}/review-matrix`, fetcher);
}

export function getGuardrails(deckId: string, fetcher?: typeof fetch): Promise<GuardrailPayload> {
  return apiGet<GuardrailPayload>(`${PRODUCT_PREFIX}/decks/${deckId}/guardrails`, fetcher);
}

export function getDataAssets(deckId: string, fetcher?: typeof fetch): Promise<DataAssetsPayload> {
  return apiGet<DataAssetsPayload>(`${PRODUCT_PREFIX}/decks/${deckId}/data-assets`, fetcher);
}

export function listSlides(deckId: string, fetcher?: typeof fetch): Promise<DeckSlide[]> {
  return apiGet<DeckSlide[]>(`${PRODUCT_PREFIX}/decks/${deckId}/slides`, fetcher);
}

export function getSlide(slideId: string, fetcher?: typeof fetch): Promise<DeckSlide | null> {
  return apiGet<DeckSlide | null>(`${PRODUCT_PREFIX}/slides/${slideId}`, fetcher);
}

export function getBlock(blockId: string, fetcher?: typeof fetch): Promise<DeckBlock | null> {
  return apiGet<DeckBlock | null>(`${PRODUCT_PREFIX}/blocks/${blockId}`, fetcher);
}

export function createComment(deckId: string, payload: CreateCommentPayload, fetcher?: typeof fetch): Promise<DeckComment> {
  return apiPost<DeckComment>(`${PRODUCT_PREFIX}/decks/${deckId}/comments`, payload, fetcher);
}

export function listRatings(deckId: string, fetcher?: typeof fetch): Promise<DeckRating[]> {
  return apiGet<DeckRating[]>(`${PRODUCT_PREFIX}/decks/${deckId}/ratings`, fetcher);
}

export function createRating(deckId: string, payload: CreateRatingPayload, fetcher?: typeof fetch): Promise<DeckRating> {
  return apiPost<DeckRating>(`${PRODUCT_PREFIX}/decks/${deckId}/ratings`, payload, fetcher);
}

export function createShareLink(deckId: string, payload: CreateShareLinkPayload, fetcher?: typeof fetch): Promise<DeckShareLink> {
  return apiPost<DeckShareLink>(`${PRODUCT_PREFIX}/decks/${deckId}/share-links`, payload, fetcher);
}

export function listShareLinks(deckId: string, fetcher?: typeof fetch): Promise<DeckShareLink[]> {
  return apiGet<DeckShareLink[]>(`${PRODUCT_PREFIX}/decks/${deckId}/share-links`, fetcher);
}

export function listBrandProfiles(fetcher?: typeof fetch): Promise<ProductBrandProfile[]> {
  return apiGet<ProductBrandProfile[]>(`${PRODUCT_PREFIX}/brand-profiles`, fetcher);
}

export function createBrandProfile(
  payload: CreateBrandProfilePayload,
  fetcher?: typeof fetch
): Promise<ProductBrandProfile> {
  return apiPost<ProductBrandProfile>(`${PRODUCT_PREFIX}/brand-profiles`, payload, fetcher);
}

export function listUploads(fetcher?: typeof fetch): Promise<ProductUploadRecord[]> {
  return apiGet<ProductUploadRecord[]>(`${PRODUCT_PREFIX}/uploads`, fetcher);
}

export function createUpload(payload: CreateUploadPayload, fetcher?: typeof fetch): Promise<ProductUploadRecord> {
  return apiPost<ProductUploadRecord>(`${PRODUCT_PREFIX}/uploads`, payload, fetcher);
}
