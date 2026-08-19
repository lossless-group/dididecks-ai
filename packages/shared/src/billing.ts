export interface BillingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface BillingAccount {
  planId: string | null;
  subscriptionStatus: 'inactive' | 'trialing' | 'active' | 'past_due' | 'canceled';
  renewalDate: string | null;
}

export interface BillingCheckoutPayload {
  planId: string;
  returnPath?: string;
}

export interface BillingPortalPayload {
  returnPath?: string;
}

export interface BillingCheckoutResponse {
  checkoutUrl: string | null;
  status: 'pending-backend';
  message: string;
}
