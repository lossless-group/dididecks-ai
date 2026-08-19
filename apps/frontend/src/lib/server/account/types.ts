import type {
  AuthSession,
  ConnectionEvent,
  CustomerAccount,
  CustomerSubscription,
  DeckOwnership,
  Membership,
  ProviderConnection,
  UserAccount,
  Workspace
} from '$lib/types/account';

export interface AccountState {
  users: UserAccount[];
  customerAccounts: CustomerAccount[];
  workspaces: Workspace[];
  memberships: Membership[];
  subscriptions: CustomerSubscription[];
  deckOwnership: DeckOwnership[];
  authSessions: AuthSession[];
  providerConnections: ProviderConnection[];
  connectionEvents: ConnectionEvent[];
  currentUserId: string;
}
