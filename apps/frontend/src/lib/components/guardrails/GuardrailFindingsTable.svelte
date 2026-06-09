<script lang="ts">
  export let findings: Array<{ title: string; severity: string; note: string }> = [];
</script>

<div class="stack-list">
  {#each findings as finding}
    <div class="list-card">
      <div>
        <strong>{finding.title}</strong>
        <p>{finding.note}</p>
      </div>
      <small>{finding.severity}</small>
    </div>
  {/each}
</div>
