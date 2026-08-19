<script lang="ts">
  import type { DeckEditorViewModel, PersistentField } from '$lib/types/dididecks';

  export let editorView: DeckEditorViewModel;
  export let selectedField: PersistentField | null = null;
  export let affectedSlideIds: string[] = [];
  export let affectedBlockIds: string[] = [];

  const rebuildPhases = [
    'Narrative analysis',
    'Slide impact estimation',
    'Block regeneration',
    'Version snapshot and export refresh'
  ];
</script>

{#if selectedField}
  <section class="panel">
    <div class="eyebrow">Selected rebuild context</div>
    <h2>{selectedField.fieldLabel ?? selectedField.label}</h2>
    <p class="muted-copy">{selectedField.fieldKey} • current value {selectedField.value}</p>
    <p><strong>Affected slides:</strong> {affectedSlideIds.join(', ') || 'None mapped yet'}</p>
    <p><strong>Affected blocks:</strong> {affectedBlockIds.join(', ') || 'None mapped yet'}</p>
    <div class="hero-actions">
      <button class="primary-button" type="button">Apply rebuild plan</button>
      <button class="ghost-button" type="button">Preview rebuild only</button>
    </div>
  </section>
{/if}

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Rebuild phases</div>
    <ol class="ordered-list">
      {#each rebuildPhases as phase}
        <li>{phase}</li>
      {/each}
    </ol>
  </article>

  <article class="panel">
    <div class="eyebrow">Likely impacted slides</div>
    <div class="stack-list">
      {#each editorView.slides as slide}
        <div class="list-card">
          <div>
            <strong>{slide.title}</strong>
            <p>{slide.note}</p>
          </div>
          {#if affectedSlideIds.includes(slide.id)}
            <small>Field-selected</small>
          {/if}
        </div>
      {/each}
    </div>
  </article>
</section>
