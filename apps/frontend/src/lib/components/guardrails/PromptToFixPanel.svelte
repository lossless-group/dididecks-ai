<script lang="ts">
  export let prompts: string[] = [];
</script>

<div class="stack-list">
  {#each prompts as prompt}
    <div class="list-card">
      <p>{prompt}</p>
    </div>
  {/each}
</div>
