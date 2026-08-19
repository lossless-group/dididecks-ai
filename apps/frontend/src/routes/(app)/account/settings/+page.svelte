<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  export let data: PageData;
</script>

<PageHeader eyebrow="Account" title="Workspace settings" copy="Configure workspace identity, security posture, and the backend-owned boundaries for billing and integrations." />

<section class="route-grid route-grid-wide">
  <article class="panel auth-panel">
    <div class="eyebrow">Workspace profile</div>
    <h2>{data.account.activeWorkspace.name}</h2>
    <label>
      <span>Display name</span>
      <input type="text" value={data.account.user.displayName} />
    </label>
    <label>
      <span>Workspace slug</span>
      <input type="text" value={data.account.activeWorkspace.slug} />
    </label>
    <label>
      <span>Notification email</span>
      <input type="email" value={data.account.customerAccount.billingEmail} />
    </label>
  </article>

  <article class="panel">
    <div class="eyebrow">Account model</div>
    <div class="stack-list">
      <div class="list-card"><div><strong>Customer number</strong><p>{data.account.customerAccount.internalCustomerNumber}</p></div></div>
      <div class="list-card"><div><strong>Plan</strong><p>{data.account.subscription.planKey}</p></div><small>{data.account.customerAccount.paidStatus}</small></div>
      <div class="list-card"><div><strong>Workspace</strong><p>{data.account.activeWorkspace.name}</p></div></div>
      <div class="list-card"><div><strong>Session status</strong><p>{data.account.activeSession ? data.account.activeSession.status : 'no active session'}</p></div></div>
    </div>
  </article>
</section>

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Provider connection status</div>
    <div class="stack-list">
      {#each data.account.providerConnections as connection}
        <div class="list-card">
          <div>
            <strong>{connection.provider}</strong>
            <p>{connection.scope} scope · {connection.status}</p>
          </div>
          <small>{connection.keyLastFour ? `••••${connection.keyLastFour}` : 'no key stored'}</small>
        </div>
      {/each}
    </div>
  </article>

  <article class="panel">
    <div class="eyebrow">Recent connection events</div>
    <div class="stack-list">
      {#each data.connectionEvents as event}
        <div class="list-card">
          <div>
            <strong>{event.eventType}</strong>
            <p>{JSON.stringify(event.metadata)}</p>
          </div>
          <small>{event.createdAt}</small>
        </div>
      {/each}
    </div>
  </article>
</section>
