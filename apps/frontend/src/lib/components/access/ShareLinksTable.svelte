<script lang="ts">
  import type { DeckShareLink } from '$lib/types/dididecks';
  export let links: DeckShareLink[] = [];
</script>

<div class="stack-list">
  {#each links as link}
    <div class="list-card">
      <div>
        <strong>{link.label}</strong>
        <p>Share surface</p>
      </div>
      <small>{link.status}</small>
    </div>
  {/each}
</div>
