import type { PageLoad } from './$types';

import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Terms',
    description:
      'Review the current DidiDecks terms draft covering account responsibilities, uploads, AI-assisted outputs, subscriptions, and backend validation boundaries.',
    path: '/legal/terms',
    breadcrumbs: [
      { name: 'Legal', path: '/legal/terms' },
      { name: 'Terms', path: '/legal/terms' }
    ]
  });
