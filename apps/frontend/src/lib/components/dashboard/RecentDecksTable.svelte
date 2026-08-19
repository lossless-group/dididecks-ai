<script lang="ts">
  import DeckStatusBadge from '$lib/components/deck-workspace/DeckStatusBadge.svelte';
  import type { Deck } from '$lib/types/dididecks';

  export let decks: Deck[] = [];
</script>

<div class="dashboard-list">
  {#each decks as deck}
    <a class="dashboard-deck-row" href={`/decks/${deck.id}`}>
      <div class="dashboard-deck-thumb">{deck.name.slice(0, 2).toUpperCase()}</div>
      <div class="dashboard-deck-copy">
        <strong>{deck.name}</strong>
        <p>{deck.owner}</p>
        <small>Updated {deck.updatedAt}</small>
      </div>
      <div class="dashboard-deck-meta">
        <DeckStatusBadge status={deck.status} />
      </div>
    </a>
  {/each}
</div>
