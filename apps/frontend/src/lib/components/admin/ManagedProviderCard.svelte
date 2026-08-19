<script lang="ts">
  import type { ManagedAiProviderConnection } from '$lib/types/adminAiProviders';
  import ProviderStatusBadge from './ProviderStatusBadge.svelte';

  export let connection: ManagedAiProviderConnection;
</script>

<article class="panel">
  <div class="eyebrow">{connection.provider}</div>
  <h2>{connection.defaultModel}</h2>
  <ProviderStatusBadge status={connection.status} />
  <p>Stored key: {connection.keyLastFour ? `••••${connection.keyLastFour}` : connection.maskedKey}</p>
  <p>Scope: {connection.scope ?? 'workspace'}</p>
  {#if connection.customerAccountId}
    <p>Customer account: {connection.customerAccountId}</p>
  {/if}
  {#if connection.lastTestedAt}
    <p>Last tested: {connection.lastTestedAt}</p>
  {/if}
</article>
