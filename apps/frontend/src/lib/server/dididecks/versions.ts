import type { DeckVersion } from '$lib/types/dididecks';
import { getDididecksState } from './repository';

export function listVersions(deckId: string): DeckVersion[] {
  return getDididecksState().versions[deckId] ?? [];
}

export function createVersionSnapshot(deckId: string, summary: string): DeckVersion {
  const version: DeckVersion = {
    id: `ver-${Date.now()}`,
    deckId,
    label: `v${(getDididecksState().versions[deckId]?.length ?? 0) + 1}.0`,
    createdAt: new Date().toISOString(),
    summary
  };

  const bucket = getDididecksState().versions[deckId] ?? [];
  bucket.unshift(version);
  getDididecksState().versions[deckId] = bucket;
  return version;
}
