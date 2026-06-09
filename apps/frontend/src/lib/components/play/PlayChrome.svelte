<script lang="ts">
  import VariantCyclePill from './VariantCyclePill.svelte';
  import type { DeckSlide, DeckSlideVariant } from '$lib/types/dididecks';
  import { getSurfaceVariants } from '$lib/utils/dididecks';

  export let deckId = '';
  export let slide: DeckSlide | null = null;
  export let slideNumber = 0;
  export let totalSlides = 0;
  export let chromeVisible = true;
  export let fullscreenRequested = false;
  export let activeVariantKey = '';
  export let viewportLabel = '';
  export let onToggleChrome: () => void = () => {};
  export let onToggleFullscreen: () => void = () => {};
  export let onSelectVariant: (variantKey: string) => void = () => {};

  $: variants = getSurfaceVariants(slide, 'play') ?? ([] as DeckSlideVariant[]);
</script>

{#if chromeVisible}
  <section class="play-chrome panel">
    <div class="section-row">
      <div>
        <div class="eyebrow">Play mode</div>
        <h2>{slide?.title ?? 'No slide selected'}</h2>
      </div>
      <div class="hero-actions">
        <button class="ghost-button" type="button" on:click={onToggleChrome}>Hide chrome</button>
        <button class="ghost-button" type="button" on:click={onToggleFullscreen}>
          {fullscreenRequested ? 'Exit fullscreen' : 'Fullscreen'}
        </button>
      </div>
    </div>

    <div class="play-chrome-meta">
      <span>Slide {slideNumber} / {totalSlides}</span>
      <span>Viewport {viewportLabel}</span>
      <a href={`/decks/${deckId}/map`}>Back to map</a>
    </div>

    <VariantCyclePill {variants} {activeVariantKey} {onSelectVariant} />

    <div class="play-shortcuts">
      <span><strong>Next:</strong> Right, Space, PageDown</span>
      <span><strong>Previous:</strong> Left, PageUp</span>
      <span><strong>Variants:</strong> Up, Down</span>
      <span><strong>Jump:</strong> Home, End, T</span>
      <span><strong>Chrome:</strong> C, Esc</span>
      <span><strong>Fullscreen:</strong> F</span>
    </div>
  </section>
{/if}
