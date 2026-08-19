import type { SessionState } from '@dididecks/shared/auth';
import { apiPost } from './client';

export function validateSession(fetcher?: typeof fetch): Promise<SessionState> {
  return apiPost<SessionState>('/api/auth/session/validate', {}, fetcher);
}
