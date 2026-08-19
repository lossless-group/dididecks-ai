<script lang="ts">
  import type { Deck } from '$lib/types/dididecks';
  import DeckCard from './DeckCard.svelte';

  export let decks: Deck[] = [];
</script>

<section class="route-grid card-grid-3">
  {#each decks as deck}
    <DeckCard {deck} />
  {/each}
</section>
