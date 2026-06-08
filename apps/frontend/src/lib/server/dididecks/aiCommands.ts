import type { AiChangeProposal, AiCommand, ChangeRequest } from '$lib/types/dididecks';
import { applyFieldChanges } from './changes';
import { evaluateAiChangeProposal } from './guardrails';
import { getDididecksState } from './repository';
import { createVersionSnapshot } from './versions';

function buildMockChanges(deckId: string): ChangeRequest[] {
  const field = getDididecksState().editorViews[deckId]?.persistentFields[0];
  if (!field) return [];

  return [
    {
      fieldId: field.id,
      nextValue: `${field.value} refined`,
      rationale: 'AI proposal to tighten messaging.'
    }
  ];
}

export function createAiCommandProposal(deckId: string, commandText: string): { command: AiCommand; proposal: AiChangeProposal } {
  const command: AiCommand = {
    id: `cmd-${Date.now()}`,
    deckId,
    command: commandText,
    status: 'proposed'
  };

  const proposal: AiChangeProposal = {
    id: `proposal-${Date.now()}`,
    commandId: command.id,
    deckId,
    summary: `Proposal for: ${commandText}`,
    changes: buildMockChanges(deckId)
  };

  const decision = evaluateAiChangeProposal(proposal);
  if (decision.status === 'block') {
    proposal.summary = `${proposal.summary} Blocked: ${decision.reason}`;
  }

  getDididecksState().aiCommands.unshift(command);
  getDididecksState().proposals.unshift(proposal);
  return { command, proposal };
}

export function acceptAiCommand(commandId: string) {
  const command = getDididecksState().aiCommands.find((candidate) => candidate.id === commandId) ?? null;
  const proposal = getDididecksState().proposals.find((candidate) => candidate.commandId === commandId) ?? null;

  if (command && proposal) {
    command.status = 'accepted';
    applyFieldChanges(proposal.deckId, proposal.changes);
    createVersionSnapshot(proposal.deckId, `Accepted AI proposal: ${proposal.summary}`);
  }

  return { command, proposal };
}

export function rejectAiCommand(commandId: string) {
  const command = getDididecksState().aiCommands.find((candidate) => candidate.id === commandId) ?? null;
  const proposal = getDididecksState().proposals.find((candidate) => candidate.commandId === commandId) ?? null;

  if (command) command.status = 'rejected';
  return { command, proposal };
}
