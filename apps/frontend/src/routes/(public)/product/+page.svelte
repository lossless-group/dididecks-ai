<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { northStars, principles } from '$lib/data/marketing';
</script>

<svelte:head><title>Product | DidiDecks</title></svelte:head>
<PageHeader eyebrow="Product" title="A deck operating system, not a single-deck tool" copy="The product boundary is built around ingest, structured editing, live play, white-label publish, and export-ready continuity." />

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">System position</div>
    <p class="muted-copy">
      DidiDecks sits between raw source material and the final presentation moment. It treats deck work
      as reusable infrastructure instead of a one-off design exercise.
    </p>
    <p class="muted-copy">
      That means structured fields, component portability, AI-assisted rebuilds, and a runtime good enough
      that presenting live from the deck is the default instead of a compromise.
    </p>
  </article>
  <article class="panel">
    <div class="eyebrow">Hard targets</div>
    <div class="stack-list">
      {#each northStars as item}
        <div class="list-card"><div><strong>{item.title}</strong><p>{item.body}</p></div></div>
      {/each}
    </div>
  </article>
</section>

<section class="principles-grid">
  {#each principles.slice(0, 6) as item}
    <article class="panel feature-card">
      <div class="eyebrow">{item.n}</div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </article>
  {/each}
</section>
