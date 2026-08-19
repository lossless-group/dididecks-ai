<script lang="ts">
  import { goto } from '$app/navigation';
  import type { DeckEditorViewModel, DeckSlide } from '$lib/types/dididecks';
  import { getBlocksForSlideVariant, getPrimaryVariant, getSurfaceVariants } from '$lib/utils/dididecks';
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
  $: activeVariants = getSurfaceVariants(activeSlide, 'play');
  $: if (activeSlide && !activeVariants.some((variant) => variant.id === activeVariantKey)) {
    activeVariantKey = getPrimaryVariant(activeSlide, 'play')?.id ?? '';
  }
  $: activeBlocks = activeSlide
    ? getBlocksForSlideVariant(model?.blocks ?? [], activeSlide.id, activeVariantKey)
    : [];
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

  function cycleVariant(direction: -1 | 1) {
    if (!activeVariants.length) return;
    const currentIndex = Math.max(
      activeVariants.findIndex((variant) => variant.id === activeVariantKey),
      0
    );
    const nextIndex = (currentIndex + direction + activeVariants.length) % activeVariants.length;
    activeVariantKey = activeVariants[nextIndex].id;
  }

  function isInteractiveTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (isInteractiveTarget(event.target)) return;

    const key = event.key;
    const navigationKeys = [' ', 'Spacebar', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'PageDown', 'PageUp', 'Home', 'End'];

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
      case 'ArrowUp':
        cycleVariant(-1);
        break;
      case 'ArrowDown':
        cycleVariant(1);
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
