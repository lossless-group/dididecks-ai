/**
 * Marketing/billing plan fixtures for public pricing surfaces.
 *
 * These values are product copy only. Real billing prices, checkout links, and
 * entitlement enforcement must remain backend-owned.
 */
import type { BillingPlan } from '$lib/types/billing';

export const mockPlans: BillingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    description: 'For founders shaping a first investor story.',
    features: ['3 active decks', 'PDF export', 'Email support']
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$99',
    description: 'For teams reviewing, rebuilding, and versioning decks every week.',
    features: ['Unlimited decks', 'Version snapshots', 'Persistent field editing']
  },
  {
    id: 'capital',
    name: 'Capital',
    price: '$249',
    description: 'For funds and advisors managing several high-stakes narratives.',
    features: ['Workspace roles', 'Share controls', 'Priority support']
  }
];
