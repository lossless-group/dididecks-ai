<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import DeckControlRoom from '$lib/components/decks/DeckControlRoom.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Deck overview" title={data.deck.name} copy={data.deck.summary} />
  <DeckControlRoom deck={data.deck} deckId={data.deckId} editorView={data.editorView} />
</DeckWorkspaceShell>
