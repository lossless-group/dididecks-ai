export interface ManagedAiProviderConnection {
  id: string;
  provider: 'anthropic' | 'openai';
  productScope: 'dididecks';
  defaultModel: string;
  status: 'connected' | 'disabled' | 'pending';
  maskedKey: string;
  customerAccountId?: string;
  scope?: 'user' | 'workspace' | 'product';
  keyLastFour?: string;
  lastTestedAt?: string;
}

export interface ManagedAiProviderCreatePayload {
  provider: 'anthropic' | 'openai';
  defaultModel: string;
  apiKey: string;
}
