<script lang="ts">
  import type { AiChangeProposal, AiCommand, DeckBlock, DeckSlide, DeckSlideVariant, PersistentField } from '$lib/types/dididecks';
  import { getBlockContentSummary } from '$lib/utils/dididecks';
  import { acceptAiCommand, createAiCommand, rejectAiCommand } from '$lib/api/dididecks';

  export let deckId = 'deck-001';
  export let slide: DeckSlide | null = null;
  export let variant: DeckSlideVariant | null = null;
  export let block: DeckBlock | null = null;
  export let field: PersistentField | null = null;

  let commandText = 'Tighten the investor hook and clarify the traction story.';
  let command: AiCommand | null = null;
  let proposal: AiChangeProposal | null = null;

  function setPreset(nextCommand: string) {
    commandText = nextCommand;
  }

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
  {#if block}
    <p class="muted-copy">
      Selected block: {block.blockKey ?? block.id}
      {#if field}
        • Bound to {field.fieldKey}
      {/if}
    </p>
    <div class="hero-actions">
      <button class="ghost-button" type="button" on:click={() => setPreset(`Improve block ${block.blockKey ?? block.id} for investor clarity.`)}>Improve this block</button>
      <button class="ghost-button" type="button" on:click={() => setPreset(`Shorten the text in block ${block.blockKey ?? block.id} while keeping the current meaning.`)}>Shorten this text</button>
      <button class="ghost-button" type="button" on:click={() => setPreset(`Make block ${block.blockKey ?? block.id} investor-ready using the deck tone.`)}>Make investor-ready</button>
      <button class="ghost-button" type="button" on:click={() => setPreset(`Rewrite block ${block.blockKey ?? block.id} using the deck tone and preserving the field binding.`)}>Rewrite using deck tone</button>
    </div>
  {:else if slide}
    <p class="muted-copy">Active slide: {slide.title}{variant ? ` • ${variant.label}` : ''}</p>
    <div class="hero-actions">
      <button class="ghost-button" type="button" on:click={() => setPreset(`Improve slide ${slide.title} for stronger investor readability.`)}>Improve this slide</button>
      <button class="ghost-button" type="button" on:click={() => setPreset(`Generate a layout variant for slide ${slide.title}.`)}>Generate layout variant</button>
      <button class="ghost-button" type="button" on:click={() => setPreset(`Suggest missing investor proof on slide ${slide.title}.`)}>Suggest missing investor proof</button>
    </div>
  {/if}
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
    {#if block}
      <p class="muted-copy">Current block summary: {getBlockContentSummary(block)}</p>
    {/if}
  {/if}
</section>
