import type { PageLoad } from './$types';

import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Privacy',
    description:
      'Review the current DidiDecks privacy draft covering account data, uploaded deck material, workflow metadata, and backend-managed processing boundaries.',
    path: '/legal/privacy',
    breadcrumbs: [
      { name: 'Legal', path: '/legal/privacy' },
      { name: 'Privacy', path: '/legal/privacy' }
    ]
  });
