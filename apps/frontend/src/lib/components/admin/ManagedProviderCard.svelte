<script lang="ts">
  import type { ManagedAiProviderConnection } from '$lib/types/adminAiProviders';
  import ProviderStatusBadge from './ProviderStatusBadge.svelte';

  export let connection: ManagedAiProviderConnection;
</script>

<article class="panel">
  <div class="eyebrow">{connection.provider}</div>
  <h2>{connection.defaultModel}</h2>
  <ProviderStatusBadge status={connection.status} />
  <p>Stored key: {connection.maskedKey}</p>
</article>
