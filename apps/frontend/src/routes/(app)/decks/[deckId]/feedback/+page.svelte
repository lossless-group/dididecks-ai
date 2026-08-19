<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Feedback" title="Feedback learning surface" copy="Compare human review signals and comments before that feedback is promoted into stronger deck defaults or AI workflows." />

  <section class="route-grid route-grid-wide">
    <article class="panel">
      <div class="eyebrow">Reviews</div>
      <div class="stack-list">
        {#each data.reviews as review}
          <div class="list-card">
            <strong>{review.slide}</strong>
            <p>{review.surface ?? 'surface n/a'} · {review.status} · {review.reviewer}</p>
          </div>
        {/each}
      </div>
    </article>

    <article class="panel">
      <div class="eyebrow">Comments</div>
      <div class="stack-list">
        {#each data.comments as comment}
          <div class="list-card">
            <strong>{comment.author}</strong>
            <p>{comment.body}</p>
          </div>
        {/each}
      </div>
    </article>
  </section>
</DeckWorkspaceShell>
