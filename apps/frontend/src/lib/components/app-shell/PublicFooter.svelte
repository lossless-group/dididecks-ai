<script lang="ts">
  import DidiDecksLogo from './DidiDecksLogo.svelte';

  const footerGroups = [
    {
      title: 'Product',
      links: [
        { label: 'Review Matrix', href: '/features/review-matrix' },
        { label: 'Smart Edit', href: '/features/smart-edit' },
        { label: 'Deck Versions', href: '/features/deck-versions' },
        { label: 'Deck Exports', href: '/features/deck-exports' },
        { label: 'Pricing', href: '/pricing' }
      ]
    },
    {
      title: 'Use Cases',
      links: [
        { label: 'Fundraising', href: '/use-cases/fundraising' },
        { label: 'Demo Day', href: '/use-cases/demo-day' },
        { label: 'Advisor Workflow', href: '/use-cases/advisor-workflow' },
        { label: 'Board Decks', href: '/use-cases/board-decks' },
        { label: 'Founders', href: '/founders' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Pitch Deck Review Checklist', href: '/guides/pitch-deck-review-checklist' },
        { label: 'Investor Deck Readiness', href: '/guides/how-to-know-if-your-investor-deck-is-ready' },
        { label: 'Version Control Guide', href: '/guides/pitch-deck-version-control' },
        { label: 'Accelerator Workflow Guide', href: '/guides/accelerator-demo-day-deck-review-workflow' },
        { label: 'Resources', href: '/resources' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Security', href: '/security' },
        { label: 'Privacy', href: '/legal/privacy' },
        { label: 'Terms', href: '/legal/terms' }
      ]
    }
  ];
</script>

<footer class="public-footer">
  <div class="footer-brand-column">
    <DidiDecksLogo subtitle="Reusable deck operating system" />
    <p>DidiDecks turns reusable slide systems into structured, editable, rebuildable product assets that inherit the destination brand automatically.</p>
    <small class="footer-legal">© 2025 DidiDecks, Inc. All rights reserved.</small>
  </div>

  {#each footerGroups as group}
    <div class="footer-link-group">
      <strong>{group.title}</strong>
      {#each group.links as link}
        <a href={link.href}>{link.label}</a>
      {/each}
    </div>
  {/each}

  <div class="footer-subscribe">
    <strong>Stay in the loop</strong>
    <p>Get the latest updates and deck building insights.</p>
    <div class="footer-subscribe-form">
      <input type="email" placeholder="Enter your email" aria-label="Email address" />
      <button class="primary-button" type="button">Join</button>
    </div>
  </div>
</footer>
