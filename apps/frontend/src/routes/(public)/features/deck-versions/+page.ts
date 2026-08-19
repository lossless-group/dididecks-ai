import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'Pitch Deck Version Control | DidiDecks', description: 'Track deck revisions, restore previous states, and keep fundraising or client deck changes auditable.', path: '/features/deck-versions', keywords: ['pitch deck version control', 'deck versions'], breadcrumbs: [{ name: 'Features', path: '/product' }, { name: 'Deck Versions', path: '/features/deck-versions' }] });
