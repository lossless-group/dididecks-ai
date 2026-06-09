import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'AI Deck Rebuild Workflow | DidiDecks', description: 'Rebuild affected slide content after controlled edits while keeping audit, versions, and review context visible.', path: '/features/ai-deck-rebuild', keywords: ['AI deck rebuild', 'deck rebuild workflow'], breadcrumbs: [{ name: 'Features', path: '/product' }, { name: 'AI Deck Rebuild', path: '/features/ai-deck-rebuild' }] });
