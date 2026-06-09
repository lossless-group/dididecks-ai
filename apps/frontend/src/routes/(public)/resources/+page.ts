import type { PageLoad } from './$types';

import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Resources',
    description:
      'Browse DidiDecks product specs, continuity references, architecture notes, and implementation guides surfaced inside the public shell.',
    path: '/resources',
    keywords: ['dididecks resources', 'deck product specs', 'deck architecture docs'],
    breadcrumbs: [{ name: 'Resources', path: '/resources' }]
  });
