<script lang="ts">
  import { page } from '$app/stores';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  const rows = [
    { route: 'GET /api/products/dididecks/decks/{deckId}', state: 'wired', note: 'Deck shell and overview surface' },
    { route: 'GET /api/products/dididecks/decks/{deckId}/review-matrix', state: 'wired', note: 'Review matrix surface' },
    { route: 'GET /api/products/dididecks/decks/{deckId}/guardrails', state: 'wired', note: 'Guardrail workspace' },
    { route: 'GET /api/products/dididecks/decks/{deckId}/data-assets', state: 'wired', note: 'Asset audit workspace' },
    { route: 'POST /api/products/dididecks/decks/{deckId}/changes/apply', state: 'compat', note: 'Fallback state for now, durable boundary later' }
  ];
</script>

<DeckWorkspaceShell deckId={$page.params.deckId}>
  <PageHeader eyebrow="API" title="Backend contract status" copy="Observe which product endpoints the current frontend shell depends on and which ones are still compatibility-backed rather than fully persistent." />

  <section class="panel">
    <div class="stack-list">
      {#each rows as row}
        <div class="list-card">
          <div>
            <strong>{row.route}</strong>
            <p>{row.note}</p>
          </div>
          <small>{row.state}</small>
        </div>
      {/each}
    </div>
  </section>
</DeckWorkspaceShell>
