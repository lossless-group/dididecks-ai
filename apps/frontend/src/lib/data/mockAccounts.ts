/**
 * Mock account, workspace, plan, and provider data for the DidiDecks MVP.
 *
 * `user-001` in `workspace-001` is the main demo path. The remaining records
 * show invited users, trial plans, paid plans, active memberships, and masked
 * provider-connection states. Session records store hashes only, never raw
 * cookies.
 */
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

export const mockUsers: UserAccount[] = [
  {
    id: 'user-001',
    email: 'andrea.demo@dididecks.test',
    displayName: 'Andrea Demo',
    status: 'active',
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-08T09:00:00.000Z'
  },
  {
    id: 'user-002',
    email: 'mila.demo@dididecks.test',
    displayName: 'Mila Demo',
    status: 'active',
    createdAt: '2026-06-01T08:10:00.000Z',
    updatedAt: '2026-06-08T09:10:00.000Z'
  },
  {
    id: 'user-003',
    email: 'rene.demo@dididecks.test',
    displayName: 'Rene Demo',
    status: 'invited',
    createdAt: '2026-06-02T10:00:00.000Z',
    updatedAt: '2026-06-08T09:15:00.000Z'
  }
];

export const mockCustomerAccounts: CustomerAccount[] = [
  {
    id: 'cust-001',
    internalCustomerNumber: 'DD-CUST-0001',
    primaryUserId: 'user-001',
    primaryWorkspaceId: 'workspace-001',
    billingEmail: 'billing@northstar.test',
    planKey: 'team',
    paidStatus: 'paid',
    stripeCustomerId: 'cus_mock_0001',
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-08T09:00:00.000Z'
  },
  {
    id: 'cust-002',
    internalCustomerNumber: 'DD-CUST-0002',
    primaryUserId: 'user-002',
    primaryWorkspaceId: 'workspace-002',
    billingEmail: 'billing@acme.test',
    planKey: 'free',
    paidStatus: 'trial',
    createdAt: '2026-06-02T08:00:00.000Z',
    updatedAt: '2026-06-08T09:05:00.000Z'
  }
];

export const mockWorkspaces: Workspace[] = [
  {
    id: 'workspace-001',
    name: 'Northstar Investor Studio',
    slug: 'northstar-investor-studio',
    ownerUserId: 'user-001',
    customerAccountId: 'cust-001',
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-08T09:00:00.000Z'
  },
  {
    id: 'workspace-002',
    name: 'Acme Portfolio Lab',
    slug: 'acme-portfolio-lab',
    ownerUserId: 'user-002',
    customerAccountId: 'cust-002',
    createdAt: '2026-06-02T08:00:00.000Z',
    updatedAt: '2026-06-08T09:05:00.000Z'
  }
];

export const mockMemberships: Membership[] = [
  {
    id: 'membership-001',
    userId: 'user-001',
    workspaceId: 'workspace-001',
    role: 'super_admin',
    status: 'active',
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-08T09:00:00.000Z'
  },
  {
    id: 'membership-002',
    userId: 'user-002',
    workspaceId: 'workspace-001',
    role: 'editor',
    status: 'active',
    createdAt: '2026-06-01T09:00:00.000Z',
    updatedAt: '2026-06-08T09:00:00.000Z'
  },
  {
    id: 'membership-003',
    userId: 'user-003',
    workspaceId: 'workspace-002',
    role: 'owner',
    status: 'invited',
    createdAt: '2026-06-02T10:00:00.000Z',
    updatedAt: '2026-06-08T09:15:00.000Z'
  }
];

export const mockSubscriptions: CustomerSubscription[] = [
  {
    id: 'subscription-001',
    customerAccountId: 'cust-001',
    planKey: 'team',
    status: 'active',
    currentPeriodEnd: '2026-07-01T00:00:00.000Z',
    limits: {
      maxDecks: 100,
      maxAiCommands: 2000,
      maxExports: 1000,
      maxSeats: 25
    },
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-08T09:00:00.000Z'
  },
  {
    id: 'subscription-002',
    customerAccountId: 'cust-002',
    planKey: 'free',
    status: 'trialing',
    currentPeriodEnd: '2026-06-20T00:00:00.000Z',
    limits: {
      maxDecks: 3,
      maxAiCommands: 10,
      maxExports: 5,
      maxSeats: 1
    },
    createdAt: '2026-06-02T08:00:00.000Z',
    updatedAt: '2026-06-08T09:05:00.000Z'
  }
];

export const mockDeckOwnership: DeckOwnership[] = [
  {
    id: 'deck-ownership-001',
    deckId: 'deck-001',
    workspaceId: 'workspace-001',
    ownerUserId: 'user-001',
    accessLevel: 'owner',
    createdAt: '2026-06-03T09:00:00.000Z'
  },
  {
    id: 'deck-ownership-002',
    deckId: 'deck-002',
    workspaceId: 'workspace-001',
    ownerUserId: 'user-001',
    accessLevel: 'editor',
    createdAt: '2026-06-03T10:00:00.000Z'
  },
  {
    id: 'deck-ownership-003',
    deckId: 'deck-003',
    workspaceId: 'workspace-002',
    ownerUserId: 'user-002',
    accessLevel: 'viewer',
    createdAt: '2026-06-03T11:00:00.000Z'
  }
];

export const mockAuthSessions: AuthSession[] = [
  {
    id: 'session-001',
    userId: 'user-001',
    workspaceId: 'workspace-001',
    sessionTokenHash: 'sha256:mock-session-token-hash-001',
    status: 'active',
    userAgent: 'Mozilla/5.0 Demo Browser',
    ipHash: 'sha256:mock-ip-hash-001',
    expiresAt: '2026-06-15T12:00:00.000Z',
    createdAt: '2026-06-08T08:00:00.000Z',
    lastSeenAt: '2026-06-08T11:00:00.000Z'
  },
  {
    id: 'session-002',
    userId: 'user-002',
    workspaceId: 'workspace-001',
    sessionTokenHash: 'sha256:mock-session-token-hash-002',
    status: 'expired',
    userAgent: 'Mozilla/5.0 Demo Browser',
    ipHash: 'sha256:mock-ip-hash-002',
    expiresAt: '2026-06-07T12:00:00.000Z',
    createdAt: '2026-06-07T08:00:00.000Z',
    lastSeenAt: '2026-06-07T11:00:00.000Z'
  }
];

export const mockProviderConnections: ProviderConnection[] = [
  {
    id: 'provider-connection-001',
    customerAccountId: 'cust-001',
    workspaceId: 'workspace-001',
    provider: 'anthropic',
    scope: 'workspace',
    status: 'configured',
    keyLastFour: '7890',
    defaultModel: 'claude-sonnet',
    lastTestedAt: '2026-06-08T09:45:00.000Z',
    createdAt: '2026-06-05T09:00:00.000Z',
    updatedAt: '2026-06-08T09:45:00.000Z'
  },
  {
    id: 'provider-connection-002',
    customerAccountId: 'cust-001',
    provider: 'openai',
    scope: 'product',
    status: 'missing',
    defaultModel: 'gpt-4.1',
    createdAt: '2026-06-05T09:10:00.000Z',
    updatedAt: '2026-06-08T09:20:00.000Z'
  },
  {
    id: 'provider-connection-003',
    customerAccountId: 'cust-002',
    workspaceId: 'workspace-002',
    provider: 'none',
    scope: 'workspace',
    status: 'disabled',
    createdAt: '2026-06-06T09:00:00.000Z',
    updatedAt: '2026-06-08T09:00:00.000Z'
  }
];

export const mockConnectionEvents: ConnectionEvent[] = [
  {
    id: 'event-001',
    userId: 'user-001',
    customerAccountId: 'cust-001',
    workspaceId: 'workspace-001',
    eventType: 'sign_in',
    metadata: { method: 'passwordless-link' },
    createdAt: '2026-06-08T08:00:00.000Z'
  },
  {
    id: 'event-002',
    userId: 'user-001',
    customerAccountId: 'cust-001',
    workspaceId: 'workspace-001',
    eventType: 'provider_connected',
    metadata: { provider: 'anthropic', scope: 'workspace' },
    createdAt: '2026-06-08T09:45:00.000Z'
  },
  {
    id: 'event-003',
    userId: 'user-001',
    customerAccountId: 'cust-001',
    workspaceId: 'workspace-001',
    eventType: 'billing_status_changed',
    metadata: { paidStatus: 'paid', planKey: 'team' },
    createdAt: '2026-06-08T10:00:00.000Z'
  }
];

export const mockCurrentUserId = 'user-001';
