import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Shared deck preview',
    description: 'Restricted shared deck preview route.',
    path: '/share/token',
    noindex: true
  });
