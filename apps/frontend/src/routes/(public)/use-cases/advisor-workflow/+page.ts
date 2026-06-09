import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
export const load: PageLoad = () => definePageSeo({ title: 'Advisor Deck Workflow | DidiDecks', description: 'A DidiDecks use case for advisors, consultants, and studios managing recurring client deck review workflows.', path: '/use-cases/advisor-workflow', breadcrumbs: [{ name: 'Use Cases', path: '/use-cases' }, { name: 'Advisor Workflow', path: '/use-cases/advisor-workflow' }] });
