<script lang="ts">
  import type { RegistryEntry } from '$lib/registry/componentRegistry';

  export let title = 'Component registry';
  export let description = '';
  export let entries: RegistryEntry[] = [];
</script>

<section class="panel">
  <div class="eyebrow">Registry</div>
  <h2>{title}</h2>
  {#if description}
    <p class="muted-copy">{description}</p>
  {/if}
</section>

<section class="route-grid card-grid-3">
  {#each entries as entry}
    <article class="panel feature-card registry-entry-card">
      <div class="section-row">
        <div class="eyebrow">{entry.category}</div>
        <small>{entry.layer}</small>
      </div>
      <h3>{entry.title}</h3>
      <p>{entry.summary}</p>

      {#if entry.props?.length}
        <div class="stack-list">
          <strong>Props</strong>
          <div class="play-chrome-meta">
            {#each entry.props as prop}
              <span class="status-chip">{prop}</span>
            {/each}
          </div>
        </div>
      {/if}

      {#if entry.usedBy?.length}
        <div class="stack-list">
          <strong>Used by</strong>
          <div class="stack-list">
            {#each entry.usedBy as route}
              <small>{route}</small>
            {/each}
          </div>
        </div>
      {/if}
    </article>
  {/each}
</section>
