import type {
  BillingAccount,
  BillingCheckoutPayload,
  BillingCheckoutResponse,
  BillingPlan
} from '$lib/types/billing';
import { apiGet, apiPost } from './client';

export function listBillingPlans(fetcher?: typeof fetch): Promise<BillingPlan[]> {
  return apiGet<BillingPlan[]>('/api/billing/plans', fetcher);
}

export function getBillingMe(fetcher?: typeof fetch): Promise<BillingAccount> {
  return apiGet<BillingAccount>('/api/billing/me', fetcher);
}

export function createBillingCheckout(
  payload: BillingCheckoutPayload,
  fetcher?: typeof fetch
): Promise<BillingCheckoutResponse> {
  return apiPost<BillingCheckoutResponse>('/api/billing/checkout', payload, fetcher);
}
