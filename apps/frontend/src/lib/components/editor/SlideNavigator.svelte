<script lang="ts">
  import type { DeckBlock, DeckSlide } from '$lib/types/dididecks';

  export let slides: DeckSlide[] = [];
  export let blocks: DeckBlock[] = [];
  export let selectedSlideId = '';
  export let onSelectSlide: (slideId: string) => void = () => {};
</script>

{#snippet slideButton(slide: DeckSlide, active: boolean)}
  <button class:selected={active} type="button" on:click={() => onSelectSlide(slide.id)}>
    <strong>{slide.slideNumber ?? '•'}. {slide.title}</strong>
    <small>{slide.status ?? 'draft'} • {slide.variants.length} variants • {blocks.filter((block) => block.slideId === slide.id && !!block.dataBindingKey).length} bound</small>
  </button>
{/snippet}

<aside class="panel">
  <div class="eyebrow">Slides</div>
  {#each slides as slide}
    {@render slideButton(slide, slide.id === selectedSlideId)}
  {/each}
</aside>
