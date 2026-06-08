<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
</script>

<PageHeader eyebrow="Account" title="Workspace settings" copy="Configure workspace identity, security posture, and the backend-owned boundaries for billing and integrations." />

<section class="route-grid route-grid-wide">
  <article class="panel auth-panel">
    <div class="eyebrow">Workspace profile</div>
    <h2>Northstar Investor Studio</h2>
    <label>
      <span>Workspace name</span>
      <input type="text" value="Northstar Investor Studio" />
    </label>
    <label>
      <span>Default owner</span>
      <input type="text" value="Andrea" />
    </label>
    <label>
      <span>Notification email</span>
      <input type="email" value="andrea@fund.io" />
    </label>
  </article>

  <article class="panel">
    <div class="eyebrow">System boundaries</div>
    <div class="stack-list">
      <div class="list-card"><div><strong>Billing</strong><p>Plans, checkout, and portal remain backend-managed.</p></div></div>
      <div class="list-card"><div><strong>AI providers</strong><p>Provider keys and model config never live in public frontend code.</p></div></div>
      <div class="list-card"><div><strong>Sessions</strong><p>Authentication and access validation remain backend-owned.</p></div></div>
    </div>
  </article>
</section>
