<script lang="ts">
  import type { AiChangeProposal, AiCommand } from '$lib/types/dididecks';
  import { acceptAiCommand, createAiCommand, rejectAiCommand } from '$lib/api/dididecks';

  export let deckId = 'deck-001';

  let commandText = 'Tighten the investor hook and clarify the traction story.';
  let command: AiCommand | null = null;
  let proposal: AiChangeProposal | null = null;

  async function submitCommand() {
    const result = await createAiCommand({ deckId, command: commandText });
    command = result.command;
    proposal = result.proposal;
  }

  async function accept() {
    if (!command) return;
    const result = await acceptAiCommand(command.id);
    command = result.command;
    proposal = result.proposal;
  }

  async function reject() {
    if (!command) return;
    const result = await rejectAiCommand(command.id);
    command = result.command;
    proposal = result.proposal;
  }
</script>

<section class="panel">
  <div class="eyebrow">AI command lane</div>
  <textarea bind:value={commandText} rows="4"></textarea>
  <div class="hero-actions">
    <button class="primary-button" type="button" on:click={submitCommand}>Create proposal</button>
    {#if command?.status === 'proposed'}
      <button class="ghost-button" type="button" on:click={accept}>Accept</button>
      <button class="ghost-button" type="button" on:click={reject}>Reject</button>
    {/if}
  </div>
  {#if proposal}
    <p><strong>Proposal:</strong> {proposal.summary}</p>
  {/if}
</section>
