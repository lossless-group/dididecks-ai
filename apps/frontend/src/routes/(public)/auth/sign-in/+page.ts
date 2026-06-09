import type { PageLoad } from './$types';

import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Sign in',
    description: 'Sign in to continue deck operations, workspace access, review workflows, and controlled backend-managed product state.',
    path: '/auth/sign-in',
    noindex: true,
    breadcrumbs: [
      { name: 'Auth', path: '/auth/sign-in' },
      { name: 'Sign in', path: '/auth/sign-in' }
    ]
  });
