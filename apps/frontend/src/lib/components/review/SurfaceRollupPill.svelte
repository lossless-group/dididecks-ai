<script lang="ts">
  export let statuses: string[] = [];
</script>

<div class="surface-rollup-pill">
  {#each statuses as status}
    <span class={`status-chip review-status-${status}`}>{status}</span>
  {/each}
</div>
