<script lang="ts">
  import SeoContentPage from '$lib/components/marketing/SeoContentPage.svelte';

  const faqs = [
    {
      question: 'How does DidiDecks help advisor teams?',
      answer: 'It gives them a repeatable workflow for reviewing, fixing, rebuilding, exporting, and handing off many client decks at once.'
    },
    {
      question: 'Can it help manage multiple founder decks?',
      answer: 'Yes. The dashboard and deck workspace surfaces are meant for multi-deck operational throughput.'
    },
    {
      question: 'Can it support handoff to clients?',
      answer: 'Yes. Version history, access control, and final export surfaces make handoff less ad hoc.'
    }
  ];
</script>

<SeoContentPage
  eyebrow="Advisor / Consultant / Accelerator Operator"
  title="Manage every client deck from review to ready-to-present"
  copy="DidiDecks helps advisors, consultants, and accelerator teams manage client deck variants, trace changes, and keep review-to-export workflow disciplined."
  highlights={[
    { label: 'Problem', title: 'Variant sprawl across many founders', body: 'Client review cycles create too many deck versions with no reliable operating state.' },
    { label: 'Solution', title: 'Review matrix, smart edit, rebuild, exports', body: 'The product makes weak slides, requested changes, and final output status visible in one place.' },
    { label: 'Value', title: 'Traceability and controlled handoff', body: 'Exports, comments, access, and versions make delivery explicit instead of manual.' }
  ]}
  sections={[
    {
      eyebrow: 'Operator workflow',
      title: 'Run deck review like a system, not a side process',
      items: [
        { title: 'Track deck state across clients', body: 'Use dashboard and deck status to see which narratives still block handoff.' },
        { title: 'Review in context', body: 'Read in scroll, present in play, and keep comments or ratings connected to the deck object.' },
        { title: 'Deliver clean outputs', body: 'Exports, access, and versions reduce confusion at the final delivery stage.' }
      ]
    },
    {
      eyebrow: 'Related pages',
      title: 'Public pages for this buyer',
      items: [
        { title: 'Accelerator workflow guide', body: 'A public guide for demo day deck review process.', href: '/guides/accelerator-demo-day-deck-review-workflow', label: 'Open guide' },
        { title: 'Advisor workflow use case', body: 'A use-case page focused on repeated deck review operations.', href: '/use-cases/advisor-workflow', label: 'Open use case' },
        { title: 'Pricing', body: 'Plans for advisor and multi-workspace teams.', href: '/pricing', label: 'View pricing' }
      ]
    }
  ]}
  {faqs}
  ctas={[
    { label: 'Start workspace', href: '/auth/sign-up' },
    { label: 'Book contact call', href: '/contact', tone: 'ghost' }
  ]}
/>
