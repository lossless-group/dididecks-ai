import type { AiChangeProposal, GuardrailDecision } from '$lib/types/dididecks';

const SECRET_PATTERN = /(api[_-]?key|sk-[a-z0-9]{10,}|token|password)/i;
const HIGH_STAKES_PATTERN = /(guaranteed return|no downside|certain outcome)/i;

export function evaluateAiChangeProposal(proposal: AiChangeProposal): GuardrailDecision {
  const haystack = `${proposal.summary} ${proposal.changes.map((change) => change.nextValue).join(' ')}`;

  if (SECRET_PATTERN.test(haystack)) {
    return { status: 'block', reason: 'Proposal contains secret-like content.' };
  }

  if (HIGH_STAKES_PATTERN.test(haystack)) {
    return { status: 'warn', reason: 'Proposal contains high-stakes unsupported claims.' };
  }

  return { status: 'allow', reason: 'Normal copy edit proposal.' };
}
