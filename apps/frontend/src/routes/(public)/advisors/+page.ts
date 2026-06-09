import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
import { faqPageSchema, organizationSchema, softwareApplicationSchema } from '$lib/seo/schemas';

const faqs = [
  {
    question: 'How does DidiDecks help advisors and accelerator teams?',
    answer: 'It gives them a deck review workflow across many clients or founders, with review visibility, version control, and export-safe handoff.'
  },
  {
    question: 'Can DidiDecks help manage multiple founder decks?',
    answer: 'Yes. The product shell is designed for dashboard, deck status, comments, versions, and repeatable review loops.'
  },
  {
    question: 'Can it support handoff to clients?',
    answer: 'Yes. Access, exports, version history, and presentation-safe review surfaces help teams deliver controlled final outputs.'
  }
];

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Deck Review Workflow Software for Advisors & Accelerators | DidiDecks',
    description:
      'DidiDecks helps advisors, consultants, and accelerator teams manage client deck variants, review readiness, trace changes, and export presentation-safe decks.',
    path: '/advisors',
    keywords: ['deck review workflow software', 'accelerator demo day deck review', 'manage client pitch decks', 'consultant deck review workflow'],
    breadcrumbs: [{ name: 'Advisors', path: '/advisors' }],
    schema: [
      organizationSchema(),
      softwareApplicationSchema('DidiDecks for Advisors', 'Deck review workflow software for consultants, advisors, and accelerator teams.', '/advisors'),
      faqPageSchema(faqs)
    ]
  });
