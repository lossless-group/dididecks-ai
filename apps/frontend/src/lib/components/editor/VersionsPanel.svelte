<script lang="ts">
  import type { DeckVersion } from '$lib/types/dididecks';

  export let versions: DeckVersion[] = [];
</script>

<section class="panel">
  <div class="section-row">
    <div>
      <div class="eyebrow">Versions</div>
      <h2>Audit trail</h2>
    </div>
    <small>{versions.length} snapshots</small>
  </div>

  <div class="stack-list">
    {#if versions.length}
      {#each versions as version}
        <div class="list-card">
          <div>
            <strong>{version.label}</strong>
            <p>{version.summary}</p>
          </div>
          <small>{version.createdAt}</small>
        </div>
      {/each}
    {:else}
      <div class="list-card">
        <div>
          <strong>No versions yet</strong>
          <p>The backend snapshot workflow has not created an accepted version yet.</p>
        </div>
      </div>
    {/if}
  </div>
</section>
