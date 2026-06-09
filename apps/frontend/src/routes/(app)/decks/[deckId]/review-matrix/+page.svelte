<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import DeckReviewMatrix from '$lib/components/review/DeckReviewMatrix.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Review" title="Review matrix" copy="Per-slide scoring and readiness surface shell." />

  <DeckReviewMatrix items={data.matrix} />
</DeckWorkspaceShell>
