import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'Pitch Deck Version Control Guide | DidiDecks', description: 'A guide to controlling deck revisions so fundraising or client delivery does not collapse into file sprawl.', path: '/guides/pitch-deck-version-control', breadcrumbs: [{ name: 'Guides', path: '/resources' }, { name: 'Pitch Deck Version Control', path: '/guides/pitch-deck-version-control' }] });
