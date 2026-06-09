import type { PageLoad } from './$types';

import { definePageSeo } from '$lib/seo/page';
import { softwareApplicationSchema } from '$lib/seo/schemas';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Deck operating system for due diligence and delivery',
    description:
      'Build, review, rebuild, present, and export reusable decks with strict product-shell discipline and backend-owned workflow boundaries.',
    path: '/',
    keywords: ['deck operating system', 'due diligence decks', 'presentation workflow', 'reusable slide system'],
    schema: softwareApplicationSchema(
      'DidiDecks',
      'Reusable deck operating system for fundraising, diligence, board, and client delivery workflows.',
      '/'
    )
  });
