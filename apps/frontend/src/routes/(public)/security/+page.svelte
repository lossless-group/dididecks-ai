<script lang="ts">
  import SeoContentPage from '$lib/components/marketing/SeoContentPage.svelte';
</script>

<SeoContentPage
  eyebrow="Security"
  title="Private decks are product surfaces, not public pages"
  copy="DidiDecks is designed so sensitive deck workflows stay behind backend-managed access boundaries, while public marketing pages remain indexable."
  sections={[
    {
      title: 'Security principles',
      items: [
        { title: 'Original deck preserved', body: 'Versioned workflows and controlled edits are designed to avoid losing the original working state.' },
        { title: 'Exports are controlled', body: 'Export generation and private share policies belong to the backend boundary, not the public marketing shell.' },
        { title: 'Private routes are not SEO targets', body: 'Dashboard, decks, editor, smart edit, review matrix, versions, and exports are noindex product surfaces.' }
      ]
    }
  ]}
  ctas={[
    { label: 'Read privacy policy', href: '/data-privacy', tone: 'ghost' },
    { label: 'Contact', href: '/contact' }
  ]}
/>
