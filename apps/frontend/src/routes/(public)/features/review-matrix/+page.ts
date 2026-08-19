import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Pitch Deck Review Matrix for Slide Readiness | DidiDecks',
    description: 'A review matrix shows which slides are ready for async reading, live presentation, advisor review, or final export.',
    path: '/features/review-matrix',
    keywords: ['pitch deck review matrix', 'slide readiness', 'deck review workflow'],
    breadcrumbs: [{ name: 'Features', path: '/product' }, { name: 'Review Matrix', path: '/features/review-matrix' }]
  });
