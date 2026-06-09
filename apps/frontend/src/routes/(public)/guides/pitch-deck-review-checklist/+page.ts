import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'Pitch Deck Review Checklist | DidiDecks', description: 'A practical checklist for reviewing fundraising decks before investor sharing or live presentation.', path: '/guides/pitch-deck-review-checklist', breadcrumbs: [{ name: 'Guides', path: '/resources' }, { name: 'Pitch Deck Review Checklist', path: '/guides/pitch-deck-review-checklist' }] });
