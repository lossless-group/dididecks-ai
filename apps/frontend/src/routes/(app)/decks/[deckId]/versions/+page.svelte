<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Versions" title="Version history" copy="Version records remain backend-owned, but this route is now reserved." />

  <section class="panel">
    <div class="eyebrow">Snapshot history</div>
    <div class="stack-list">
      {#if data.versions.length}
        {#each data.versions as version}
          <div class="list-card">
            <div>
              <strong>{version.label}</strong>
              <p>{version.summary}</p>
            </div>
            <small>{version.createdAt}</small>
          </div>
        {/each}
      {:else}
        <div class="list-card">
          <div>
            <strong>No versions yet</strong>
            <p>Create the first backend-backed snapshot after the next rebuild or export.</p>
          </div>
        </div>
      {/if}
    </div>
  </section>
</DeckWorkspaceShell>
