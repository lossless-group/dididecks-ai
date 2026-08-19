<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import DeckInfrastructureWorkspaces from '$lib/components/workflows/DeckInfrastructureWorkspaces.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Audit" title="Audit trail" copy="Track before-and-after actions across edits, restores, exports, and approvals." />
  <DeckInfrastructureWorkspaces title="Audit records">
    <article class="panel">
      <div class="stack-list">
        {#each data.records as record}
          <div class="list-card">
            <strong>{record.action}</strong>
            <p>{record.entityType} · {record.entityId}</p>
            <small>{record.beforeValue ?? 'n/a'} → {record.afterValue ?? 'n/a'}</small>
          </div>
        {/each}
      </div>
    </article>
  </DeckInfrastructureWorkspaces>
</DeckWorkspaceShell>
