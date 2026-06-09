<script lang="ts">
  import type { ManagedAiProviderConnection, ManagedAiProviderCreatePayload } from '$lib/types/adminAiProviders';
  import type { PageData } from './$types';
  import ManagedProviderCard from '$lib/components/admin/ManagedProviderCard.svelte';
  import ManagedProviderForm from '$lib/components/admin/ManagedProviderForm.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { createManagedAiProviderConnection } from '$lib/api/adminAiProviders';

  export let data: PageData;

  let connections: ManagedAiProviderConnection[] = data.connections;
  let accessWarning =
    !data.account.memberships.some((membership) => membership.workspaceId === data.account.activeWorkspace.id && membership.role === 'super_admin');

  async function handleSave(event: CustomEvent<ManagedAiProviderCreatePayload>) {
    const created = await createManagedAiProviderConnection(event.detail);
    connections = [created, ...connections];
  }
</script>

<PageHeader eyebrow="Admin" title="Managed AI providers" copy="Review provider status and admin-facing model defaults here while keeping all real credentials and activation logic backend-owned." />
<section class="panel stack-list">
  <div class="section-row">
    <div>
      <div class="eyebrow">Customer account</div>
      <h2>{data.account.customerAccount.internalCustomerNumber}</h2>
    </div>
    <small>{data.account.subscription.planKey} · {data.account.customerAccount.paidStatus}</small>
  </div>
  {#if accessWarning}
    <div class="list-card">
      <div>
        <strong>Local MVP access warning</strong>
        <p>The current mock membership is not `super_admin`. Production should gate provider administration server-side.</p>
      </div>
    </div>
  {/if}
</section>
<ManagedProviderForm on:save={handleSave} />
{#each connections as connection}
  <ManagedProviderCard {connection} />
{/each}
