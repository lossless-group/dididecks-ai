<script lang="ts">
  import { page } from '$app/stores';
  import { getEditorViewByDeckId } from '$lib/data/mockProduct';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  $: deckId = $page.params.deckId ?? 'deck-001';
  $: editorView = getEditorViewByDeckId(deckId);
</script>

<DeckWorkspaceShell {deckId}>
  <PageHeader eyebrow="Scroll" title="Scroll runtime" copy="A readable narrative review surface for moving through the deck vertically while keeping slide identity and order visible." />

  <section class="stack-list">
    {#each editorView.slides as slide}
      <article class="panel runtime-scroll-card">
        <div class="section-row">
          <div>
            <div class="eyebrow">Slide</div>
            <h2>{slide.title}</h2>
          </div>
          <small>{slide.variants.length} variants</small>
        </div>
        <p class="muted-copy">{slide.note}</p>
        <div class="stack-list">
          {#each editorView.blocks.filter((block) => block.slideId === slide.id) as block}
            <div class="runtime-block">
              <strong>{block.type}</strong>
              <p>{block.content}</p>
            </div>
          {/each}
        </div>
      </article>
    {/each}
  </section>
</DeckWorkspaceShell>
