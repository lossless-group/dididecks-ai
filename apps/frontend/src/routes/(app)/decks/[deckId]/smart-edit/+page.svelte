<script lang="ts">
  import { page } from '$app/stores';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { getAiCommandsByDeckId, getEditorViewByDeckId } from '$lib/data/mockProduct';

  $: deckId = $page.params.deckId ?? 'deck-001';
  $: commands = getAiCommandsByDeckId(deckId);
  $: editorView = getEditorViewByDeckId(deckId);
</script>

<DeckWorkspaceShell {deckId}>
  <PageHeader eyebrow="Smart edit" title="AI-guided changes" copy="This route collects commands; execution remains backend-owned." />

  <section class="route-grid route-grid-wide">
    <article class="panel">
      <div class="eyebrow">Queued commands</div>
      <div class="stack-list">
        {#each commands as command}
          <div class="list-card">
            <div>
              <strong>{command.command}</strong>
              <p>Command status: {command.status}</p>
            </div>
            <a class="ghost-button" href={`/decks/${deckId}/editor`}>Inspect deck</a>
          </div>
        {/each}
      </div>
    </article>

    <article class="panel">
      <div class="eyebrow">Fields most likely to change</div>
      <div class="stack-list">
        {#each editorView.persistentFields as field}
          <div class="list-card">
            <div>
              <strong>{field.label}</strong>
              <p>{field.category}</p>
            </div>
            <small>{field.value}</small>
          </div>
        {/each}
      </div>
    </article>
  </section>
</DeckWorkspaceShell>
