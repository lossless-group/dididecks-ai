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
} from '#lib/types/dididecks.ts';
import type { ManagedAiProviderConnection } from '#lib/types/adminAiProviders.ts';

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
