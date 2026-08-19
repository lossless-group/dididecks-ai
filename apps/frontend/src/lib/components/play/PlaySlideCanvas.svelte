<script lang="ts">
  import type { DeckBlock, DeckSlide } from '$lib/types/dididecks';
  import ContentFit from '$lib/components/viewer/ContentFit.svelte';
  import { buildCanvasBlockStyle, getBlockContentSummary, getBlockDisplayType } from '$lib/utils/dididecks';

  export let slide: DeckSlide | null = null;
  export let blocks: DeckBlock[] = [];
  export let canvasStyle = '';
</script>

<section class="play-viewport">
  <div class="play-slide-frame" style={canvasStyle}>
    {#if slide}
      <article class="play-slide-surface">
        <div class="play-slide-surface-meta">
          <div>
            <div class="eyebrow">Live slide</div>
            <h2>{slide.title}</h2>
          </div>
          <small>{blocks.length} blocks</small>
        </div>

        <ContentFit maxWidth="100%" maxHeight="100%" padding="10px">
          <div class="play-slide-canvas">
            {#each blocks as block}
              <div
                class="play-canvas-block"
                class:metric={getBlockDisplayType(block) === 'metric'}
                class:shape={getBlockDisplayType(block) === 'shape' || getBlockDisplayType(block) === 'card'}
                style={buildCanvasBlockStyle(block)}
              >
                <small>{block.blockKey ?? getBlockDisplayType(block)}</small>
                <strong>{getBlockContentSummary(block)}</strong>
                {#if block.dataBindingKey}
                  <em>{block.dataBindingKey}</em>
                {/if}
              </div>
            {/each}
          </div>
        </ContentFit>
      </article>
    {:else}
      <article class="play-slide-surface play-empty-surface">
        <h2>This deck has no playable slides yet.</h2>
      </article>
    {/if}
  </div>
</section>
