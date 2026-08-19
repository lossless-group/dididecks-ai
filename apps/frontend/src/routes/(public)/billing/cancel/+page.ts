import type { PageLoad } from './$types';

import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Billing cancelled',
    description: 'Checkout cancellation status for DidiDecks. No plan change is applied until the backend confirms a successful purchase.',
    path: '/billing/cancel',
    noindex: true,
    breadcrumbs: [
      { name: 'Billing', path: '/billing/cancel' },
      { name: 'Cancelled', path: '/billing/cancel' }
    ]
  });
