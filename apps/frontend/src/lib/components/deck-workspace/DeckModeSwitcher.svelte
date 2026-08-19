<script lang="ts">
  import { page } from '$app/stores';

  export let deckId = 'deck-001';

  const items = [
    { label: 'Overview', href: `/decks/${deckId}` },
    { label: 'Map', href: `/decks/${deckId}/map` },
    { label: 'Scroll', href: `/decks/${deckId}/scroll` },
    { label: 'Play', href: `/decks/${deckId}/play` },
    { label: 'Workflow', href: `/decks/${deckId}/smart-edit` }
  ];
</script>

<div class="mode-switcher">
  {#each items as item}
    <a class:active={$page.url.pathname === item.href} href={item.href}>{item.label}</a>
  {/each}
</div>
