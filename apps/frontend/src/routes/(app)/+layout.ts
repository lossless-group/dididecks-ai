import type { LayoutLoad } from './$types';

import { definePageSeo } from '#lib/seo/page.ts';

export const load: LayoutLoad = () =>
  definePageSeo({
    title: 'Private DidiDecks workspace',
    description: 'Authenticated deck workspace routes for editing, review, versions, exports, access, and product operations.',
    path: '/dashboard',
    noindex: true
  });
