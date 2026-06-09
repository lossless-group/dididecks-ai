<script lang="ts">
  import DeckStatusBadge from '$lib/components/deck-workspace/DeckStatusBadge.svelte';
  import type { Deck } from '$lib/types/dididecks';

  export let deck: Deck;
</script>

<article class="panel deck-card">
  <DeckStatusBadge status={deck.status} />
  <h2>{deck.name}</h2>
  <p>{deck.summary}</p>
  <div class="metadata-row">
    <span><strong>Owner:</strong> {deck.owner}</span>
    <span><strong>Updated:</strong> {deck.updatedAt}</span>
  </div>
  <div class="hero-actions">
    <a class="primary-button" href={`/decks/${deck.id}`}>Open deck</a>
    <a class="ghost-button" href={`/decks/${deck.id}/editor`}>Editor</a>
  </div>
</article>
