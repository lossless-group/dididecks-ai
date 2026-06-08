import { json } from '@sveltejs/kit';

export function GET() {
  return json([
    {
      id: 'provider-1',
      provider: 'anthropic',
      productScope: 'dididecks',
      defaultModel: 'claude-sonnet',
      status: 'pending',
      maskedKey: 'sk-ant-***'
    }
  ]);
}
