import type { PageLoad } from './$types';

import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Contact DidiDecks',
    description:
      'Contact DidiDecks for product walkthroughs, onboarding, support, client-site portability, and commercial collaboration.',
    path: '/contact',
    keywords: ['contact dididecks', 'deck onboarding', 'deck product demo'],
    breadcrumbs: [{ name: 'Contact', path: '/contact' }]
  });
