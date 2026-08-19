<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import DeckAccessPanel from '$lib/components/access/DeckAccessPanel.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Access" title="Permissions and share surfaces" copy="Manage workspace members, share links, and access posture for the active deck." />

  <DeckAccessPanel entries={data.accessEntries} shareLinks={data.shareLinks} />
</DeckWorkspaceShell>
