<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import DeckStatusBadge from '$lib/components/deck-workspace/DeckStatusBadge.svelte';
  import { mockDecks } from '$lib/data/mockDecks';

  const workspaceStats = [
    { label: 'Active decks', value: `${mockDecks.length}` },
    { label: 'Investor-ready', value: `${mockDecks.filter((deck) => deck.status === 'investor-ready').length}` },
    { label: 'In review', value: `${mockDecks.filter((deck) => deck.status === 'in-review').length}` }
  ];
</script>

<PageHeader eyebrow="Workspace" title="Dashboard" copy="Operate the deck pipeline from one surface: active narratives, review state, and the next workflow step." />

<section class="stat-grid">
  {#each workspaceStats as stat}
    <article class="panel stat-card">
      <div class="eyebrow">{stat.label}</div>
      <strong>{stat.value}</strong>
    </article>
  {/each}
</section>

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="section-row">
      <div>
        <div class="eyebrow">Recent decks</div>
        <h2>Current operating surface</h2>
      </div>
      <a class="ghost-button" href="/decks">See all decks</a>
    </div>
    <div class="stack-list">
      {#each mockDecks as deck}
        <a class="list-card" href={`/decks/${deck.id}`}>
          <div>
            <strong>{deck.name}</strong>
            <p>{deck.summary}</p>
          </div>
          <div class="list-card-meta">
            <DeckStatusBadge status={deck.status} />
            <small>{deck.updatedAt}</small>
          </div>
        </a>
      {/each}
    </div>
  </article>

  <article class="panel">
    <div class="eyebrow">Quick actions</div>
    <h2>Move work forward</h2>
    <div class="stack-list">
      <a class="list-card" href="/decks/new"><strong>Upload a new deck</strong><p>Start from PowerPoint, PDF, or existing narrative source material.</p></a>
      <a class="list-card" href="/decks/deck-001/smart-edit"><strong>Run Smart Edit</strong><p>Preview field-aware changes before you touch versions and exports.</p></a>
      <a class="list-card" href="/decks/deck-001/rebuild"><strong>Rebuild a narrative</strong><p>Review slide impact before applying structural deck changes.</p></a>
    </div>
  </article>
</section>
