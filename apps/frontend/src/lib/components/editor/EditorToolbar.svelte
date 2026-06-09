<script lang="ts">
  import type { DeckBlock, DeckSlide, DeckSlideVariant, PersistentField } from '$lib/types/dididecks';
  import { getVariantKey } from '$lib/utils/dididecks';

  export let slide: DeckSlide | null = null;
  export let variant: DeckSlideVariant | null = null;
  export let selectedBlock: DeckBlock | null = null;
  export let selectedField: PersistentField | null = null;
  export let onSelectVariant: (variantKey: string) => void = () => {};
</script>

<section class="panel">
  <div class="section-row">
    <div>
      <div class="eyebrow">Editor toolbar</div>
      <h2>{slide?.title ?? 'No active slide'}</h2>
      <p class="muted-copy">
        {slide?.slideType ?? 'slide'} • {slide?.status ?? 'draft'}
        {#if selectedBlock}
          • Block {selectedBlock.blockKey ?? selectedBlock.id}
        {/if}
        {#if selectedField}
          • {selectedField.fieldKey}
        {/if}
      </p>
    </div>
    <div class="hero-actions">
      <button class="ghost-button" type="button">Save draft</button>
      <button class="ghost-button" type="button">Preview changes</button>
    </div>
  </div>

  {#if slide?.variants.length}
    <div class="variant-cycle-pill">
      {#each slide.variants as slideVariant}
        <button
          class:selected={getVariantKey(slideVariant) === getVariantKey(variant)}
          type="button"
          on:click={() => onSelectVariant(getVariantKey(slideVariant))}
        >
          <strong>{slideVariant.label}</strong>
          <small>{slideVariant.variantKey ?? slideVariant.audience}</small>
        </button>
      {/each}
    </div>
  {/if}
</section>
