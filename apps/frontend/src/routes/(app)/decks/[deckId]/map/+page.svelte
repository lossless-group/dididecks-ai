<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Map" title="Narrative map" copy="Inspect deck structure, persistent field coverage, and where each piece of data lands across the story." />

  {#if data.selectedField}
    <section class="panel">
      <div class="eyebrow">Selected field focus</div>
      <h2>{data.selectedField.fieldLabel ?? data.selectedField.label}</h2>
      <p class="muted-copy">{data.selectedField.fieldKey} • affects {data.affectedSlideIds.length} slides and {data.affectedBlockIds.length} blocks</p>
    </section>
  {/if}

  <section class="route-grid route-grid-wide">
    <article class="panel">
      <div class="eyebrow">Slide structure</div>
      <div class="stack-list">
        {#each data.editorView.slides as slide}
          <div class="list-card">
            <div>
              <strong>{slide.slideNumber ?? '•'}. {slide.title}</strong>
              <p>{slide.note}</p>
            </div>
            <small>{slide.variants.length} variants{data.affectedSlideIds.includes(slide.id) ? ' • affected' : ''}</small>
          </div>
        {/each}
      </div>
    </article>

    <article class="panel">
      <div class="eyebrow">Persistent fields</div>
      <div class="stack-list">
        {#each data.editorView.persistentFields as field}
          <div class="list-card">
            <div>
              <strong>{field.label}</strong>
              <p>{field.fieldGroup ?? field.category}</p>
            </div>
            <small>{field.value}{field.fieldKey === data.fieldKey ? ' • selected' : ''}</small>
          </div>
        {/each}
      </div>
    </article>
  </section>
</DeckWorkspaceShell>
