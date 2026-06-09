import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'DidiDecks Support',
    description:
      'Support for DidiDecks workspace access, review workflows, exports, billing boundaries, and deck portability.',
    path: '/support',
    keywords: ['dididecks support', 'deck workflow support', 'deck export help'],
    breadcrumbs: [{ name: 'Support', path: '/support' }]
  });
