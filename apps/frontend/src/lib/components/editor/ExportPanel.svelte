<script lang="ts">
  import type { DeckExport } from '$lib/types/dididecks';

  export let deckId = '';
  export let exportsList: DeckExport[] = [];
</script>

<section class="panel">
  <div class="section-row">
    <div>
      <div class="eyebrow">Exports</div>
      <h2>Queue and outputs</h2>
    </div>
    <small>{exportsList.length} jobs</small>
  </div>

  <div class="hero-actions">
    <a class="ghost-button" href={`/decks/${deckId}/exports`}>Open export queue</a>
    <a class="ghost-button" href={`/decks/${deckId}/print`}>Print view</a>
  </div>

  <div class="stack-list">
    {#if exportsList.length}
      {#each exportsList as exportItem}
        <div class="list-card">
          <div>
            <strong>{exportItem.format.toUpperCase()}</strong>
            <p>Status: {exportItem.status}</p>
          </div>
          <small>{exportItem.createdAt}</small>
        </div>
      {/each}
    {:else}
      <div class="list-card">
        <div>
          <strong>No exports yet</strong>
          <p>Create the first backend-backed export job from this deck workflow.</p>
        </div>
      </div>
    {/if}
  </div>
</section>
