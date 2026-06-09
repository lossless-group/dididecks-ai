/**
 * Frontend-safe account API client.
 *
 * This module exposes the repo-local user, workspace, subscription, provider,
 * and connection-event surfaces through typed same-origin requests.
 */
import type {
  ConnectionEvent,
  CustomerSubscription,
  ProviderConnection,
  UserAccountViewModel,
  Workspace
} from '$lib/types/account';
import { apiGet } from './client';

export function getCurrentAccount(fetcher?: typeof fetch): Promise<UserAccountViewModel> {
  return apiGet<UserAccountViewModel>('/api/account/me', fetcher);
}

export function listWorkspaces(fetcher?: typeof fetch): Promise<Workspace[]> {
  return apiGet<Workspace[]>('/api/account/me/workspaces', fetcher);
}

export function getCurrentSubscription(fetcher?: typeof fetch): Promise<CustomerSubscription> {
  return apiGet<CustomerSubscription>('/api/account/me/subscription', fetcher);
}

export function listProviderConnections(fetcher?: typeof fetch): Promise<ProviderConnection[]> {
  return apiGet<ProviderConnection[]>('/api/account/me/provider-connections', fetcher);
}

export function listConnectionEvents(fetcher?: typeof fetch): Promise<ConnectionEvent[]> {
  return apiGet<ConnectionEvent[]>('/api/account/me/connection-events', fetcher);
}
