<script lang="ts">
  import { page } from '$app/stores';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { getReviewMatrixByDeckId } from '$lib/data/mockProduct';

  $: deckId = $page.params.deckId ?? 'deck-001';
  $: matrix = getReviewMatrixByDeckId(deckId);
</script>

<DeckWorkspaceShell {deckId}>
  <PageHeader eyebrow="Review" title="Review matrix" copy="Per-slide scoring and readiness surface shell." />

  <section class="panel">
    <div class="eyebrow">Slide readiness</div>
    <div class="stack-list">
      {#each matrix as item}
        <div class="list-card">
          <div>
            <strong>{item.slide}</strong>
            <p>Reviewer: {item.reviewer}</p>
          </div>
          <small>{item.status}</small>
        </div>
      {/each}
    </div>
  </section>
</DeckWorkspaceShell>
