import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'Board Deck Workflow | DidiDecks', description: 'A DidiDecks use case for preparing board decks with stronger version control, review visibility, and export discipline.', path: '/use-cases/board-decks', breadcrumbs: [{ name: 'Use Cases', path: '/use-cases' }, { name: 'Board Decks', path: '/use-cases/board-decks' }] });
