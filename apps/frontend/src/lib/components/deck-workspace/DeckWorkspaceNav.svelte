<script lang="ts">
  export let deckId = 'deck-001';

  const items = [
    { href: `/decks/${deckId}`, label: 'Overview' },
    { href: `/decks/${deckId}/editor`, label: 'Editor' },
    { href: `/decks/${deckId}/map`, label: 'Map' },
    { href: `/decks/${deckId}/smart-edit`, label: 'Smart edit' },
    { href: `/decks/${deckId}/rebuild`, label: 'Rebuild' }
  ];
</script>

<nav class="deck-workspace-nav panel">
  {#each items as item}
    <a href={item.href}>{item.label}</a>
  {/each}
</nav>
