import type { PageLoad } from './$types';
import { definePageSeo } from '#lib/seo/page.ts';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Shared deck preview',
    description: 'Restricted shared deck preview route.',
    path: '/share/token',
    noindex: true
  });
