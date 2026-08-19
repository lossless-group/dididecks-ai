<script lang="ts">
  export let rows: Array<{ principal: string; accessLevel: string }> = [];
</script>

<div class="stack-list">
  {#each rows as row}
    <div class="list-card">
      <strong>{row.principal}</strong>
      <small>{row.accessLevel}</small>
    </div>
  {/each}
</div>
