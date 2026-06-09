/**
 * Review fixtures for the main demo deck.
 *
 * The mix of perfect, passable, and urgent-redo statuses gives the review
 * matrix and review list pages visible state variation without needing a real
 * reviewer workflow backend.
 */
import type { DeckReviewMatrixItem } from '$lib/types/dididecks';

export const mockReviewMatrix: DeckReviewMatrixItem[] = [
  { slide: 'Narrative hook', status: 'perfect', reviewer: 'Andrea' },
  { slide: 'Problem', status: 'passable', reviewer: 'Mila' },
  { slide: 'Solution', status: 'urgent-redo', reviewer: 'Rene' }
];
