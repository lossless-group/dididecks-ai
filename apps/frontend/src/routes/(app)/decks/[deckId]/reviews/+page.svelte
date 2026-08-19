<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Reviews" title="Review queue" copy="Review readiness, owner coverage, and next approval steps for the active deck." />

  <section class="panel stack-list">
    <div class="section-row">
      <div>
        <div class="eyebrow">Status</div>
        <h2>Mock-backed review checkpoints</h2>
      </div>
      <span class="status-badge">Mock-backed</span>
    </div>

    <div class="hero-actions">
      <a class="ghost-button" href={`/decks/${data.deckId}/review-matrix`}>Open review matrix</a>
      <a class="ghost-button" href={`/decks/${data.deckId}/comments`}>Open comments</a>
      <a class="ghost-button" href={`/decks/${data.deckId}/versions`}>Check versions</a>
    </div>

    <div class="stack-list">
      {#if data.reviews.length}
        {#each data.reviews as review}
          <article class="list-card">
            <div>
              <strong>{review.slide}</strong>
              <p>Reviewer: {review.reviewer}</p>
            </div>
            <small>{review.status}</small>
          </article>
        {/each}
      {:else}
        <article class="list-card">
          <div>
            <strong>No review items yet</strong>
            <p>The route exists and compiles. Real reviewer workflow and approval state remain backend work.</p>
          </div>
        </article>
      {/if}
    </div>
  </section>
</DeckWorkspaceShell>
