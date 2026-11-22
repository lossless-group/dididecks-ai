import type { PageLoad } from './$types';

import { definePageSeo } from '#lib/seo/page.ts';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Create account',
    description:
      'Create a DidiDecks workspace for decks, versions, exports, access controls, and AI-assisted narrative operations.',
    path: '/auth/sign-up',
    noindex: true,
    breadcrumbs: [
      { name: 'Auth', path: '/auth/sign-up' },
      { name: 'Create account', path: '/auth/sign-up' }
    ]
  });
