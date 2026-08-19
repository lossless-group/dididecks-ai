<script lang="ts">
  import SeoContentPage from '$lib/components/marketing/SeoContentPage.svelte';
</script>

<SeoContentPage
  eyebrow="Data Privacy"
  title="Sensitive deck work needs visible privacy boundaries"
  copy="Users often upload confidential fundraising, diligence, board, or client material. DidiDecks should make privacy boundaries explicit rather than implicit."
  sections={[
    {
      title: 'Privacy commitments in the product model',
      items: [
        { title: 'No public deck indexing', body: 'User decks are not treated as public SEO content.' },
        { title: 'Controlled telemetry', body: 'Deck activity and review metadata should be legitimate product telemetry, not hidden data extraction.' },
        { title: 'Backend-owned processing', body: 'Persistence, auth, billing, and private workflow processing remain on the backend boundary.' }
      ]
    }
  ]}
  ctas={[
    { label: 'Read legal privacy page', href: '/legal/privacy', tone: 'ghost' },
    { label: 'Contact', href: '/contact' }
  ]}
/>
