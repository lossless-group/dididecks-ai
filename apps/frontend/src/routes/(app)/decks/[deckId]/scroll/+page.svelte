<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { getBlockContentSummary, getBlockDisplayType } from '$lib/utils/dididecks';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Scroll" title="Scroll runtime" copy="A readable narrative review surface for moving through the deck vertically while keeping slide identity and order visible." />

  <section class="stack-list">
    {#each data.model.slides as slide}
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
          {#each data.model.blocks.filter((block) => block.slideId === slide.id) as block}
            <div class="runtime-block">
              <strong>{block.blockKey ?? getBlockDisplayType(block)}</strong>
              <p>{getBlockContentSummary(block)}</p>
              {#if block.dataBindingKey}
                <small>Bound to {block.dataBindingKey}</small>
              {/if}
            </div>
          {/each}
        </div>
      </article>
    {/each}
  </section>
</DeckWorkspaceShell>
