import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'Manage Multiple Founder Decks | DidiDecks', description: 'A guide for operators, advisors, or consultants managing many fundraising decks in parallel.', path: '/guides/manage-multiple-founder-decks', breadcrumbs: [{ name: 'Guides', path: '/resources' }, { name: 'Manage Multiple Founder Decks', path: '/guides/manage-multiple-founder-decks' }] });
