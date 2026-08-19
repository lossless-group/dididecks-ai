import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'Presentation Readiness for Pitch Decks | DidiDecks', description: 'Review a deck in presentation-safe mode before investor meetings, demo day, or board delivery.', path: '/features/presentation-readiness', keywords: ['presentation readiness pitch deck', 'investor deck readiness'], breadcrumbs: [{ name: 'Features', path: '/product' }, { name: 'Presentation Readiness', path: '/features/presentation-readiness' }] });
