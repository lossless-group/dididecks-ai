import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'Smart Edit for Controlled Deck Changes | DidiDecks', description: 'Smart Edit helps teams apply field-aware deck updates with visible downstream impact before changes are accepted.', path: '/features/smart-edit', keywords: ['smart edit deck', 'controlled deck changes'], breadcrumbs: [{ name: 'Features', path: '/product' }, { name: 'Smart Edit', path: '/features/smart-edit' }] });
