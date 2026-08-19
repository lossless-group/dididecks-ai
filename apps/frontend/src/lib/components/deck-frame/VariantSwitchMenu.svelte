<script lang="ts">
  export let variants: Array<{ label: string; href?: string }> = [];
</script>

<div class="hero-actions">
  {#each variants as variant}
    {#if variant.href}
      <a class="ghost-button" href={variant.href}>{variant.label}</a>
    {:else}
      <span class="ghost-button">{variant.label}</span>
    {/if}
  {/each}
</div>
