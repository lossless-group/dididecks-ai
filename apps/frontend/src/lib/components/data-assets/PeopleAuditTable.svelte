<script lang="ts">
  export let people: Array<{ name: string; status: string; note: string }> = [];
</script>

<div class="stack-list">
  {#each people as person}
    <div class="list-card">
      <div>
        <strong>{person.name}</strong>
        <p>{person.note}</p>
      </div>
      <small>{person.status}</small>
    </div>
  {/each}
</div>
