/**
 * Supporting workspace fixtures for the local deck control room.
 *
 * These arrays back versions, exports, AI commands, and comments for the main
 * demo deck. They remain in-memory so another developer can safely replace
 * them with repository-backed persistence later.
 */
import type { AiCommand, DeckComment, DeckExport, DeckVersion } from '$lib/types/dididecks';

export const mockVersions: DeckVersion[] = [
  { id: 'ver-1', deckId: 'deck-001', label: 'v2.4', createdAt: 'Today', summary: 'Investor hook tightened.' },
  { id: 'ver-2', deckId: 'deck-001', label: 'v2.3', createdAt: 'Yesterday', summary: 'Traction slide refreshed.' }
];

export const mockExports: DeckExport[] = [
  { id: 'exp-1', deckId: 'deck-001', format: 'pdf', status: 'ready', createdAt: 'Today' },
  { id: 'exp-2', deckId: 'deck-001', format: 'pptx', status: 'queued', createdAt: 'Today' },
  { id: 'exp-3', deckId: 'deck-001', format: 'share-link', status: 'ready', createdAt: 'Yesterday' }
];

export const mockAiCommands: AiCommand[] = [
  { id: 'cmd-1', deckId: 'deck-001', command: 'Tighten the investor hook.', status: 'proposed' },
  { id: 'cmd-2', deckId: 'deck-001', command: 'Clarify the moat slide.', status: 'accepted' }
];

export const mockComments: DeckComment[] = [
  {
    id: 'comment-1',
    deckId: 'deck-001',
    slideId: 'slide-1',
    author: 'Andrea',
    body: 'Lead with urgency here. This is the frame investors remember.',
    createdAt: '2026-06-07'
  },
  {
    id: 'comment-2',
    deckId: 'deck-001',
    slideId: 'slide-3',
    blockId: 'block-4',
    author: 'Mila',
    body: 'ARR figure should stay tied to the persistent field before export.',
    createdAt: '2026-06-08'
  }
];
