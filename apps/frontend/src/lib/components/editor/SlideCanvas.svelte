<script lang="ts">
  import type { DeckBlock, DeckSlide, DeckSlideVariant } from '$lib/types/dididecks';
  import { buildCanvasBlockStyle, getBlockContentSummary, getBlockDisplayType } from '$lib/utils/dididecks';

  export let slide: DeckSlide | null = null;
  export let variant: DeckSlideVariant | null = null;
  export let blocks: DeckBlock[] = [];
  export let selectedBlockId = '';
  export let onSelectBlock: (blockId: string) => void = () => {};
</script>

<section class="panel">
  <div class="eyebrow">Slide canvas</div>
  <h2>{slide?.title ?? 'Select a slide'}</h2>
  <p class="muted-copy">
    {#if slide}
      {slide.slideType ?? 'slide'} • {slide.status ?? 'draft'} • {variant?.label ?? 'Default variant'}
    {:else}
      Select a slide to inspect block bindings and layout.
    {/if}
  </p>
  <div class="slide-canvas-frame">
    {#each blocks as block}
      <button
        class="canvas-block"
        class:selected={block.id === selectedBlockId}
        class:bound={!!block.dataBindingKey}
        class:metric={getBlockDisplayType(block) === 'metric'}
        class:shape={getBlockDisplayType(block) === 'shape' || getBlockDisplayType(block) === 'card'}
        data-block-id={block.id}
        data-field-key={block.dataBindingKey}
        type="button"
        style={buildCanvasBlockStyle(block)}
        on:click={() => onSelectBlock(block.id)}
      >
        <small>{block.blockKey ?? block.id}</small>
        <strong>{getBlockDisplayType(block)}</strong>
        <span>{getBlockContentSummary(block)}</span>
        {#if block.dataBindingKey}
          <em>Bound to {block.dataBindingKey}</em>
        {/if}
      </button>
    {/each}
  </div>
</section>
