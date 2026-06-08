<script lang="ts">
  import { page } from '$app/stores';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { getEditorViewByDeckId } from '$lib/data/mockProduct';

  $: deckId = $page.params.deckId ?? 'deck-001';
  $: editorView = getEditorViewByDeckId(deckId);

  const rebuildPhases = [
    'Narrative analysis',
    'Slide impact estimation',
    'Block regeneration',
    'Version snapshot and export refresh'
  ];
</script>

<DeckWorkspaceShell {deckId}>
  <PageHeader eyebrow="Rebuild" title="Full rebuild" copy="Review high-impact narrative rebuild phases before a backend-backed apply step changes the deck." />

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
          </div>
        {/each}
      </div>
    </article>
  </section>
</DeckWorkspaceShell>
