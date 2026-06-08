<script lang="ts">
  import { page } from '$app/stores';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  $: deckId = $page.params.deckId ?? 'deck-001';
</script>

<DeckWorkspaceShell {deckId}>
  <PageHeader eyebrow="Print" title="Print and export preview" copy="Reserved for print-grade output review surfaces." />
</DeckWorkspaceShell>
