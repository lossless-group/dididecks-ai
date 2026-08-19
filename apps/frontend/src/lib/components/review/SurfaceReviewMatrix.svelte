<script lang="ts">
  import SurfaceStatusCell from './SurfaceStatusCell.svelte';
  import type { DeckReviewMatrixItem } from '$lib/types/dididecks';

  export let items: DeckReviewMatrixItem[] = [];
</script>

<div class="stack-list">
  {#each items as item}
    <div class="list-card">
      <div>
        <strong>{item.slide}</strong>
        <p>{item.reviewer}{item.surface ? ` • ${item.surface}` : ''}</p>
      </div>
      <SurfaceStatusCell status={item.status} />
    </div>
  {/each}
</div>
