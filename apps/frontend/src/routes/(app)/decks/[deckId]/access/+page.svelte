<script lang="ts">
  import { page } from '$app/stores';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { getAccessEntriesByDeckId, getShareLinksByDeckId } from '$lib/data/mockProduct';

  $: deckId = $page.params.deckId ?? 'deck-001';
  $: accessEntries = getAccessEntriesByDeckId(deckId);
  $: shareLinks = getShareLinksByDeckId(deckId);
</script>

<DeckWorkspaceShell {deckId}>
  <PageHeader eyebrow="Access" title="Permissions and share surfaces" copy="Manage workspace members, share links, and access posture for the active deck." />

  <section class="route-grid route-grid-wide">
    <article class="panel">
      <div class="eyebrow">Workspace members</div>
      <div class="stack-list">
        {#each accessEntries as entry}
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
        {#each shareLinks as link}
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
