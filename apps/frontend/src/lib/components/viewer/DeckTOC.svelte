<script lang="ts">
  import type { DeckSlide } from '$lib/types/dididecks';
  export let slides: DeckSlide[] = [];
  export let deckId = 'deck-001';
  export let activeSlideId = '';
</script>

<nav class="panel stack-list">
  {#each slides as slide}
    <a class="list-card" class:item-active={slide.id === activeSlideId} href={`/decks/${deckId}/scroll#scroll-slide-${slide.id}`}>
      <strong>{slide.title}</strong>
    </a>
  {/each}
</nav>
