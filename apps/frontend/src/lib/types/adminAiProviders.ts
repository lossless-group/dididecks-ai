export interface ManagedAiProviderConnection {
  id: string;
  provider: 'anthropic' | 'openai';
  productScope: 'dididecks';
  defaultModel: string;
  status: 'connected' | 'disabled' | 'pending';
  maskedKey: string;
}
