<script lang="ts">
  import type { DeckBlock, DeckSlide } from '$lib/types/dididecks';

  export let slide: DeckSlide | null = null;
  export let blocks: DeckBlock[] = [];
  export let selectedBlockId = '';
  export let onSelectBlock: (blockId: string) => void = () => {};
</script>

<section class="panel">
  <div class="eyebrow">Slide canvas</div>
  <h2>{slide?.title ?? 'Select a slide'}</h2>
  <div class="route-grid">
    {#each blocks as block}
      <button class:selected={block.id === selectedBlockId} type="button" on:click={() => onSelectBlock(block.id)}>
        <strong>{block.type}</strong>
        <span>{block.content}</span>
      </button>
    {/each}
  </div>
</section>
