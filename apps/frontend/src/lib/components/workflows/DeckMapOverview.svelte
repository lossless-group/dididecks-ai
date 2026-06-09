<script lang="ts">
  import type { DeckEditorViewModel, PersistentField } from '$lib/types/dididecks';

  export let editorView: DeckEditorViewModel;
  export let selectedField: PersistentField | null = null;
  export let affectedSlideIds: string[] = [];
  export let fieldKey: string | null = null;
</script>

{#if selectedField}
  <section class="panel">
    <div class="eyebrow">Selected field focus</div>
    <h2>{selectedField.fieldLabel ?? selectedField.label}</h2>
    <p class="muted-copy">{selectedField.fieldKey} • {selectedField.fieldGroup ?? selectedField.category}</p>
  </section>
{/if}

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Slide structure</div>
    <div class="stack-list">
      {#each editorView.slides as slide}
        <div class="list-card">
          <div>
            <strong>{slide.slideNumber ?? '•'}. {slide.title}</strong>
            <p>{slide.note}</p>
          </div>
          <small>{slide.variants.length} variants{affectedSlideIds.includes(slide.id) ? ' • affected' : ''}</small>
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
            <p>{field.fieldGroup ?? field.category}</p>
          </div>
          <small>{field.value}{field.fieldKey === fieldKey ? ' • selected' : ''}</small>
        </div>
      {/each}
    </div>
  </article>
</section>
