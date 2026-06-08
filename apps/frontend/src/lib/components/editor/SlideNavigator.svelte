<script lang="ts">
  import type { DeckSlide } from '$lib/types/dididecks';

  export let slides: DeckSlide[] = [];
  export let selectedSlideId = '';
  export let onSelectSlide: (slideId: string) => void = () => {};
</script>

{#snippet slideButton(slide: DeckSlide, active: boolean)}
  <button class:selected={active} type="button" on:click={() => onSelectSlide(slide.id)}>
    <strong>{slide.title}</strong>
    <small>{slide.note}</small>
  </button>
{/snippet}

<aside class="panel">
  <div class="eyebrow">Slides</div>
  {#each slides as slide}
    {@render slideButton(slide, slide.id === selectedSlideId)}
  {/each}
</aside>
