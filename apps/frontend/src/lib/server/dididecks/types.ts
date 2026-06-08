import type {
  AiChangeProposal,
  AiCommand,
  Deck,
  DeckAccessEntry,
  DeckEditorViewModel,
  DeckExport,
  DeckShareLink,
  DeckVersion,
  RebuildJob
} from '$lib/types/dididecks';

export interface DididecksState {
  decks: Deck[];
  editorViews: Record<string, DeckEditorViewModel>;
  versions: Record<string, DeckVersion[]>;
  exports: Record<string, DeckExport[]>;
  accessEntries: Record<string, DeckAccessEntry[]>;
  shareLinks: Record<string, DeckShareLink[]>;
  aiCommands: AiCommand[];
  proposals: AiChangeProposal[];
  rebuildJobs: RebuildJob[];
}
