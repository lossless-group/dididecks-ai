<script lang="ts">
  import DeckChromeButton from './DeckChromeButton.svelte';
  import DeckChromeCounter from './DeckChromeCounter.svelte';

  export let deckId = 'deck-001';
  export let slideCount = 0;
  export let variantCount = 0;
</script>

<div class="panel deck-chrome-shell">
  <div class="deck-chrome-actions">
    <DeckChromeButton href={`/decks/${deckId}/map`} label="Map" />
    <DeckChromeButton href={`/decks/${deckId}/scroll`} label="Scroll" />
    <DeckChromeButton href={`/decks/${deckId}/play`} label="Play" />
  </div>
  <div class="deck-chrome-actions">
    <DeckChromeCounter label="Slides" value={`${slideCount}`} />
    <DeckChromeCounter label="Variants" value={`${variantCount}`} />
  </div>
</div>
