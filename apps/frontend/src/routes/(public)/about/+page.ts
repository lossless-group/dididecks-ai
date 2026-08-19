import type { PageLoad } from './$types';

import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'About DidiDecks',
    description:
      'DidiDecks treats slides as reusable infrastructure so narrative systems can move across brands, projects, and presentation contexts without rewrites.',
    path: '/about',
    keywords: ['about dididecks', 'portable slides', 'brand inheritance', 'deck infrastructure'],
    breadcrumbs: [{ name: 'About', path: '/about' }]
  });
