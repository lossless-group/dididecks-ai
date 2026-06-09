import type {
  ManagedAiProviderConnection,
  ManagedAiProviderCreatePayload
} from '$lib/types/adminAiProviders';
import { apiGet, apiPost } from './client';

export function listManagedAiProviderConnections(fetcher?: typeof fetch): Promise<ManagedAiProviderConnection[]> {
  return apiGet<ManagedAiProviderConnection[]>('/api/dididecks/admin/ai-providers', fetcher);
}

export function listManagedAiProviders(fetcher?: typeof fetch): Promise<ManagedAiProviderConnection[]> {
  return listManagedAiProviderConnections(fetcher);
}

export function createManagedAiProviderConnection(
  payload: ManagedAiProviderCreatePayload,
  fetcher?: typeof fetch
): Promise<ManagedAiProviderConnection> {
  return apiPost<ManagedAiProviderConnection>('/api/dididecks/admin/ai-providers', payload, fetcher);
}

export function createManagedAiProvider(
  payload: ManagedAiProviderCreatePayload,
  fetcher?: typeof fetch
): Promise<ManagedAiProviderConnection> {
  return createManagedAiProviderConnection(payload, fetcher);
}
