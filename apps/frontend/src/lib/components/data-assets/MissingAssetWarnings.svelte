<script lang="ts">
  export let warnings: string[] = [];
</script>

<div class="stack-list">
  {#each warnings as warning}
    <div class="list-card">
      <strong>{warning}</strong>
    </div>
  {/each}
</div>
