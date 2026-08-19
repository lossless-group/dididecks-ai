<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import DeckTOC from '$lib/components/viewer/DeckTOC.svelte';
  import SlideSlotList from '$lib/components/viewer/SlideSlotList.svelte';

  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="TOC" title="Deck table of contents" copy="Review the slide order, slot coverage, and direct entry points into scroll and play without leaving the active deck workspace." />

  <section class="route-grid route-grid-wide">
    <article class="panel">
      <div class="eyebrow">Deck navigation</div>
      <DeckTOC slides={data.model.slides} deckId={data.deckId} />
    </article>

    <article class="panel">
      <div class="eyebrow">Slide slots</div>
      <SlideSlotList slides={data.model.slides} />
      <div class="hero-actions">
        <a class="ghost-button" href={`/decks/${data.deckId}/scroll`}>Open Scroll</a>
        <a class="ghost-button" href={`/decks/${data.deckId}/play`}>Open Play</a>
        <a class="ghost-button" href={`/decks/${data.deckId}/map`}>Open Deck Map</a>
      </div>
    </article>
  </section>
</DeckWorkspaceShell>
