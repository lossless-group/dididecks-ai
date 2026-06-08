import type {
  AiChangeProposal,
  AiCommand,
  ChangePreview,
  ChangeRequest,
  Deck,
  DeckAccessEntry,
  DeckEditorViewModel,
  DeckExport,
  DeckShareLink,
  DeckVersion,
  PersistentField
} from '$lib/types/dididecks';
import { apiGet, apiPost } from './client';

export function listDecks(fetcher?: typeof fetch): Promise<Deck[]> {
  return apiGet<Deck[]>('/api/dididecks/decks', fetcher);
}

export function createDeck(payload: { name: string }, fetcher?: typeof fetch): Promise<Deck> {
  return apiPost<Deck>('/api/dididecks/decks', payload, fetcher);
}

export function getDeck(deckId: string, fetcher?: typeof fetch): Promise<Deck> {
  return apiGet<Deck>(`/api/dididecks/decks/${deckId}`, fetcher);
}

export function getDeckEditorView(deckId: string, fetcher?: typeof fetch): Promise<DeckEditorViewModel> {
  return apiGet<DeckEditorViewModel>(`/api/dididecks/decks/${deckId}/editor`, fetcher);
}

export function getDeckMap(deckId: string, fetcher?: typeof fetch): Promise<DeckEditorViewModel> {
  return apiGet<DeckEditorViewModel>(`/api/dididecks/decks/${deckId}/map`, fetcher);
}

export function getEditableFields(deckId: string, fetcher?: typeof fetch): Promise<{ fields: PersistentField[] }> {
  return apiGet<{ fields: PersistentField[] }>(`/api/dididecks/decks/${deckId}/editable-fields`, fetcher);
}

export function previewChanges(deckId: string, payload: { changes: ChangeRequest[] }, fetcher?: typeof fetch): Promise<ChangePreview> {
  return apiPost<ChangePreview>(`/api/dididecks/decks/${deckId}/changes/preview`, payload, fetcher);
}

export function applyChanges(deckId: string, payload: { changes: ChangeRequest[] }, fetcher?: typeof fetch): Promise<DeckEditorViewModel> {
  return apiPost<DeckEditorViewModel>(`/api/dididecks/decks/${deckId}/changes/apply`, payload, fetcher);
}

export function createAiCommand(payload: { deckId: string; command: string }, fetcher?: typeof fetch): Promise<{ command: AiCommand; proposal: AiChangeProposal }> {
  return apiPost<{ command: AiCommand; proposal: AiChangeProposal }>('/api/dididecks/ai-commands', payload, fetcher);
}

export function acceptAiCommand(commandId: string, fetcher?: typeof fetch): Promise<{ command: AiCommand; proposal: AiChangeProposal | null }> {
  return apiPost<{ command: AiCommand; proposal: AiChangeProposal | null }>(`/api/dididecks/ai-commands/${commandId}/accept`, {}, fetcher);
}

export function rejectAiCommand(commandId: string, fetcher?: typeof fetch): Promise<{ command: AiCommand; proposal: AiChangeProposal | null }> {
  return apiPost<{ command: AiCommand; proposal: AiChangeProposal | null }>(`/api/dididecks/ai-commands/${commandId}/reject`, {}, fetcher);
}

export function listVersions(deckId: string, fetcher?: typeof fetch): Promise<DeckVersion[]> {
  return apiGet<DeckVersion[]>(`/api/dididecks/decks/${deckId}/versions`, fetcher);
}

export function listExports(deckId: string, fetcher?: typeof fetch): Promise<DeckExport[]> {
  return apiGet<DeckExport[]>(`/api/dididecks/decks/${deckId}/exports`, fetcher);
}

export function getAccess(deckId: string, fetcher?: typeof fetch): Promise<{ entries: DeckAccessEntry[]; shareLinks: DeckShareLink[] }> {
  return apiGet<{ entries: DeckAccessEntry[]; shareLinks: DeckShareLink[] }>(`/api/dididecks/decks/${deckId}/access`, fetcher);
}
