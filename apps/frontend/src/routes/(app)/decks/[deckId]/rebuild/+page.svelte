<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  export let data: PageData;

  const rebuildPhases = [
    'Narrative analysis',
    'Slide impact estimation',
    'Block regeneration',
    'Version snapshot and export refresh'
  ];
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Rebuild" title="Full rebuild" copy="Review high-impact narrative rebuild phases before a backend-backed apply step changes the deck." />

  {#if data.selectedField}
    <section class="panel">
      <div class="eyebrow">Selected rebuild context</div>
      <h2>{data.selectedField.fieldLabel ?? data.selectedField.label}</h2>
      <p class="muted-copy">{data.selectedField.fieldKey} • current value {data.selectedField.value}</p>
      <p><strong>Affected slides:</strong> {data.affectedSlideIds.join(', ') || 'None mapped yet'}</p>
      <p><strong>Affected blocks:</strong> {data.affectedBlockIds.join(', ') || 'None mapped yet'}</p>
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
        {#each data.editorView.slides as slide}
          <div class="list-card">
            <div>
              <strong>{slide.title}</strong>
              <p>{slide.note}</p>
            </div>
            {#if data.affectedSlideIds.includes(slide.id)}
              <small>Field-selected</small>
            {/if}
          </div>
        {/each}
      </div>
    </article>
  </section>
</DeckWorkspaceShell>
