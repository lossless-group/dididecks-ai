<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { northStars, principles, useCases } from '$lib/data/marketing';
</script>

<PageHeader eyebrow="About" title="A reusable deck operating system for high-stakes narrative work" copy="Built for fundraising, board, LP, diligence, and client delivery workflows where portability, proof, and repeatability matter." />

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">What it is</div>
    <p class="muted-copy">
      DidiDecks is not just a deck builder. It is a reusable deck operating system where slide layouts,
      content structures, and review flows can move across projects and inherit the destination brand.
    </p>
    <p class="muted-copy">
      The system is designed for operators who need better narrative tooling without surrendering control of the final presentation runtime or the underlying proof chain.
    </p>
  </article>

  <article class="panel">
    <div class="eyebrow">North stars</div>
    <div class="stack-list">
      {#each northStars as item}
        <div class="list-card"><div><strong>{item.title}</strong><p>{item.body}</p></div></div>
      {/each}
    </div>
  </article>
</section>

<section class="card-grid-3 route-grid">
  {#each useCases as item}
    <article class="panel feature-card">
      <div class="eyebrow">Use case</div>
      <h2>{item.title}</h2>
      <p>{item.body}</p>
    </article>
  {/each}
</section>

<section class="principles-grid">
  {#each principles as item}
    <article class="panel feature-card">
      <div class="eyebrow">{item.n}</div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </article>
  {/each}
</section>
