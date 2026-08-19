<script lang="ts">
  import type { DeckAccessEntry } from '$lib/types/dididecks';
  export let entries: DeckAccessEntry[] = [];
</script>

<div class="stack-list">
  {#each entries as entry}
    <div class="list-card">
      <div>
        <strong>{entry.principal}</strong>
        <p>Member</p>
      </div>
      <small>{entry.accessLevel}</small>
    </div>
  {/each}
</div>
