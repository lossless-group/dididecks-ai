<script lang="ts">
  import DidiDecksLogo from './DidiDecksLogo.svelte';

  const footerGroups = [
    {
      title: 'Product',
      links: ['Features', 'Templates', 'Integrations', 'Pricing', 'Changelog']
    },
    {
      title: 'Use Cases',
      links: ['Startups', 'VC Firms', 'Accelerators', 'Corporate Innovation', 'Fundraising']
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Help Center', 'Guides', 'Blog', 'Community']
    },
    {
      title: 'Company',
      links: ['About', 'Careers', 'Contact', 'Privacy', 'Terms']
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
        <a href="/">{link}</a>
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
