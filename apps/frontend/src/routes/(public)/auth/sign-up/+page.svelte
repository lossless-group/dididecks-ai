<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  const onboardingSteps = [
    'Create workspace',
    'Upload investor deck',
    'Bind persistent fields',
    'Run Smart Edit and Rebuild flows'
  ];
</script>

<PageHeader eyebrow="Auth" title="Create account" copy="Create the workspace boundary for decks, versions, exports, access, and AI-assisted narrative operations." />

<section class="auth-grid">
  <article class="panel auth-panel">
    <div class="eyebrow">New workspace</div>
    <h2>Start with the team and deck you need to move now</h2>
    <label>
      <span>Full name</span>
      <input type="text" placeholder="Andrea Rivera" />
    </label>
    <label>
      <span>Work email</span>
      <input type="email" placeholder="andrea@fund.io" />
    </label>
    <label>
      <span>Workspace name</span>
      <input type="text" placeholder="Northstar Investor Studio" />
    </label>
    <div class="hero-actions">
      <a class="primary-button" href="/decks/new">Create workspace</a>
      <a class="ghost-button" href="/pricing">Review plans</a>
    </div>
    <small>Provisioning remains backend-owned. This route now establishes the real onboarding UX.</small>
  </article>

  <article class="panel auth-panel">
    <div class="eyebrow">Onboarding flow</div>
    <h2>What happens after signup</h2>
    <ol class="ordered-list">
      {#each onboardingSteps as step}
        <li>{step}</li>
      {/each}
    </ol>
  </article>
</section>
