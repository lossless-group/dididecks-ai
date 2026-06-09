<script lang="ts">
  export let label = '';
  export let href: string | null = null;
</script>

{#if href}
  <a class="deck-chrome-button" {href}>{label}</a>
{:else}
  <button class="deck-chrome-button" type="button">{label}</button>
{/if}
