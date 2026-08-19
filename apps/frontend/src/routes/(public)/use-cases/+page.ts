import type { PageLoad } from './$types';

import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Use Cases',
    description:
      'DidiDecks fits recurring fundraising, board, diligence, accelerator, and client-delivery workflows where review discipline and slide portability matter.',
    path: '/use-cases',
    keywords: ['deck use cases', 'fundraising decks', 'advisor deck workflow', 'accelerator decks'],
    breadcrumbs: [{ name: 'Use Cases', path: '/use-cases' }]
  });
