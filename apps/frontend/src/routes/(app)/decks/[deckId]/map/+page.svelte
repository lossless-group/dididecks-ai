<script lang="ts">
  import { page } from '$app/stores';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { getEditorViewByDeckId } from '$lib/data/mockProduct';

  $: deckId = $page.params.deckId ?? 'deck-001';
  $: editorView = getEditorViewByDeckId(deckId);
</script>

<DeckWorkspaceShell {deckId}>
  <PageHeader eyebrow="Map" title="Narrative map" copy="Inspect deck structure, persistent field coverage, and where each piece of data lands across the story." />

  <section class="route-grid route-grid-wide">
    <article class="panel">
      <div class="eyebrow">Slide structure</div>
      <div class="stack-list">
        {#each editorView.slides as slide}
          <div class="list-card">
            <div>
              <strong>{slide.title}</strong>
              <p>{slide.note}</p>
            </div>
            <small>{slide.variants.length} variants</small>
          </div>
        {/each}
      </div>
    </article>

    <article class="panel">
      <div class="eyebrow">Persistent fields</div>
      <div class="stack-list">
        {#each editorView.persistentFields as field}
          <div class="list-card">
            <div>
              <strong>{field.label}</strong>
              <p>{field.category}</p>
            </div>
            <small>{field.value}</small>
          </div>
        {/each}
      </div>
    </article>
  </section>
</DeckWorkspaceShell>
