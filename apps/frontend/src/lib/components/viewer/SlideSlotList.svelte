<script lang="ts">
  import type { DeckSlide } from '$lib/types/dididecks';
  export let slides: DeckSlide[] = [];
</script>

<div class="stack-list">
  {#each slides as slide}
    <div class="list-card">
      <strong>{slide.slideKey ?? slide.title}</strong>
      <small>{slide.slideType ?? 'slide'}</small>
    </div>
  {/each}
</div>
