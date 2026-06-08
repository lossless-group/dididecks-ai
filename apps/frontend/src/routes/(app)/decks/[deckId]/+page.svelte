<script lang="ts">
  import { page } from '$app/stores';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import DeckStatusBadge from '$lib/components/deck-workspace/DeckStatusBadge.svelte';
  import { getDeckById, getEditorViewByDeckId } from '$lib/data/mockProduct';

  $: deckId = $page.params.deckId ?? 'deck-001';
  $: deck = getDeckById(deckId);
  $: editorView = getEditorViewByDeckId(deckId);
  $: deckStats = [
    { label: 'Slides', value: `${editorView.slides.length}` },
    { label: 'Blocks', value: `${editorView.blocks.length}` },
    { label: 'Persistent fields', value: `${editorView.persistentFields.length}` }
  ];
</script>

<DeckWorkspaceShell {deckId}>
  <PageHeader eyebrow="Deck overview" title={deck.name} copy={deck.summary} />

  <section class="panel overview-card">
    <div class="section-row">
      <div>
        <div class="eyebrow">Status</div>
        <h2>Current narrative state</h2>
      </div>
      <DeckStatusBadge status={deck.status} />
    </div>
    <div class="metadata-row">
      <span><strong>Owner:</strong> {deck.owner}</span>
      <span><strong>Updated:</strong> {deck.updatedAt}</span>
    </div>
  </section>

  <section class="stat-grid">
    {#each deckStats as stat}
      <article class="panel stat-card">
        <div class="eyebrow">{stat.label}</div>
        <strong>{stat.value}</strong>
      </article>
    {/each}
  </section>

  <section class="route-grid route-grid-wide">
    <article class="panel">
      <div class="eyebrow">Next actions</div>
      <div class="stack-list">
        <a class="list-card" href={`/decks/${deckId}/editor`}><strong>Open editor</strong><p>Refine blocks, bound fields, and slide variants.</p></a>
        <a class="list-card" href={`/decks/${deckId}/map`}><strong>Review narrative map</strong><p>Inspect structure, variants, and persistent field coverage.</p></a>
        <a class="list-card" href={`/decks/${deckId}/smart-edit`}><strong>Queue Smart Edit</strong><p>Preview changes before touching deck versions.</p></a>
      </div>
    </article>

    <article class="panel">
      <div class="eyebrow">Deck summary</div>
      <div class="stack-list">
        {#each editorView.slides as slide}
          <div class="list-card">
            <div>
              <strong>{slide.title}</strong>
              <p>{slide.note}</p>
            </div>
          </div>
        {/each}
      </div>
    </article>
  </section>
</DeckWorkspaceShell>
