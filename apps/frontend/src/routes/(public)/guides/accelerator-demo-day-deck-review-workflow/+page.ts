import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'Accelerator Demo Day Deck Review Workflow | DidiDecks', description: 'A workflow guide for accelerator teams reviewing multiple founder decks ahead of demo day.', path: '/guides/accelerator-demo-day-deck-review-workflow', breadcrumbs: [{ name: 'Guides', path: '/resources' }, { name: 'Accelerator Demo Day Workflow', path: '/guides/accelerator-demo-day-deck-review-workflow' }] });
