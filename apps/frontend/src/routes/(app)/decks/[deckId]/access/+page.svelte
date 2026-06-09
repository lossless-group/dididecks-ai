<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Access" title="Permissions and share surfaces" copy="Manage workspace members, share links, and access posture for the active deck." />

  <section class="route-grid route-grid-wide">
    <article class="panel">
      <div class="eyebrow">Workspace members</div>
      <div class="stack-list">
        {#each data.accessEntries as entry}
          <div class="list-card">
            <div>
              <strong>{entry.principal}</strong>
              <p>Role: {entry.accessLevel}</p>
            </div>
          </div>
        {/each}
      </div>
    </article>

    <article class="panel">
      <div class="eyebrow">Share links</div>
      <div class="stack-list">
        {#each data.shareLinks as link}
          <div class="list-card">
            <div>
              <strong>{link.label}</strong>
              <p>Status: {link.status}</p>
            </div>
          </div>
        {/each}
      </div>
    </article>
  </section>
</DeckWorkspaceShell>
