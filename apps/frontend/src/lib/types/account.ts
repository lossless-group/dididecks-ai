/**
 * Shared account and customer model for the repo-local MVP backend.
 *
 * This layer describes users, customer accounts, workspace membership,
 * subscriptions, deck ownership, session records, provider connections, and
 * safe connection-event history. It must never store raw cookies, raw API
 * keys, or real production secrets.
 */
export type UserAccountStatus = 'active' | 'disabled' | 'invited';
export type PaidStatus = 'free' | 'trial' | 'paid' | 'past_due' | 'cancelled';
export type MembershipRole = 'owner' | 'admin' | 'editor' | 'viewer' | 'super_admin';
export type MembershipStatus = 'active' | 'invited' | 'disabled';
export type SubscriptionPlan = 'free' | 'pro' | 'team' | 'enterprise';
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'cancelled' | 'incomplete';
export type DeckOwnershipAccessLevel = 'owner' | 'editor' | 'commenter' | 'viewer';
export type AuthSessionStatus = 'active' | 'expired' | 'revoked';
export type ProviderScope = 'user' | 'workspace' | 'product';
export type ProviderStatus = 'configured' | 'missing' | 'invalid' | 'disabled';
export type ProviderKind = 'anthropic' | 'openai' | 'local' | 'none';
export type ConnectionEventType =
  | 'sign_in'
  | 'sign_out'
  | 'session_refreshed'
  | 'provider_connected'
  | 'provider_removed'
  | 'billing_status_changed'
  | 'deck_created'
  | 'export_created';

export interface UserAccount {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  status: UserAccountStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerAccount {
  id: string;
  internalCustomerNumber: string;
  primaryUserId: string;
  primaryWorkspaceId: string;
  billingEmail: string;
  planKey: SubscriptionPlan;
  paidStatus: PaidStatus;
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  ownerUserId: string;
  customerAccountId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  id: string;
  userId: string;
  workspaceId: string;
  role: MembershipRole;
  status: MembershipStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerSubscription {
  id: string;
  customerAccountId: string;
  planKey: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodEnd?: string;
  limits: {
    maxDecks: number;
    maxAiCommands: number;
    maxExports: number;
    maxSeats: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DeckOwnership {
  id: string;
  deckId: string;
  workspaceId: string;
  ownerUserId: string;
  accessLevel: DeckOwnershipAccessLevel;
  createdAt: string;
}

export interface AuthSession {
  id: string;
  userId: string;
  workspaceId?: string;
  sessionTokenHash: string;
  status: AuthSessionStatus;
  userAgent?: string;
  ipHash?: string;
  expiresAt: string;
  createdAt: string;
  lastSeenAt: string;
}

export interface ProviderConnection {
  id: string;
  customerAccountId: string;
  workspaceId?: string;
  provider: ProviderKind;
  scope: ProviderScope;
  status: ProviderStatus;
  keyLastFour?: string;
  defaultModel?: string;
  lastTestedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectionEvent {
  id: string;
  userId?: string;
  customerAccountId?: string;
  workspaceId?: string;
  eventType: ConnectionEventType;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface UserAccountViewModel {
  user: UserAccount;
  customerAccount: CustomerAccount;
  activeWorkspace: Workspace;
  memberships: Membership[];
  subscription: CustomerSubscription;
  providerConnections: ProviderConnection[];
  activeSession: AuthSession | null;
  deckCount: number;
}
