<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import RebuildDeckPanel from '$lib/components/workflows/RebuildDeckPanel.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Rebuild" title="Full rebuild" copy="Review high-impact narrative rebuild phases before a backend-backed apply step changes the deck." />

  <RebuildDeckPanel
    editorView={data.editorView}
    selectedField={data.selectedField}
    affectedSlideIds={data.affectedSlideIds}
    affectedBlockIds={data.affectedBlockIds}
  />
</DeckWorkspaceShell>
