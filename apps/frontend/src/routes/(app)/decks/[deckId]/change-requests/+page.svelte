<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import DeckInfrastructureWorkspaces from '$lib/components/workflows/DeckInfrastructureWorkspaces.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Changes" title="Change requests" copy="Explicitly track proposed changes before they become operational deck state." />
  <DeckInfrastructureWorkspaces title="Change request queue">
    <article class="panel">
      <div class="stack-list">
        {#each data.requests as request}
          <div class="list-card">
            <div>
              <strong>{request.requestedBy}</strong>
              <p>{request.items.length} proposed field changes · {request.createdAt}</p>
            </div>
            <small>{request.status}</small>
          </div>
        {/each}
      </div>
    </article>
  </DeckInfrastructureWorkspaces>
</DeckWorkspaceShell>
