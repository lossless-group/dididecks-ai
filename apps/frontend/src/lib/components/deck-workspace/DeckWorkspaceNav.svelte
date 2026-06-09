<script lang="ts">
  import { page } from '$app/stores';

  export let deckId = 'deck-001';

  const items = [
    { href: `/decks/${deckId}`, label: 'Overview' },
    { href: `/decks/${deckId}/map`, label: 'Deck Map' },
    { href: `/decks/${deckId}/editor`, label: 'Editor' },
    { href: `/decks/${deckId}/smart-edit`, label: 'Smart edit' },
    { href: `/decks/${deckId}/rebuild`, label: 'Rebuild' },
    { href: `/decks/${deckId}/versions`, label: 'Versions' },
    { href: `/decks/${deckId}/exports`, label: 'Exports' },
    { href: `/decks/${deckId}/play`, label: 'Play' },
    { href: `/decks/${deckId}/scroll`, label: 'Scroll' },
    { href: `/decks/${deckId}/review-matrix`, label: 'Review matrix' }
  ];
</script>

<nav class="deck-workspace-nav panel">
  {#each items as item}
    <a class:active={$page.url.pathname === item.href} href={item.href}>{item.label}</a>
  {/each}
</nav>
