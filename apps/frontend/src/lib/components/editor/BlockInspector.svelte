<script lang="ts">
  import type { DeckBlock, FieldUsage, PersistentField } from '$lib/types/dididecks';

  export let block: DeckBlock | null = null;
  export let boundField: PersistentField | null = null;
  export let fieldUsage: FieldUsage | null = null;
  export let deckId = 'deck-001';
</script>

<section class="panel">
  <div class="eyebrow">Block inspector</div>
  {#if block}
    <h2>{block.type}</h2>
    <p>{block.content}</p>
    {#if boundField}
      <p><strong>Bound field:</strong> {boundField.label} = {boundField.value}</p>
      <p><strong>Used in slides:</strong> {fieldUsage?.usedInSlideIds.join(', ')}</p>
      <div class="hero-actions">
        <a class="ghost-button" href={`/decks/${deckId}/smart-edit`}>Smart Edit</a>
        <a class="ghost-button" href={`/decks/${deckId}/map`}>Map</a>
        <a class="ghost-button" href={`/decks/${deckId}/rebuild`}>Rebuild</a>
      </div>
    {/if}
  {:else}
    <p>Select a block to inspect it.</p>
  {/if}
</section>
