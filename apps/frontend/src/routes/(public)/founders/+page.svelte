<script lang="ts">
  import SeoContentPage from '$lib/components/marketing/SeoContentPage.svelte';

  const faqs = [
    {
      question: 'How does DidiDecks help founders improve pitch decks?',
      answer: 'It shows which version is ready, which slides still block the story, and what changed before the next investor meeting.'
    },
    {
      question: 'Can I compare deck versions?',
      answer: 'Yes. Versions, review surfaces, and change tracking make deck differences explicit instead of buried in copy-pasted files.'
    },
    {
      question: 'Does DidiDecks replace a designer?',
      answer: 'No. It helps founders manage readiness, review discipline, and safe revisions around the design work.'
    },
    {
      question: 'Can I use it before investor meetings?',
      answer: 'Yes. The product is designed for final review in scroll, play, and export-safe modes before live presentation.'
    }
  ];
</script>

<SeoContentPage
  eyebrow="Founder / CEO"
  title="Know which version of your fundraising deck is ready"
  copy="DidiDecks helps founders review fundraising decks, control version sprawl, and prepare investor-ready narratives without losing track of what changed."
  highlights={[
    { label: 'Problem', title: 'Too many versions, unclear readiness', body: 'Founders often juggle several deck files without a reliable answer to which one is ready for the next investor conversation.' },
    { label: 'Workflow', title: 'Scroll, play, compare, fix, export', body: 'DidiDecks treats review and presentation as first-class surfaces so deck quality is checked in context, not guessed from one file.' },
    { label: 'Difference', title: 'Readiness, not just design', body: 'The focus is slide weakness, review discipline, version trail, and final presentation safety.' }
  ]}
  sections={[
    {
      eyebrow: 'Founder workflow',
      title: 'Move from draft to investor-ready with traceability',
      items: [
        { title: 'Review the full narrative', body: 'Use scroll mode for async reading and play mode for presentation-safe framing.' },
        { title: 'See weak slides early', body: 'Review matrix and comments make weak narrative sections visible before the meeting.' },
        { title: 'Apply fixes without losing control', body: 'Smart edit, versions, and exports keep the deck state explicit.' }
      ]
    },
    {
      eyebrow: 'Related pages',
      title: 'Public pages that explain the product',
      items: [
        { title: 'Review Matrix', body: 'See how slide readiness is modeled across surfaces and variants.', href: '/features/review-matrix', label: 'Open feature' },
        { title: 'Pitch deck review checklist', body: 'A guide for checking narrative and presentation readiness.', href: '/guides/pitch-deck-review-checklist', label: 'Open guide' },
        { title: 'Pricing', body: 'Choose a plan for founder deck workflows.', href: '/pricing', label: 'View pricing' }
      ]
    }
  ]}
  {faqs}
  ctas={[
    { label: 'Start free', href: '/auth/sign-up' },
    { label: 'View pricing', href: '/pricing', tone: 'ghost' }
  ]}
/>
