<script lang="ts">
  import type { DeckSlideVariant } from '$lib/types/dididecks';

  export let variants: DeckSlideVariant[] = [];
  export let activeVariantKey = '';
  export let onSelectVariant: (variantKey: string) => void = () => {};
</script>

<div class="variant-cycle-pill">
  {#if variants.length}
    {#each variants as variant}
      <button
        type="button"
        class:selected={variant.id === activeVariantKey}
        on:click={() => onSelectVariant(variant.id)}
      >
        <strong>{variant.label}</strong>
        <small>{variant.audience}</small>
      </button>
    {/each}
  {:else}
    <span class="variant-empty">No variants</span>
  {/if}
</div>
