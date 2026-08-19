<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Comments" title="Review comments" copy="Local MVP comment lane for the active deck. Backend notification and assignment logic remains pending." />

  <section class="panel stack-list">
    <div class="section-row">
      <div>
        <div class="eyebrow">Status</div>
        <h2>Mock-backed review comments</h2>
      </div>
      <span class="status-badge">Local MVP</span>
    </div>

    <div class="hero-actions">
      <a class="ghost-button" href={`/decks/${data.deckId}/editor`}>Open editor</a>
      <a class="ghost-button" href={`/decks/${data.deckId}/reviews`}>Open reviews</a>
      <a class="ghost-button" href={`/decks/${data.deckId}/access`}>Manage access</a>
    </div>

    <div class="stack-list">
      {#if data.comments.length}
        {#each data.comments as comment}
          <article class="list-card">
            <div>
              <strong>{comment.author}</strong>
              <p>{comment.body}</p>
              <small>
                {comment.slideId ? `Slide ${comment.slideId}` : 'Deck-level'}{comment.blockId ? ` · Block ${comment.blockId}` : ''}
              </small>
            </div>
            <small>{comment.createdAt}</small>
          </article>
        {/each}
      {:else}
        <article class="list-card">
          <div>
            <strong>No comments yet</strong>
            <p>This route is ready. Real comment persistence, notifications, and assignment stay backend-owned.</p>
          </div>
        </article>
      {/if}
    </div>
  </section>
</DeckWorkspaceShell>
