<script lang="ts">
  import type { DeckBlock, DeckSlide } from '$lib/types/dididecks';
  import { getBlockContentSummary, getBlockDisplayType } from '$lib/utils/dididecks';

  export let slide: DeckSlide | null = null;
  export let blocks: DeckBlock[] = [];
  export let canvasStyle = '';
</script>

<section class="play-viewport">
  <div class="play-slide-frame" style={canvasStyle}>
    {#if slide}
      <article class="play-slide-surface">
        <div class="section-row">
          <div>
            <div class="eyebrow">Live slide</div>
            <h2>{slide.title}</h2>
          </div>
          <small>{blocks.length} blocks</small>
        </div>

        <p class="muted-copy">{slide.note}</p>

        <div class="play-block-stack">
          {#each blocks as block}
            <div class="runtime-block">
              <strong>{block.blockKey ?? getBlockDisplayType(block)}</strong>
              <p>{getBlockContentSummary(block)}</p>
              {#if block.dataBindingKey}
                <small>Bound to {block.dataBindingKey}</small>
              {/if}
            </div>
          {/each}
        </div>
      </article>
    {:else}
      <article class="play-slide-surface play-empty-surface">
        <h2>This deck has no playable slides yet.</h2>
      </article>
    {/if}
  </div>
</section>
