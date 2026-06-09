<script lang="ts">
  import type {
    DeckComment,
    DeckEditorViewModel,
    DeckExport,
    DeckVersion
  } from '$lib/types/dididecks';
  import { getFieldForBlock, getFieldUsagesForField, getVariantKey } from '$lib/utils/dididecks';
  import AiCommandPanel from './AiCommandPanel.svelte';
  import BlockInspector from './BlockInspector.svelte';
  import CommentsPanel from './CommentsPanel.svelte';
  import EditorToolbar from './EditorToolbar.svelte';
  import ExportPanel from './ExportPanel.svelte';
  import SlideCanvas from './SlideCanvas.svelte';
  import SlideNavigator from './SlideNavigator.svelte';
  import VersionsPanel from './VersionsPanel.svelte';

  export let model: DeckEditorViewModel;
  export let comments: DeckComment[] = [];
  export let versions: DeckVersion[] = [];
  export let exportsList: DeckExport[] = [];

  let activeSlideId = model.slides[0]?.id ?? '';
  let activeVariantKey = getVariantKey(model.slides[0]?.variants[0]);
  let selectedBlockId = '';

  $: activeSlide = model.slides.find((slide) => slide.id === activeSlideId) ?? null;
  $: if (activeSlide && !activeSlide.variants.some((variant) => getVariantKey(variant) === activeVariantKey)) {
    activeVariantKey = getVariantKey(activeSlide.variants[0]);
  }
  $: activeVariant = activeSlide?.variants.find((variant) => getVariantKey(variant) === activeVariantKey) ?? activeSlide?.variants[0] ?? null;
  $: activeBlocks = model.blocks.filter((block) => {
    if (block.slideId !== activeSlideId) return false;
    if (!block.variantId) return true;
    return block.variantId === activeVariant?.id;
  });
  $: if (!selectedBlockId || !activeBlocks.some((block) => block.id === selectedBlockId)) {
    selectedBlockId = activeBlocks[0]?.id ?? '';
  }
  $: selectedBlock = activeBlocks.find((block) => block.id === selectedBlockId) ?? null;
  $: selectedBlockPersistentField = getFieldForBlock(selectedBlock, model.persistentFields);
  $: selectedBlockFieldUsages = getFieldUsagesForField(selectedBlockPersistentField, model.fieldUsages);

  function selectSlide(slideId: string) {
    activeSlideId = slideId;
  }

  function selectVariant(variantKey: string) {
    activeVariantKey = variantKey;
  }

  function selectBlock(blockId: string) {
    selectedBlockId = blockId;
  }
</script>

{#snippet contextualLink(href: string, label: string)}
  <a class="ghost-button" href={href}>{label}</a>
{/snippet}

<section class="deck-workspace-shell">
  <section class="show-on-mobile deck-workspace-mobile">
    <EditorToolbar
      slide={activeSlide}
      variant={activeVariant}
      selectedBlock={selectedBlock}
      selectedField={selectedBlockPersistentField}
      onSelectVariant={selectVariant}
    />
    <SlideCanvas slide={activeSlide} variant={activeVariant} blocks={activeBlocks} {selectedBlockId} onSelectBlock={selectBlock} />
    <AiCommandPanel
      deckId={model.deck.id}
      slide={activeSlide}
      variant={activeVariant}
      block={selectedBlock}
      field={selectedBlockPersistentField}
    />
    <details class="panel mobile-details" open>
      <summary>Slides</summary>
      <SlideNavigator slides={model.slides} blocks={model.blocks} selectedSlideId={activeSlideId} onSelectSlide={selectSlide} />
    </details>
    <details class="panel mobile-details">
      <summary>Inspector and actions</summary>
      <div class="deck-workspace-content">
        <BlockInspector
          block={selectedBlock}
          slide={activeSlide}
          variant={activeVariant}
          boundField={selectedBlockPersistentField}
          fieldUsages={selectedBlockFieldUsages}
          deckId={model.deck.id}
        />
        <section class="panel">
          <div class="eyebrow">Jump surfaces</div>
          <p class="muted-copy">
            {#if selectedBlockPersistentField}
              Selected binding: {selectedBlockPersistentField.fieldKey}
            {:else if selectedBlock}
              Selected block has no persistent field binding.
            {:else}
              Select a block to jump into the related rebuild surfaces.
            {/if}
          </p>
          <div class="hero-actions mobile-actions">
            {@render contextualLink(`/decks/${model.deck.id}/map${selectedBlockPersistentField ? `?field=${encodeURIComponent(selectedBlockPersistentField.fieldKey ?? '')}` : ''}`, 'Deck map')}
            {@render contextualLink(`/decks/${model.deck.id}/smart-edit${selectedBlockPersistentField ? `?field=${encodeURIComponent(selectedBlockPersistentField.fieldKey ?? '')}&slide=${encodeURIComponent(activeSlide?.id ?? '')}&block=${encodeURIComponent(selectedBlock?.id ?? '')}` : ''}`, 'Smart edit')}
            {@render contextualLink(`/decks/${model.deck.id}/rebuild${selectedBlockPersistentField ? `?field=${encodeURIComponent(selectedBlockPersistentField.fieldKey ?? '')}` : ''}`, 'Rebuild')}
          </div>
        </section>
      </div>
    </details>
    <CommentsPanel {comments} activeSlideId={activeSlideId} {selectedBlockId} />
    <VersionsPanel {versions} />
    <ExportPanel deckId={model.deck.id} {exportsList} />
  </section>

  <section class="hide-on-mobile deck-workspace-shell responsive-editor-shell">
    <SlideNavigator slides={model.slides} blocks={model.blocks} selectedSlideId={activeSlideId} onSelectSlide={selectSlide} />
    <div class="deck-workspace-content">
      <EditorToolbar
        slide={activeSlide}
        variant={activeVariant}
        selectedBlock={selectedBlock}
        selectedField={selectedBlockPersistentField}
        onSelectVariant={selectVariant}
      />
      <SlideCanvas slide={activeSlide} variant={activeVariant} blocks={activeBlocks} {selectedBlockId} onSelectBlock={selectBlock} />
      <AiCommandPanel
        deckId={model.deck.id}
        slide={activeSlide}
        variant={activeVariant}
        block={selectedBlock}
        field={selectedBlockPersistentField}
      />
    </div>
    <div class="deck-workspace-content">
      <BlockInspector
        block={selectedBlock}
        slide={activeSlide}
        variant={activeVariant}
        boundField={selectedBlockPersistentField}
        fieldUsages={selectedBlockFieldUsages}
        deckId={model.deck.id}
      />
      <section class="panel">
        <div class="eyebrow">Jump surfaces</div>
        <p class="muted-copy">
          {#if selectedBlockPersistentField}
            Selected binding: {selectedBlockPersistentField.fieldKey}
          {:else if selectedBlock}
            Selected block has no persistent field binding.
          {:else}
            Select a block to jump into the related rebuild surfaces.
          {/if}
        </p>
        <div class="hero-actions">
          {@render contextualLink(`/decks/${model.deck.id}/map${selectedBlockPersistentField ? `?field=${encodeURIComponent(selectedBlockPersistentField.fieldKey ?? '')}` : ''}`, 'Deck map')}
          {@render contextualLink(`/decks/${model.deck.id}/smart-edit${selectedBlockPersistentField ? `?field=${encodeURIComponent(selectedBlockPersistentField.fieldKey ?? '')}&slide=${encodeURIComponent(activeSlide?.id ?? '')}&block=${encodeURIComponent(selectedBlock?.id ?? '')}` : ''}`, 'Smart edit')}
          {@render contextualLink(`/decks/${model.deck.id}/rebuild${selectedBlockPersistentField ? `?field=${encodeURIComponent(selectedBlockPersistentField.fieldKey ?? '')}` : ''}`, 'Rebuild')}
        </div>
      </section>
      <CommentsPanel {comments} activeSlideId={activeSlideId} {selectedBlockId} />
      <VersionsPanel {versions} />
      <ExportPanel deckId={model.deck.id} {exportsList} />
    </div>
  </section>
</section>

<style>
  .deck-workspace-mobile {
    display: grid;
    gap: var(--dd-space-md);
  }

  .mobile-details {
    padding: var(--dd-card-padding);
  }

  .mobile-details summary {
    cursor: pointer;
    font-weight: 600;
    color: var(--dd-text);
  }

  .mobile-actions :global(a) {
    width: 100%;
  }
</style>
