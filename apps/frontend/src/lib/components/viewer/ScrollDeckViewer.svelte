<script lang="ts">
  import type { DeckEditorViewModel } from '$lib/types/dididecks';
  import { onMount } from 'svelte';
  import VariantCyclePill from '$lib/components/play/VariantCyclePill.svelte';
  import ActiveSlideObserver from './ActiveSlideObserver.svelte';
  import ContentFit from './ContentFit.svelte';
  import DeckTOC from './DeckTOC.svelte';
  import {
    buildCanvasBlockStyle,
    getBlockContentSummary,
    getBlocksForSlideVariant,
    getPrimaryVariant,
    getSurfaceVariants
  } from '$lib/utils/dididecks';

  export let deckId = '';
  export let model: DeckEditorViewModel;

  let activeSlideIndex = 0;
  let activeVariantBySlide: Record<string, string> = {};

  $: slides = model.slides;
  $: activeSlide = slides[activeSlideIndex] ?? null;
  $: activeSlideTitle = activeSlide?.title ?? '';

  $: {
    const nextMap = { ...activeVariantBySlide };
    let changed = false;
    for (const slide of slides) {
      const variants = getSurfaceVariants(slide, 'scroll');
      if (!nextMap[slide.id]) {
        nextMap[slide.id] = (variants[0] ?? getPrimaryVariant(slide, 'scroll'))?.id ?? '';
        changed = true;
      }
    }
    if (changed) {
      activeVariantBySlide = nextMap;
    }
  }

  function setActiveSlide(index: number) {
    activeSlideIndex = Math.min(Math.max(index, 0), Math.max(slides.length - 1, 0));
    const slide = slides[activeSlideIndex];
    if (slide) {
      document.getElementById(`scroll-slide-${slide.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function selectVariant(slideId: string, variantId: string) {
    activeVariantBySlide = { ...activeVariantBySlide, [slideId]: variantId };
  }

  function cycleActiveSlideVariant(direction: -1 | 1) {
    if (!activeSlide) return;
    const variants = getSurfaceVariants(activeSlide, 'scroll');
    if (!variants.length) return;
    const currentVariantId = activeVariantBySlide[activeSlide.id];
    const currentIndex = Math.max(
      variants.findIndex((variant) => variant.id === currentVariantId),
      0
    );
    const nextIndex = (currentIndex + direction + variants.length) % variants.length;
    selectVariant(activeSlide.id, variants[nextIndex].id);
  }

  function isInteractiveTarget(target: EventTarget | null): boolean {
    return target instanceof HTMLElement && (target.tagName === 'BUTTON' || target.tagName === 'A');
  }

  function handleKeydown(event: KeyboardEvent) {
    if (isInteractiveTarget(event.target)) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveSlide(activeSlideIndex + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveSlide(activeSlideIndex - 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        cycleActiveSlideVariant(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        cycleActiveSlideVariant(1);
        break;
    }
  }

  onMount(() => {
    if (slides.length) {
      setActiveSlide(0);
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<section class="route-grid route-grid-wide">
  <DeckTOC slides={slides} deckId={deckId || model.deck.id} activeSlideId={activeSlide?.id ?? ''} />
  <article class="panel">
    <ActiveSlideObserver activeSlide={activeSlideTitle} />
    <div class="runtime-scroll-head">
      <div class="eyebrow">Scroll mode</div>
      <p class="muted-copy">Up/down moves through slides. Left/right cycles the active slide variant without changing slide identity.</p>
    </div>

    <section class="stack-list">
      {#each slides as slide, index}
        {@const activeVariantId = activeVariantBySlide[slide.id]}
        {@const activeVariant = getSurfaceVariants(slide, 'scroll').find((variant) => variant.id === activeVariantId) ?? getPrimaryVariant(slide, 'scroll')}
        {@const slideBlocks = getBlocksForSlideVariant(model.blocks, slide.id, activeVariant?.id)}
        <article
          id={`scroll-slide-${slide.id}`}
          class="panel runtime-scroll-card"
          class:item-active={index === activeSlideIndex}
        >
          <div class="section-row">
            <div>
              <div class="eyebrow">Slide {slide.slideNumber ?? index + 1}</div>
              <h2>{slide.title}</h2>
            </div>
            <small>{slide.slideType ?? 'slide'} · {slide.status ?? 'draft'}</small>
          </div>

          <p class="muted-copy">{slide.note}</p>
          <VariantCyclePill
            variants={getSurfaceVariants(slide, 'scroll')}
            activeVariantKey={activeVariant?.id ?? ''}
            onSelectVariant={(variantId) => selectVariant(slide.id, variantId)}
          />

          <ContentFit maxWidth="100%" maxHeight="480px" align="start" padding="0">
            <div class="scroll-slide-canvas">
              {#each slideBlocks as block}
                <div
                  class="play-canvas-block scroll-canvas-block"
                  style={buildCanvasBlockStyle(block)}
                >
                  <small>{block.blockKey ?? block.type}</small>
                  <strong>{getBlockContentSummary(block)}</strong>
                  {#if block.dataBindingKey}
                    <em>{block.dataBindingKey}</em>
                  {/if}
                </div>
              {/each}
            </div>
          </ContentFit>
        </article>
      {/each}
    </section>
  </article>
</section>
