<script lang="ts">
  export let companies: Array<{ name: string; status: string; note: string }> = [];
</script>

<div class="stack-list">
  {#each companies as company}
    <div class="list-card">
      <div>
        <strong>{company.name}</strong>
        <p>{company.note}</p>
      </div>
      <small>{company.status}</small>
    </div>
  {/each}
</div>
