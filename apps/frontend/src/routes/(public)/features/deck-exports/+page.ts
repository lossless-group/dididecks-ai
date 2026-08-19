import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'Deck Exports and Delivery Control | DidiDecks', description: 'Generate deck exports with clearer lineage, controlled delivery, and presentation-safe final state.', path: '/features/deck-exports', keywords: ['deck exports', 'pitch deck PDF export'], breadcrumbs: [{ name: 'Features', path: '/product' }, { name: 'Deck Exports', path: '/features/deck-exports' }] });
