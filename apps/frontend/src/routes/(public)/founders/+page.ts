import type { PageLoad } from './$types';
import { definePageSeo } from '$lib/seo/page';
import { faqPageSchema, softwareApplicationSchema } from '$lib/seo/schemas';

const faqs = [
  {
    question: 'How does DidiDecks help founders improve pitch decks?',
    answer: 'It lets founders review narrative readiness, compare versions, track weak slides, and rebuild the deck without losing change traceability.'
  },
  {
    question: 'Can I compare deck versions before investor meetings?',
    answer: 'Yes. DidiDecks is built around version control, review matrix visibility, and export-safe surfaces before sharing or presenting.'
  },
  {
    question: 'Does DidiDecks replace a designer?',
    answer: 'No. It focuses on deck readiness, structure, review, and controlled revisions rather than replacing design craft.'
  },
  {
    question: 'Can I use it before investor meetings?',
    answer: 'Yes. Scroll, play, version history, and export workflows help founders pressure-test the current deck before a live meeting.'
  }
];

export const load: PageLoad = () =>
  definePageSeo({
    title: 'AI Pitch Deck Review Software for Founders | DidiDecks',
    description:
      'DidiDecks helps founders review fundraising decks, compare variants, detect weak slides, and prepare investor-ready versions with clear readiness status.',
    path: '/founders',
    keywords: ['AI pitch deck review software', 'fundraising deck review', 'investor deck readiness', 'pitch deck version control'],
    breadcrumbs: [{ name: 'Founders', path: '/founders' }],
    schema: [softwareApplicationSchema('DidiDecks for Founders', 'Deck review and readiness software for fundraising founders.', '/founders'), faqPageSchema(faqs)]
  });
