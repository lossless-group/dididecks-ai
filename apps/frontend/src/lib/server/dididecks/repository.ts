/**
 * DidiDecks local MVP repository.
 *
 * This module is server-only. It provides mock in-memory state for the
 * SvelteKit MVP and is shaped like a future persistence layer. Data may reset
 * between server restarts or deployments.
 */
import { mockAccessEntries, mockShareLinks } from '$lib/data/mockAccess';
import { mockDeckEditorView } from '$lib/data/mockDeckEditor';
import { mockAiCommands, mockComments, mockExports, mockVersions } from '$lib/data/mockDeckWorkspace';
import { mockDecks } from '$lib/data/mockDecks';
import type { ManagedAiProviderConnection } from '$lib/types/adminAiProviders';
import type { DeckEditorViewModel } from '$lib/types/dididecks';
import type { DididecksState } from './types';

function cloneEditorView(model: DeckEditorViewModel): DeckEditorViewModel {
  return JSON.parse(JSON.stringify(model)) as DeckEditorViewModel;
}

const initialManagedAiProviders: ManagedAiProviderConnection[] = [
  {
    id: 'provider-1',
    provider: 'anthropic',
    productScope: 'dididecks',
    defaultModel: 'claude-sonnet',
    status: 'pending',
    maskedKey: 'sk-ant-***7890'
  }
];

const state: DididecksState = {
  decks: JSON.parse(JSON.stringify(mockDecks)),
  editorViews: {
    'deck-001': cloneEditorView(mockDeckEditorView),
    'deck-002': cloneEditorView({ ...mockDeckEditorView, deck: mockDecks[1] }),
    'deck-003': cloneEditorView({ ...mockDeckEditorView, deck: mockDecks[2] })
  },
  versions: {
    'deck-001': JSON.parse(JSON.stringify(mockVersions)),
    'deck-002': [],
    'deck-003': []
  },
  exports: {
    'deck-001': JSON.parse(JSON.stringify(mockExports)),
    'deck-002': [],
    'deck-003': []
  },
  accessEntries: {
    'deck-001': JSON.parse(JSON.stringify(mockAccessEntries)),
    'deck-002': [],
    'deck-003': []
  },
  shareLinks: {
    'deck-001': JSON.parse(JSON.stringify(mockShareLinks)),
    'deck-002': [],
    'deck-003': []
  },
  comments: {
    'deck-001': JSON.parse(JSON.stringify(mockComments)),
    'deck-002': [],
    'deck-003': []
  },
  aiCommands: JSON.parse(JSON.stringify(mockAiCommands)),
  proposals: [],
  rebuildJobs: [],
  managedAiProviders: JSON.parse(JSON.stringify(initialManagedAiProviders))
};

export function getDididecksState(): DididecksState {
  return state;
}
