import type { PageLoad } from './$types';

import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Product',
    description:
      'See how DidiDecks handles ingest, structured editing, live play, white-label publish, review loops, and export-ready deck continuity.',
    path: '/product',
    keywords: ['deck product', 'smart edit', 'deck rebuild workflow', 'presentation runtime'],
    breadcrumbs: [{ name: 'Product', path: '/product' }]
  });
