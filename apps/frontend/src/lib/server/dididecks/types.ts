import type {
  AiChangeProposal,
  AiCommand,
  Deck,
  DeckAccessEntry,
  DeckComment,
  DeckEditorViewModel,
  DeckExport,
  DeckShareLink,
  DeckVersion,
  RebuildJob
} from '$lib/types/dididecks';
import type { ManagedAiProviderConnection } from '$lib/types/adminAiProviders';

export interface DididecksState {
  decks: Deck[];
  editorViews: Record<string, DeckEditorViewModel>;
  versions: Record<string, DeckVersion[]>;
  exports: Record<string, DeckExport[]>;
  accessEntries: Record<string, DeckAccessEntry[]>;
  shareLinks: Record<string, DeckShareLink[]>;
  comments: Record<string, DeckComment[]>;
  aiCommands: AiCommand[];
  proposals: AiChangeProposal[];
  rebuildJobs: RebuildJob[];
  managedAiProviders: ManagedAiProviderConnection[];
}
