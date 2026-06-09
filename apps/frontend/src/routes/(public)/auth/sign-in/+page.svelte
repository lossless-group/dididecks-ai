<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  const trustPoints = [
    'Backend-owned auth and sessions',
    'No AI provider keys in frontend code',
    'Workspace, deck, and billing state validated server-side'
  ];
</script>

<svelte:head><title>Sign in | DidiDecks</title></svelte:head>
<PageHeader eyebrow="Auth" title="Sign in" copy="Access the workspace shell while keeping auth, billing, and AI configuration backend-owned." />

<section class="auth-grid">
  <article class="panel auth-panel">
    <div class="eyebrow">Workspace access</div>
    <h2>Resume active deck operations</h2>
    <label>
      <span>Email</span>
      <input type="email" placeholder="andrea@fund.io" />
    </label>
    <label>
      <span>Password</span>
      <input type="password" placeholder="Enter password" />
    </label>
    <div class="hero-actions">
      <a class="primary-button" href="/dashboard">Continue to dashboard</a>
      <a class="ghost-button" href="/auth/sign-up">Create account</a>
    </div>
    <small>Auth submission still needs the real backend session endpoint.</small>
  </article>

  <article class="panel auth-panel">
    <div class="eyebrow">What this app protects</div>
    <h2>High-stakes deck workflow, not just slides</h2>
    <ul class="stack-list">
      {#each trustPoints as point}
        <li>{point}</li>
      {/each}
    </ul>
    <p class="muted-copy">This route is ready as a product surface. Secret handling remains outside SvelteKit public code.</p>
  </article>
</section>
