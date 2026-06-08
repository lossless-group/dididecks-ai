<script lang="ts">
  import DeckWorkspaceNav from './DeckWorkspaceNav.svelte';

  export let deckId = 'deck-001';
</script>

<section class="deck-workspace-shell">
  <DeckWorkspaceNav {deckId} />
  <div class="deck-workspace-content">
    <slot />
  </div>
</section>
