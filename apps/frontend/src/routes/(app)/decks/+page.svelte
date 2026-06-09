<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import DeckStatusBadge from '$lib/components/deck-workspace/DeckStatusBadge.svelte';
  export let data: PageData;

  const deckFilters = ['All', 'Investor-ready', 'In review', 'Draft'];
</script>

<PageHeader eyebrow="Deck library" title="Decks" copy="The active product library for opening decks, moving into workflow surfaces, and monitoring review status." />

<section class="filter-row">
  {#each deckFilters as filter}
    <span class="ghost-button">{filter}</span>
  {/each}
  <a class="primary-button" href="/decks/new">New deck</a>
</section>

<section class="route-grid card-grid-3">
  {#each data.decks as deck}
    <article class="panel deck-card">
      <DeckStatusBadge status={deck.status} />
      <h2>{deck.name}</h2>
      <p>{deck.summary}</p>
      <div class="metadata-row">
        <span><strong>Owner:</strong> {deck.owner}</span>
        <span><strong>Updated:</strong> {deck.updatedAt}</span>
      </div>
      <div class="hero-actions">
        <a class="primary-button" href={`/decks/${deck.id}`}>Open deck</a>
        <a class="ghost-button" href={`/decks/${deck.id}/editor`}>Editor</a>
      </div>
    </article>
  {/each}
</section>
