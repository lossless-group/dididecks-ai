<script lang="ts">
  import { page } from '$app/stores';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  $: deckId = $page.params.deckId ?? 'deck-001';
</script>

<DeckWorkspaceShell {deckId}>
  <PageHeader eyebrow="Play" title="Presentation runtime" copy="Reserved for the product play experience in SvelteKit." />
</DeckWorkspaceShell>
