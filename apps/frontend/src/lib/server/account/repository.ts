/**
 * Repo-local account repository.
 *
 * This server-only module holds mock users, workspaces, subscriptions, deck
 * ownership, session records, provider connections, and connection events in
 * memory. It is shaped like a future database repository, but it is not real
 * persistence.
 */
import {
  mockAuthSessions,
  mockConnectionEvents,
  mockCurrentUserId,
  mockCustomerAccounts,
  mockDeckOwnership,
  mockMemberships,
  mockProviderConnections,
  mockSubscriptions,
  mockUsers,
  mockWorkspaces
} from '$lib/data/mockAccounts';
import type { AccountState } from './types';

const state: AccountState = {
  users: JSON.parse(JSON.stringify(mockUsers)),
  customerAccounts: JSON.parse(JSON.stringify(mockCustomerAccounts)),
  workspaces: JSON.parse(JSON.stringify(mockWorkspaces)),
  memberships: JSON.parse(JSON.stringify(mockMemberships)),
  subscriptions: JSON.parse(JSON.stringify(mockSubscriptions)),
  deckOwnership: JSON.parse(JSON.stringify(mockDeckOwnership)),
  authSessions: JSON.parse(JSON.stringify(mockAuthSessions)),
  providerConnections: JSON.parse(JSON.stringify(mockProviderConnections)),
  connectionEvents: JSON.parse(JSON.stringify(mockConnectionEvents)),
  currentUserId: mockCurrentUserId
};

export function getAccountState(): AccountState {
  return state;
}
