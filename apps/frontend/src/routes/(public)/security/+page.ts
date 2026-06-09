import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Security | DidiDecks',
    description: 'Security posture for DidiDecks, including private deck boundaries, controlled exports, versioned edits, and backend-owned access enforcement.',
    path: '/security',
    breadcrumbs: [{ name: 'Security', path: '/security' }]
  });
