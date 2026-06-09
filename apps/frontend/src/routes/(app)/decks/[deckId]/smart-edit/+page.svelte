<script lang="ts">
  import type { PageData } from './$types';
  import type { AiChangeProposal, AiCommand, PersistentField } from '$lib/types/dididecks';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { acceptAiCommand, createAiCommand, rejectAiCommand } from '$lib/api/dididecks';
  export let data: PageData;

  let commands: AiCommand[] = [...data.commands];
  let proposal: AiChangeProposal | null = null;
  let commandText = buildDefaultCommand(data.selectedField);
  let isSubmitting = false;
  let isResolving = false;
  let feedback = '';
  let errorMessage = '';

  const presetCommands = buildPresetCommands(data.selectedField);

  function buildDefaultCommand(field: PersistentField | null): string {
    if (!field) {
      return 'Tighten the investor story while preserving field bindings and existing deck structure.';
    }

    return `Rewrite the ${field.label} field for stronger investor clarity while preserving its current meaning and deck bindings.`;
  }

  function buildPresetCommands(field: PersistentField | null): string[] {
    if (!field) {
      return [
        'Tighten the investor hook while keeping the current narrative arc.',
        'Shorten the copy across the highest-impact persistent fields.',
        'Make the messaging more due-diligence ready without changing the claims.'
      ];
    }

    return [
      `Rewrite ${field.label} with a sharper investor tone.`,
      `Shorten ${field.label} but preserve all factual meaning.`,
      `Make ${field.label} more due-diligence ready and easier to scan.`
    ];
  }

  function getFieldLabel(fieldId: string): string {
    return data.editorView.persistentFields.find((field) => field.id === fieldId)?.label ?? fieldId;
  }

  function getAffectedSlidesForField(fieldId: string): string[] {
    const field = data.editorView.persistentFields.find((candidate) => candidate.id === fieldId) ?? null;
    const usages = field ? data.editorView.fieldUsages.filter((usage) => usage.fieldId === field.id || usage.persistentFieldId === field.id || usage.fieldKey === field.fieldKey) : [];
    return Array.from(
      new Set(
        usages.flatMap((usage) => (usage.usedInSlideIds.length ? usage.usedInSlideIds : usage.slideId ? [usage.slideId] : []))
      )
    );
  }

  function setPreset(nextCommand: string) {
    commandText = nextCommand;
    feedback = '';
    errorMessage = '';
  }

  async function submitCommand() {
    if (!commandText.trim()) {
      errorMessage = 'Enter a smart-edit instruction first.';
      return;
    }

    isSubmitting = true;
    feedback = '';
    errorMessage = '';

    try {
      const result = await createAiCommand({ deckId: data.deckId, command: commandText.trim() });
      proposal = result.proposal;
      commands = [result.command, ...commands];
      feedback = 'Proposal created. Review the suggested changes before accepting.';
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Failed to create proposal.';
    } finally {
      isSubmitting = false;
    }
  }

  async function resolveCommand(commandId: string, resolution: 'accept' | 'reject') {
    isResolving = true;
    feedback = '';
    errorMessage = '';

    try {
      const result = resolution === 'accept' ? await acceptAiCommand(commandId) : await rejectAiCommand(commandId);
      const updatedCommand = result.command;

      if (updatedCommand) {
        commands = commands.map((command) => (command.id === updatedCommand.id ? updatedCommand : command));
      }

      if (proposal?.commandId === commandId) {
        proposal = result.proposal;
      }

      feedback =
        resolution === 'accept'
          ? 'Proposal accepted. Deck-backed field values were updated.'
          : 'Proposal rejected. The deck state was left unchanged.';
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : `Failed to ${resolution} proposal.`;
    } finally {
      isResolving = false;
    }
  }
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Smart edit" title="AI-guided changes" copy="This route collects commands; execution remains backend-owned." />

  <section class="panel">
    <div class="eyebrow">Command composer</div>
    <p class="muted-copy">
      Smart Edit drafts controlled field changes, routes them through the repo-local proposal API, and only mutates the deck after explicit acceptance.
    </p>

    <div class="hero-actions">
      {#each presetCommands as preset}
        <button class="ghost-button" type="button" on:click={() => setPreset(preset)}>{preset}</button>
      {/each}
    </div>

    <textarea bind:value={commandText} rows="5" placeholder="Describe the edit you want the AI lane to propose."></textarea>

    <div class="hero-actions">
      <button class="primary-button" type="button" disabled={isSubmitting || isResolving} on:click={submitCommand}>
        {isSubmitting ? 'Creating proposal…' : 'Create proposal'}
      </button>
      <a class="ghost-button" href={`/decks/${data.deckId}/editor`}>Return to editor</a>
    </div>

    {#if feedback}
      <p class="muted-copy">{feedback}</p>
    {/if}

    {#if errorMessage}
      <p class="smart-edit-error">{errorMessage}</p>
    {/if}
  </section>

  {#if data.selectedField}
    <section class="panel">
      <div class="eyebrow">Selected field context</div>
      <h2>{data.selectedField.fieldLabel ?? data.selectedField.label}</h2>
      <p class="muted-copy">
        {data.selectedField.fieldKey} • {data.selectedField.fieldGroup ?? data.selectedField.category} • {data.selectedField.fieldType ?? 'text'}
      </p>
      <p><strong>Current value:</strong> {data.selectedField.value}</p>
      <p><strong>Field usages:</strong> {data.selectedFieldUsages.length} • {data.affectedSlideIds.length} slides • {data.affectedBlockIds.length} blocks</p>
      {#if data.sourceSlideId && data.sourceBlockId}
        <p class="muted-copy">Opened from block {data.sourceBlockId} on slide {data.sourceSlideId}.</p>
      {/if}
    </section>
  {/if}

  {#if proposal}
    <section class="panel">
      <div class="eyebrow">Current proposal</div>
      <h2>{proposal.summary}</h2>
      <div class="stack-list">
        {#each proposal.changes as change}
          <div class="list-card">
            <div>
              <strong>{getFieldLabel(change.fieldId)}</strong>
              <p>{change.rationale ?? 'AI-generated field update.'}</p>
            </div>
            <small>
              <strong>Next:</strong> {change.nextValue}
              <br />
              <strong>Affected slides:</strong> {getAffectedSlidesForField(change.fieldId).join(', ') || 'none'}
            </small>
          </div>
        {/each}
      </div>

      <div class="hero-actions">
        <button
          class="primary-button"
          type="button"
          disabled={isResolving}
          on:click={() => proposal && resolveCommand(proposal.commandId, 'accept')}
        >
          {isResolving ? 'Resolving…' : 'Accept proposal'}
        </button>
        <button
          class="ghost-button"
          type="button"
          disabled={isResolving}
          on:click={() => proposal && resolveCommand(proposal.commandId, 'reject')}
        >
          Reject proposal
        </button>
      </div>
    </section>
  {/if}

  <section class="route-grid route-grid-wide">
    <article class="panel">
      <div class="eyebrow">Queued commands</div>
      <div class="stack-list">
        {#each commands as command}
          <div class="list-card">
            <div>
              <strong>{command.command}</strong>
              <p>Command status: {command.status}</p>
            </div>
            <div class="hero-actions">
              {#if command.status === 'proposed'}
                <button
                  class="ghost-button"
                  type="button"
                  disabled={isResolving}
                  on:click={() => resolveCommand(command.id, 'accept')}
                >
                  Accept
                </button>
                <button
                  class="ghost-button"
                  type="button"
                  disabled={isResolving}
                  on:click={() => resolveCommand(command.id, 'reject')}
                >
                  Reject
                </button>
              {/if}
              <a class="ghost-button" href={`/decks/${data.deckId}/editor`}>Inspect deck</a>
            </div>
          </div>
        {/each}
      </div>
    </article>

    <article class="panel">
      <div class="eyebrow">Fields most likely to change</div>
      <div class="stack-list">
        {#each data.editorView.persistentFields as field}
          <div class="list-card">
            <div>
              <strong>{field.label}</strong>
              <p>{field.fieldGroup ?? field.category}</p>
            </div>
            <small>{field.value}{field.fieldKey === data.fieldKey ? ' • selected' : ''}</small>
          </div>
        {/each}
      </div>
    </article>
  </section>

  {#if data.selectedField}
    <section class="panel">
      <div class="eyebrow">Affected surfaces</div>
      <div class="stack-list">
        {#each data.selectedFieldUsages as usage}
          <div class="list-card">
            <div>
              <strong>{usage.fieldKey ?? data.selectedField.fieldKey}</strong>
              <p>Usage type: {usage.usageType ?? 'text_render'}</p>
            </div>
            <small>Slides {usage.usedInSlideIds.join(', ') || usage.slideId} • Blocks {usage.usedInBlockIds.join(', ') || usage.blockId}</small>
          </div>
        {/each}
      </div>
    </section>
  {/if}
</DeckWorkspaceShell>

<style>
  textarea {
    width: 100%;
    min-height: 8rem;
  }

  .smart-edit-error {
    color: var(--dd-danger);
  }
</style>
