import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'Demo Day Deck Workflow | DidiDecks', description: 'Review and prepare founder decks for demo day with clearer surface checks and export control.', path: '/use-cases/demo-day', breadcrumbs: [{ name: 'Use Cases', path: '/use-cases' }, { name: 'Demo Day', path: '/use-cases/demo-day' }] });
