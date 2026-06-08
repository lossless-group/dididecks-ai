<script lang="ts">
  import ManagedProviderCard from '$lib/components/admin/ManagedProviderCard.svelte';
  import ManagedProviderForm from '$lib/components/admin/ManagedProviderForm.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  const mockConnections = [
    {
      id: 'provider-1',
      provider: 'anthropic' as const,
      productScope: 'dididecks' as const,
      defaultModel: 'claude-sonnet',
      status: 'pending' as const,
      maskedKey: 'sk-ant-***'
    }
  ];
</script>

<PageHeader eyebrow="Admin" title="Managed AI providers" copy="Review provider status and admin-facing model defaults here while keeping all real credentials and activation logic backend-owned." />
<ManagedProviderForm />
{#each mockConnections as connection}
  <ManagedProviderCard {connection} />
{/each}
