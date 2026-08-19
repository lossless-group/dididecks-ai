/**
 * DidiDecks product service layer.
 *
 * Routes should call this module for product behavior. The repository owns the
 * current mock state, while this service composes account context, ownership,
 * entitlements, and repo-local deck behavior into a backend-shaped surface.
 */
import type { ManagedAiProviderConnection, ManagedAiProviderCreatePayload } from '$lib/types/adminAiProviders';
import { mockReviewMatrix } from '$lib/data/mockReviewMatrix';
import type { AiCommand, Deck, DeckComment, DeckEditorViewModel, DeckReviewMatrixItem } from '$lib/types/dididecks';
import { canCreateDeck, canExport } from '$lib/server/account/entitlements';
import {
  createConnectionEvent,
  createProviderConnection,
  getCurrentAccountViewModel,
  getCurrentUserMock,
  getDeckOwnership as getDeckOwnershipRecord
} from '$lib/server/account/service';
import { getDididecksState } from './repository';

export function listDecks(): Deck[] {
  const account = getCurrentAccountViewModel();
  return getDididecksState().decks.filter((deck) => deck.workspaceId === account.activeWorkspace.id);
}

export function createDeck(name: string): Deck {
  const account = getCurrentAccountViewModel();
  const user = getCurrentUserMock();
  if (!canCreateDeck(account.subscription)) {
    throw new Error('Deck limit reached for current subscription');
  }

  const deck: Deck = {
    id: `deck-${Date.now()}`,
    title: name,
    name,
    workspaceId: account.activeWorkspace.id,
    ownerUserId: user.id,
    status: 'draft',
    summary: 'New local MVP deck scaffold.',
    owner: user.displayName,
    updatedAt: new Date().toISOString()
  };

  getDididecksState().decks.unshift(deck);
  createConnectionEvent({
    userId: user.id,
    customerAccountId: account.customerAccount.id,
    workspaceId: account.activeWorkspace.id,
    eventType: 'deck_created',
    metadata: { deckId: deck.id, deckName: deck.name }
  });
  return deck;
}

export function getDeck(deckId: string): Deck | null {
  const currentUser = getCurrentUserMock();
  if (!getDeckOwnershipRecord(deckId, currentUser.id)) return null;
  return getDididecksState().decks.find((deck) => deck.id === deckId) ?? null;
}

export function getDeckEditorView(deckId: string): DeckEditorViewModel | null {
  return getDididecksState().editorViews[deckId] ?? null;
}

export function getDeckMap(deckId: string): DeckEditorViewModel | null {
  return getDididecksState().editorViews[deckId] ?? null;
}

export function listExports(deckId: string) {
  const account = getCurrentAccountViewModel();
  if (!getDeck(deckId) || !canExport(account.subscription)) return [];
  return getDididecksState().exports[deckId] ?? [];
}

export function listAiCommands(deckId: string): AiCommand[] {
  return getDididecksState().aiCommands.filter((command) => command.deckId === deckId);
}

export function listComments(deckId: string): DeckComment[] {
  return getDididecksState().comments[deckId] ?? [];
}

export function listReviews(deckId: string): DeckReviewMatrixItem[] {
  return getReviewMatrix(deckId);
}

function maskProviderKey(provider: ManagedAiProviderCreatePayload['provider'], apiKey: string): string {
  const suffix = apiKey.trim().slice(-4) || 'local';
  return provider === 'openai' ? `sk-oai-***${suffix}` : `sk-ant-***${suffix}`;
}

export function listManagedAiProviders(): ManagedAiProviderConnection[] {
  const account = getCurrentAccountViewModel();
  return account.providerConnections
    .filter(
      (
        connection
      ): connection is typeof connection & { provider: 'anthropic' | 'openai' } =>
        connection.provider === 'anthropic' || connection.provider === 'openai'
    )
    .map((connection) => ({
      id: connection.id,
      provider: connection.provider,
      productScope: 'dididecks',
      defaultModel: connection.defaultModel ?? 'claude-sonnet',
      status:
        connection.status === 'configured'
          ? 'connected'
          : connection.status === 'disabled'
            ? 'disabled'
            : 'pending',
      maskedKey: connection.keyLastFour ? `****${connection.keyLastFour}` : 'not stored',
      customerAccountId: connection.customerAccountId,
      scope: connection.scope,
      keyLastFour: connection.keyLastFour,
      lastTestedAt: connection.lastTestedAt
    }));
}

export function createManagedAiProviderConnection(
  payload: ManagedAiProviderCreatePayload
): ManagedAiProviderConnection {
  const account = getCurrentAccountViewModel();
  const connection = createProviderConnection({
    customerAccountId: account.customerAccount.id,
    workspaceId: account.activeWorkspace.id,
    provider: payload.provider,
    scope: 'workspace',
    status: 'configured',
    defaultModel: payload.defaultModel,
    keyLastFour: payload.apiKey.trim().slice(-4) || 'local'
  });

  return {
    id: connection.id,
    provider: payload.provider,
    productScope: 'dididecks',
    defaultModel: payload.defaultModel,
    status: 'connected',
    maskedKey: maskProviderKey(payload.provider, payload.apiKey),
    customerAccountId: connection.customerAccountId,
    scope: connection.scope,
    keyLastFour: connection.keyLastFour,
    lastTestedAt: connection.lastTestedAt
  };
}

export function getReviewMatrix(deckId: string): DeckReviewMatrixItem[] {
  return deckId === 'deck-001' ? mockReviewMatrix : [];
}
