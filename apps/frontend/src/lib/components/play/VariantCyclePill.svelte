<script lang="ts">
  import type { DeckSlideVariant } from '$lib/types/dididecks';

  export let variants: DeckSlideVariant[] = [];
  export let activeVariantKey = '';
  export let onSelectVariant: (variantKey: string) => void = () => {};

  $: activeIndex = Math.max(
    variants.findIndex((variant) => variant.id === activeVariantKey),
    0
  );
  $: activeVariant = variants[activeIndex] ?? null;
  $: activeLabel = activeVariant?.label ?? 'No variants';
  $: compactLabel = activeLabel.replace(/^([A-Za-z]+)\s+/u, '').toUpperCase();

  function selectRelative(direction: -1 | 1) {
    if (!variants.length) return;
    const nextIndex = (activeIndex + direction + variants.length) % variants.length;
    onSelectVariant(variants[nextIndex].id);
  }
</script>

<div class="variant-cycle-pill">
  {#if variants.length}
    <button type="button" class="variant-cycle-arrow" aria-label="Previous variant" on:click={() => selectRelative(-1)}>
      &lsaquo;
    </button>

    <button type="button" class="variant-cycle-current" on:click={() => selectRelative(1)}>
      <strong>V{activeIndex + 1}</strong>
      <span>&middot;</span>
      <span>{compactLabel}</span>
      <small>({activeIndex + 1}/{variants.length})</small>
    </button>

    <button type="button" class="variant-cycle-arrow" aria-label="Next variant" on:click={() => selectRelative(1)}>
      &rsaquo;
    </button>
  {:else}
    <span class="variant-empty">No variants</span>
  {/if}
</div>
