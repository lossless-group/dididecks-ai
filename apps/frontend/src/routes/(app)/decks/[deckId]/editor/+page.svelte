<script lang="ts">
  import type { PageData } from './$types';
  import DeckEditorShell from '$lib/components/editor/DeckEditorShell.svelte';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Editor" title="Deck editor" copy="Structured slide, block, comment, version, and export workflow for the active deck." />
  <DeckEditorShell model={data.model} comments={data.comments} versions={data.versions} exportsList={data.exportsList} />
</DeckWorkspaceShell>
