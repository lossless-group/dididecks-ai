<script lang="ts">
  import { goto } from '$app/navigation';
  import type { DeckEditorViewModel, DeckSlide } from '$lib/types/dididecks';
  import PlayChrome from './PlayChrome.svelte';
  import PlaySlideCanvas from './PlaySlideCanvas.svelte';

  export let deckId = '';
  export let model: DeckEditorViewModel | null = null;

  let currentSlideIndex = 0;
  let chromeVisible = true;
  let fullscreenRequested = false;
  let activeVariantKey = '';
  let innerWidth = 0;
  let innerHeight = 0;

  $: slides = model?.slides ?? [];
  $: totalSlides = slides.length;
  $: if (currentSlideIndex > Math.max(totalSlides - 1, 0)) currentSlideIndex = Math.max(totalSlides - 1, 0);
  $: activeSlide = slides[currentSlideIndex] ?? null;
  $: activeBlocks = model?.blocks.filter((block) => block.slideId === activeSlide?.id) ?? [];
  $: if (activeSlide && !activeSlide.variants.some((variant) => variant.id === activeVariantKey)) {
    activeVariantKey = activeSlide.variants[0]?.id ?? '';
  }
  $: viewportLabel = `${innerWidth}×${innerHeight}`;
  $: canvasStyle = `--play-max-width:${Math.max(innerWidth - 120, 320)}px;--play-max-height:${Math.max(innerHeight - 180, 220)}px;`;

  function nextSlide() {
    if (!totalSlides) return;
    currentSlideIndex = Math.min(currentSlideIndex + 1, totalSlides - 1);
  }

  function previousSlide() {
    if (!totalSlides) return;
    currentSlideIndex = Math.max(currentSlideIndex - 1, 0);
  }

  function firstSlide() {
    currentSlideIndex = 0;
  }

  function lastSlide() {
    if (!totalSlides) return;
    currentSlideIndex = totalSlides - 1;
  }

  function toggleChrome() {
    chromeVisible = !chromeVisible;
  }

  function toggleFullscreenState() {
    fullscreenRequested = !fullscreenRequested;
  }

  function handleVariantSelect(variantKey: string) {
    activeVariantKey = variantKey;
  }

  function isInteractiveTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (isInteractiveTarget(event.target)) return;

    const key = event.key;
    const navigationKeys = [' ', 'Spacebar', 'ArrowRight', 'ArrowLeft', 'PageDown', 'PageUp', 'Home', 'End'];

    if (navigationKeys.includes(key)) {
      event.preventDefault();
    }

    switch (key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
      case 'Spacebar':
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        previousSlide();
        break;
      case 'Home':
        firstSlide();
        break;
      case 'End':
        lastSlide();
        break;
      case 'f':
      case 'F':
        toggleFullscreenState();
        break;
      case 'c':
      case 'C':
        toggleChrome();
        break;
      case 't':
      case 'T':
        void goto(`/decks/${deckId}/map`);
        break;
      case 'Escape':
        chromeVisible = true;
        fullscreenRequested = false;
        break;
    }
  }
</script>

<!-- Important: <svelte:window> must be top-level in the component. Do not put it inside conditionals or nested markup. -->
<svelte:window on:keydown={handleKeydown} bind:innerWidth bind:innerHeight />

{#if totalSlides}
  <section class:play-mode-fullscreen={fullscreenRequested} class="play-mode-shell">
    <PlayChrome
      {deckId}
      slide={activeSlide}
      slideNumber={currentSlideIndex + 1}
      {totalSlides}
      {chromeVisible}
      {fullscreenRequested}
      {activeVariantKey}
      {viewportLabel}
      onToggleChrome={toggleChrome}
      onToggleFullscreen={toggleFullscreenState}
      onSelectVariant={handleVariantSelect}
    />

    <PlaySlideCanvas slide={activeSlide} blocks={activeBlocks} {canvasStyle} />
  </section>
{:else}
  <section class="panel">
    <div class="eyebrow">Play mode</div>
    <h2>This deck has no playable slides yet.</h2>
    <p class="muted-copy">Add slides to the deck editor and return here when the narrative has something to present.</p>
  </section>
{/if}
