<script lang="ts">
  export let items: Array<{ label: string; active?: boolean; href?: string }> = [];
</script>

<div class="filter-row">
  {#each items as item}
    {#if item.href}
      <a class:item-active={item.active} class="ghost-button" href={item.href}>{item.label}</a>
    {:else}
      <span class:item-active={item.active} class="ghost-button">{item.label}</span>
    {/if}
  {/each}
</div>
