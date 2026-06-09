<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Sync" title="Deck sync posture" copy="Observe whether the deck structure, source assets, and guardrail state are converging before export or share." />

  <section class="route-grid route-grid-wide">
    <article class="panel">
      <div class="eyebrow">Asset warnings</div>
      <div class="stack-list">
        {#each data.assets.warnings as warning}
          <div class="list-card"><p>{warning}</p></div>
        {/each}
      </div>
    </article>

    <article class="panel">
      <div class="eyebrow">Guardrail findings</div>
      <div class="stack-list">
        {#each data.guardrails.findings as finding}
          <div class="list-card">
            <strong>{finding.title}</strong>
            <p>{finding.note}</p>
          </div>
        {/each}
      </div>
    </article>
  </section>
</DeckWorkspaceShell>
