<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Print" title="Print and export preview" copy="Review print-safe deck ordering, output readiness, and the latest export queue before generating artifacts." />

  <section class="route-grid route-grid-wide">
    <article class="panel">
      <div class="eyebrow">Printable sequence</div>
      <div class="stack-list">
        {#each data.model.slides as slide, index}
          <div class="list-card">
            <div>
              <strong>Page {index + 1}: {slide.title}</strong>
              <p>{slide.note}</p>
            </div>
          </div>
        {/each}
      </div>
    </article>

    <article class="panel">
      <div class="eyebrow">Export readiness</div>
      <div class="stack-list">
        {#each data.exportsList as exportItem}
          <div class="list-card">
            <div>
              <strong>{exportItem.format.toUpperCase()}</strong>
              <p>Status: {exportItem.status}</p>
            </div>
            <small>{exportItem.createdAt}</small>
          </div>
        {/each}
      </div>
    </article>
  </section>
</DeckWorkspaceShell>
