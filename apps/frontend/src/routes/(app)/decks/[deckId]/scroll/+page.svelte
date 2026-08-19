<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import ScrollDeckViewer from '$lib/components/viewer/ScrollDeckViewer.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Scroll" title="Scroll runtime" copy="A readable narrative review surface for moving through the deck vertically while keeping slide identity and order visible." />
  <ScrollDeckViewer deckId={data.deckId} model={data.model} />
</DeckWorkspaceShell>
