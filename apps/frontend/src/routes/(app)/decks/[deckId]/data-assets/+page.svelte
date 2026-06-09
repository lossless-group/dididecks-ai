<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import DataAssetsLayout from '$lib/components/data-assets/DataAssetsLayout.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Data assets" title="Registry and source assets" copy="Inspect the company and people asset layer that supports deck accuracy and portability." />
  <DataAssetsLayout warnings={data.payload.warnings} companies={data.payload.companies} people={data.payload.people} />
</DeckWorkspaceShell>
