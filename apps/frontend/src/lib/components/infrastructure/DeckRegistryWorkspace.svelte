<script lang="ts">
  export let title = 'Registry workspace';
  export let items: Array<{ title: string; body: string }> = [];
</script>

<section class="panel">
  <div class="eyebrow">Registry</div>
  <h2>{title}</h2>
</section>

<section class="route-grid card-grid-3">
  {#each items as item}
    <article class="panel feature-card">
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </article>
  {/each}
</section>
