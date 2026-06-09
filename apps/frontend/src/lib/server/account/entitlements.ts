/**
 * Repo-local subscription entitlement helpers.
 *
 * These checks are display and MVP gating rules only. They should later be
 * backed by real billing state and durable usage tracking.
 */
import type { CustomerSubscription } from '$lib/types/account';

export function canCreateDeck(subscription: CustomerSubscription): boolean {
  return subscription.limits.maxDecks > 0;
}

export function canRunAiCommand(subscription: CustomerSubscription): boolean {
  return subscription.limits.maxAiCommands > 0;
}

export function canExport(subscription: CustomerSubscription): boolean {
  return subscription.limits.maxExports > 0;
}

export function canUseManagedProvider(subscription: CustomerSubscription): boolean {
  return subscription.planKey !== 'free';
}
