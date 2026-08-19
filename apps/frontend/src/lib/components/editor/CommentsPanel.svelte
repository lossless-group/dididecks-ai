<script lang="ts">
  import type { DeckComment } from '$lib/types/dididecks';

  export let comments: DeckComment[] = [];
  export let activeSlideId = '';
  export let selectedBlockId = '';

  $: visibleComments = comments.filter((comment) => {
    if (selectedBlockId) {
      return comment.blockId === selectedBlockId;
    }

    return comment.slideId === activeSlideId || (!comment.slideId && !comment.blockId);
  });
</script>

<section class="panel">
  <div class="section-row">
    <div>
      <div class="eyebrow">Comments</div>
      <h2>Review notes</h2>
    </div>
    <small>{visibleComments.length} visible</small>
  </div>

  <div class="stack-list">
    {#if visibleComments.length}
      {#each visibleComments as comment}
        <div class="list-card">
          <div>
            <strong>{comment.author}</strong>
            <p>{comment.body}</p>
          </div>
          <small>{comment.createdAt}</small>
        </div>
      {/each}
    {:else}
      <div class="list-card">
        <div>
          <strong>No comments yet</strong>
          <p>No comments are attached to the current slide or selected block.</p>
        </div>
      </div>
    {/if}
  </div>
</section>
