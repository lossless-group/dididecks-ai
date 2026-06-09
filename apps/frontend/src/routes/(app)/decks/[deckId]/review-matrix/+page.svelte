<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Review" title="Review matrix" copy="Per-slide scoring and readiness surface shell." />

  <section class="panel">
    <div class="eyebrow">Slide readiness</div>
    <div class="stack-list">
      {#each data.matrix as item}
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
