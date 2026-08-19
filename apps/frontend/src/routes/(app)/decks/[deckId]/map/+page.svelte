<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import DeckMapOverview from '$lib/components/workflows/DeckMapOverview.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Map" title="Narrative map" copy="Inspect deck structure, persistent field coverage, and where each piece of data lands across the story." />

  <DeckMapOverview
    editorView={data.editorView}
    selectedField={data.selectedField}
    affectedSlideIds={data.affectedSlideIds}
    fieldKey={data.fieldKey}
  />
</DeckWorkspaceShell>
