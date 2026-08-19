<script lang="ts">
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import PlayMode from '$lib/components/play/PlayMode.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Play" title="Presentation runtime" copy="Keyboard-driven deck presentation mode with viewport-aware 16:9 slide framing." />
  <PlayMode deckId={data.deckId} model={data.model} />
</DeckWorkspaceShell>
