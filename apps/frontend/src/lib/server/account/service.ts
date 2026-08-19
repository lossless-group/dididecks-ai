/**
 * Repo-local account service layer.
 *
 * This server-only module composes account repository data into the current
 * user/account/workspace view model used by the MVP. It also records safe
 * connection events and never stores raw cookies or raw provider secrets.
 */
import type {
  ConnectionEvent,
  CustomerAccount,
  CustomerSubscription,
  DeckOwnership,
  ProviderKind,
  ProviderScope,
  ProviderStatus,
  Membership,
  ProviderConnection,
  UserAccount,
  UserAccountViewModel,
  Workspace
} from '$lib/types/account';
import { getAccountState } from './repository';

export function getCurrentUserMock(): UserAccount {
  return getAccountState().users.find((user) => user.id === getAccountState().currentUserId) ?? getAccountState().users[0];
}

export function listUserMemberships(userId: string): Membership[] {
  return getAccountState().memberships.filter((membership) => membership.userId === userId);
}

export function listUserWorkspaces(userId: string): Workspace[] {
  const workspaceIds = listUserMemberships(userId).map((membership) => membership.workspaceId);
  return getAccountState().workspaces.filter((workspace) => workspaceIds.includes(workspace.id));
}

export function getWorkspace(workspaceId: string): Workspace | null {
  return getAccountState().workspaces.find((workspace) => workspace.id === workspaceId) ?? null;
}

export function getCustomerAccount(customerAccountId: string): CustomerAccount | null {
  return getAccountState().customerAccounts.find((account) => account.id === customerAccountId) ?? null;
}

export function getSubscription(customerAccountId: string): CustomerSubscription | null {
  return getAccountState().subscriptions.find((subscription) => subscription.customerAccountId === customerAccountId) ?? null;
}

export function listProviderConnections(customerAccountId: string): ProviderConnection[] {
  return getAccountState().providerConnections.filter((connection) => connection.customerAccountId === customerAccountId);
}

export function listConnectionEvents(customerAccountId: string): ConnectionEvent[] {
  return getAccountState().connectionEvents.filter((event) => event.customerAccountId === customerAccountId);
}

export function createConnectionEvent(payload: Omit<ConnectionEvent, 'id' | 'createdAt'>): ConnectionEvent {
  const event: ConnectionEvent = {
    id: `event-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...payload
  };

  getAccountState().connectionEvents.unshift(event);
  return event;
}

export function createProviderConnection(payload: {
  customerAccountId: string;
  workspaceId?: string;
  provider: ProviderKind;
  scope: ProviderScope;
  status?: ProviderStatus;
  defaultModel?: string;
  keyLastFour?: string;
}): ProviderConnection {
  const connection: ProviderConnection = {
    id: `provider-connection-${Date.now()}`,
    customerAccountId: payload.customerAccountId,
    workspaceId: payload.workspaceId,
    provider: payload.provider,
    scope: payload.scope,
    status: payload.status ?? 'configured',
    keyLastFour: payload.keyLastFour,
    defaultModel: payload.defaultModel,
    lastTestedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  getAccountState().providerConnections.unshift(connection);
  createConnectionEvent({
    userId: getCurrentUserMock().id,
    customerAccountId: payload.customerAccountId,
    workspaceId: payload.workspaceId,
    eventType: 'provider_connected',
    metadata: { provider: payload.provider, scope: payload.scope }
  });
  return connection;
}

export function getDeckOwnership(deckId: string, userId: string): DeckOwnership | null {
  const memberships = listUserMemberships(userId);
  const workspaceIds = memberships.map((membership) => membership.workspaceId);

  return (
    getAccountState().deckOwnership.find(
      (ownership) => ownership.deckId === deckId && (ownership.ownerUserId === userId || workspaceIds.includes(ownership.workspaceId))
    ) ?? null
  );
}

export function getCurrentAccountViewModel(): UserAccountViewModel {
  return getUserAccountViewModel(getCurrentUserMock().id);
}

export function getUserAccountViewModel(userId: string): UserAccountViewModel {
  const user = getAccountState().users.find((candidate) => candidate.id === userId) ?? getCurrentUserMock();
  const memberships = listUserMemberships(user.id);
  const activeMembership = memberships.find((membership) => membership.status === 'active') ?? memberships[0];
  const activeWorkspace = getWorkspace(activeMembership?.workspaceId ?? getAccountState().workspaces[0].id) ?? getAccountState().workspaces[0];
  const customerAccount =
    getCustomerAccount(activeWorkspace.customerAccountId) ??
    getAccountState().customerAccounts.find((account) => account.primaryUserId === user.id) ??
    getAccountState().customerAccounts[0];
  const subscription = getSubscription(customerAccount.id) ?? getAccountState().subscriptions[0];
  const providerConnections = listProviderConnections(customerAccount.id);
  const activeSession =
    getAccountState().authSessions.find((session) => session.userId === user.id && session.status === 'active') ?? null;
  const deckCount = getAccountState().deckOwnership.filter((ownership) => ownership.workspaceId === activeWorkspace.id).length;

  return {
    user,
    customerAccount,
    activeWorkspace,
    memberships,
    subscription,
    providerConnections,
    activeSession,
    deckCount
  };
}
