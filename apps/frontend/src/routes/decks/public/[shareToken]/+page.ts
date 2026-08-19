import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Public deck preview',
    description: 'Restricted public deck share route.',
    path: '/decks/public/share-token',
    noindex: true
  });
