/**
 * Local MVP AI proposal flow.
 *
 * AI commands create proposals only. A proposal does not mutate a deck until
 * it is explicitly accepted and survives the local heuristic guardrail check.
 */
import type { AiChangeProposal, AiCommand, ChangeRequest } from '$lib/types/dididecks';
import { canRunAiCommand } from '$lib/server/account/entitlements';
import { getCurrentAccountViewModel, getDeckOwnership as getDeckOwnershipRecord, getCurrentUserMock } from '$lib/server/account/service';
import { applyFieldChanges } from './changes';
import { evaluateAiChangeProposal } from './guardrails';
import { getDididecksState } from './repository';

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
  const account = getCurrentAccountViewModel();
  const currentUser = getCurrentUserMock();
  if (!getDeckOwnershipRecord(deckId, currentUser.id)) {
    throw new Error('No deck access for current user');
  }
  if (!canRunAiCommand(account.subscription)) {
    throw new Error('AI command limit reached for current subscription');
  }

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
  }

  return { command, proposal };
}

export function rejectAiCommand(commandId: string) {
  const command = getDididecksState().aiCommands.find((candidate) => candidate.id === commandId) ?? null;
  const proposal = getDididecksState().proposals.find((candidate) => candidate.commandId === commandId) ?? null;

  if (command) command.status = 'rejected';
  return { command, proposal };
}
