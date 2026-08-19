import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'Fundraising Deck Workflow | DidiDecks', description: 'Use DidiDecks to review, version, and prepare fundraising decks for investor sharing.', path: '/use-cases/fundraising', breadcrumbs: [{ name: 'Use Cases', path: '/use-cases' }, { name: 'Fundraising', path: '/use-cases/fundraising' }] });
