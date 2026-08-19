import type { PageLoad } from './$types';

import { definePageSeo } from '$lib/seo/page';
import { faqPageSchema, softwareApplicationSchema } from '$lib/seo/schemas';

const pricingFaqs = [
  {
    question: 'Who is the free plan for?',
    answer: 'It fits founders testing one deck workflow before moving into heavier review and export activity.'
  },
  {
    question: 'Who is the team plan for?',
    answer: 'It is aimed at advisors, consultants, studios, and accelerator teams managing repeated deck work across several decks or clients.'
  }
];

export const load: PageLoad = () =>
  definePageSeo({
    title: 'Pricing',
    description:
      'Review DidiDecks plans for founders, operators, advisors, and multi-workspace teams managing recurring high-stakes deck workflows.',
    path: '/pricing',
    keywords: ['dididecks pricing', 'deck software pricing', 'deck review workflow plans'],
    breadcrumbs: [{ name: 'Pricing', path: '/pricing' }],
    schema: [
      softwareApplicationSchema(
        'DidiDecks Pricing',
        'Pricing plans for founder, advisor, and team deck workflow management.',
        '/pricing'
      ),
      faqPageSchema(pricingFaqs)
    ]
  });
