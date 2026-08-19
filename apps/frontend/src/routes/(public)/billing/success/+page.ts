import type { PageLoad } from './$types';

import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Billing success',
    description: 'Checkout success status for DidiDecks. Final subscription state still depends on backend confirmation.',
    path: '/billing/success',
    noindex: true,
    breadcrumbs: [
      { name: 'Billing', path: '/billing/success' },
      { name: 'Success', path: '/billing/success' }
    ]
  });
