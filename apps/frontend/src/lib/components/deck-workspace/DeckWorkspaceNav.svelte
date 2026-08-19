<script lang="ts">
  import { page } from '$app/stores';

  export let deckId = 'deck-001';

  const items = [
    { href: `/decks/${deckId}`, label: 'Overview' },
    { href: `/decks/${deckId}/toc`, label: 'TOC' },
    { href: `/decks/${deckId}/slides`, label: 'Slides' },
    { href: `/decks/${deckId}/map`, label: 'Deck Map' },
    { href: `/decks/${deckId}/editor`, label: 'Editor' },
    { href: `/decks/${deckId}/smart-edit`, label: 'Smart edit' },
    { href: `/decks/${deckId}/rebuild`, label: 'Rebuild' },
    { href: `/decks/${deckId}/change-requests`, label: 'Change requests' },
    { href: `/decks/${deckId}/versions`, label: 'Versions' },
    { href: `/decks/${deckId}/exports`, label: 'Exports' },
    { href: `/decks/${deckId}/access`, label: 'Access' },
    { href: `/decks/${deckId}/audit`, label: 'Audit' },
    { href: `/decks/${deckId}/guardrails`, label: 'Guardrails' },
    { href: `/decks/${deckId}/data-assets`, label: 'Data Assets' },
    { href: `/decks/${deckId}/play`, label: 'Play' },
    { href: `/decks/${deckId}/scroll`, label: 'Scroll' },
    { href: `/decks/${deckId}/print`, label: 'Print' },
    { href: `/decks/${deckId}/review-matrix`, label: 'Review matrix' },
    { href: `/decks/${deckId}/feedback`, label: 'Feedback' },
    { href: `/decks/${deckId}/api-status`, label: 'API status' },
    { href: `/decks/${deckId}/sync`, label: 'Sync' }
  ];
</script>

<nav class="deck-workspace-nav panel">
  {#each items as item}
    <a class:active={$page.url.pathname === item.href} href={item.href}>{item.label}</a>
  {/each}
</nav>
