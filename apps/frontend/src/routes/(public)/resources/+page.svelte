<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { resourceCards, siblingSpecs } from '$lib/data/marketing';
</script>

<PageHeader eyebrow="Resources" title="Specs, guides, and continuity references" copy="The repo already carries the conceptual contract for the product. This route surfaces that material inside the Svelte public marketing shell." />

<section class="card-grid-3 route-grid">
  {#each resourceCards as item}
    <a class="panel feature-card" href={item.href}>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </a>
  {/each}
</section>

<section class="spec-grid">
  {#each siblingSpecs as item}
    <article class="panel feature-card">
      <div class="eyebrow">{item.tag}</div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </article>
  {/each}
</section>
