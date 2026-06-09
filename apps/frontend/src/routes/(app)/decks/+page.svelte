<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import DeckLibraryGrid from '$lib/components/decks/DeckLibraryGrid.svelte';
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

<DeckLibraryGrid decks={data.decks} />
