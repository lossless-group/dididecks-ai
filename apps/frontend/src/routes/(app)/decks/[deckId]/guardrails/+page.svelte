<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import DeckGuardrailsPanel from '$lib/components/guardrails/DeckGuardrailsPanel.svelte';
  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Guardrails" title="Deck guardrails" copy="See findings, project rules, and corrective prompt guidance before delivery." />
  <DeckGuardrailsPanel findings={data.payload.findings} rules={data.payload.rules} prompts={data.payload.prompts} />
</DeckWorkspaceShell>
