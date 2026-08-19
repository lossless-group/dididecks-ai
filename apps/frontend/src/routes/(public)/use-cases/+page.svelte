<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { useCases } from '$lib/data/marketing';
</script>

<PageHeader eyebrow="Use Cases" title="Where reusable deck infrastructure matters most" copy="The strongest fit is recurring, high-stakes narrative work where decks change often, proof matters, and brand context varies by audience." />

<section class="card-grid-3 route-grid">
  {#each useCases as item}
    <article class="panel feature-card">
      <h2>{item.title}</h2>
      <p>{item.body}</p>
    </article>
  {/each}
</section>

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Why these teams</div>
    <p class="muted-copy">
      Each of these use cases has the same operational problem: the narrative is important enough that
      ad hoc slide tooling creates risk, but dynamic enough that static design files collapse under change.
    </p>
  </article>
  <article class="panel">
    <div class="eyebrow">What they need</div>
    <ol class="ordered-list">
      <li>Portable slide components.</li>
      <li>Brand inheritance across client surfaces.</li>
      <li>Versioned review and rebuild flows.</li>
      <li>A live presentation runtime plus export fallback.</li>
    </ol>
  </article>
</section>
