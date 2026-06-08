import type { ManagedAiProviderConnection } from '$lib/types/adminAiProviders';
import { apiGet } from './client';

export function listManagedAiProviderConnections(fetcher?: typeof fetch): Promise<ManagedAiProviderConnection[]> {
  return apiGet<ManagedAiProviderConnection[]>('/api/dididecks/admin/ai-providers', fetcher);
}
