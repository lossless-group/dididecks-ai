import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Data Privacy | DidiDecks',
    description: 'Data privacy posture for DidiDecks, including uploaded deck material, workflow telemetry boundaries, and backend-owned processing rules.',
    path: '/data-privacy',
    breadcrumbs: [{ name: 'Data Privacy', path: '/data-privacy' }]
  });
