<script lang="ts">
  import { page } from '$app/stores';
  import { getEditorViewByDeckId } from '$lib/data/mockProduct';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  $: deckId = $page.params.deckId ?? 'deck-001';
  $: editorView = getEditorViewByDeckId(deckId);
  $: activeSlide = editorView.slides[0];
  $: activeBlocks = editorView.blocks.filter((block) => block.slideId === activeSlide?.id);
</script>

<DeckWorkspaceShell {deckId}>
  <PageHeader eyebrow="Play" title="Presentation runtime" copy="A focused 16:9 presentation surface for reviewing the active slide narrative before live use or export." />

  <section class="route-grid route-grid-wide">
    <article class="panel runtime-frame">
      <div class="section-row">
        <div>
          <div class="eyebrow">Active slide</div>
          <h2>{activeSlide.title}</h2>
        </div>
        <small>{activeBlocks.length} blocks</small>
      </div>
      <div class="runtime-canvas runtime-play">
        {#each activeBlocks as block}
          <div class="runtime-block">
            <strong>{block.type}</strong>
            <p>{block.content}</p>
          </div>
        {/each}
      </div>
    </article>

    <article class="panel">
      <div class="eyebrow">Playback queue</div>
      <div class="stack-list">
        {#each editorView.slides as slide, index}
          <div class="list-card">
            <div>
              <strong>{index + 1}. {slide.title}</strong>
              <p>{slide.note}</p>
            </div>
            <small>{slide.variants.length} variants</small>
          </div>
        {/each}
      </div>
    </article>
  </section>
</DeckWorkspaceShell>
