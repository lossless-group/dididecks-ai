<script lang="ts">
  import { page } from '$app/stores';
  import DeckEditorShell from '$lib/components/editor/DeckEditorShell.svelte';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import {
    getCommentsByDeckId,
    getEditorViewByDeckId,
    getExportsByDeckId,
    getVersionsByDeckId
  } from '$lib/data/mockProduct';

  $: deckId = $page.params.deckId ?? 'deck-001';
  $: model = getEditorViewByDeckId(deckId);
  $: comments = getCommentsByDeckId(deckId);
  $: versions = getVersionsByDeckId(deckId);
  $: exportsList = getExportsByDeckId(deckId);
</script>

<DeckWorkspaceShell {deckId}>
  <PageHeader eyebrow="Editor" title="Deck editor" copy="Structured slide, block, comment, version, and export workflow for the active deck." />
  <DeckEditorShell {model} {comments} {versions} {exportsList} />
</DeckWorkspaceShell>
