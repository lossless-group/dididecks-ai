<script lang="ts">
  import type { DeckComment, DeckEditorViewModel, DeckExport, DeckVersion } from '$lib/types/dididecks';
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

  let selectedSlideId = model.slides[0]?.id ?? '';
  let selectedBlockId = model.blocks.find((block) => block.slideId === selectedSlideId)?.id ?? '';

  $: selectedSlide = model.slides.find((slide) => slide.id === selectedSlideId) ?? null;
  $: visibleBlocks = model.blocks.filter((block) => block.slideId === selectedSlideId);
  $: selectedBlock = model.blocks.find((block) => block.id === selectedBlockId) ?? null;
  $: boundField = selectedBlock?.boundFieldId ? model.persistentFields.find((field) => field.id === selectedBlock.boundFieldId) ?? null : null;
  $: fieldUsage = boundField ? model.fieldUsages.find((usage) => usage.fieldId === boundField.id) ?? null : null;

  function selectSlide(slideId: string) {
    selectedSlideId = slideId;
    selectedBlockId = model.blocks.find((block) => block.slideId === slideId)?.id ?? '';
  }

  function selectBlock(blockId: string) {
    selectedBlockId = blockId;
  }
</script>

{#snippet contextualLink(href: string, label: string)}
  <a class="ghost-button" href={href}>{label}</a>
{/snippet}

<section class="deck-workspace-shell">
  <SlideNavigator slides={model.slides} {selectedSlideId} onSelectSlide={selectSlide} />
  <div class="deck-workspace-content">
    <EditorToolbar />
    <SlideCanvas slide={selectedSlide} blocks={visibleBlocks} {selectedBlockId} onSelectBlock={selectBlock} />
    <AiCommandPanel deckId={model.deck.id} />
  </div>
  <div class="deck-workspace-content">
    <BlockInspector block={selectedBlock} {boundField} {fieldUsage} deckId={model.deck.id} />
    <section class="panel">
      <div class="eyebrow">Jump surfaces</div>
      <div class="hero-actions">
        {@render contextualLink(`/decks/${model.deck.id}/map`, 'Deck map')}
        {@render contextualLink(`/decks/${model.deck.id}/smart-edit`, 'Smart edit')}
        {@render contextualLink(`/decks/${model.deck.id}/rebuild`, 'Rebuild')}
      </div>
    </section>
    <CommentsPanel {comments} activeSlideId={selectedSlideId} {selectedBlockId} />
    <VersionsPanel {versions} />
    <ExportPanel deckId={model.deck.id} {exportsList} />
  </div>
</section>
