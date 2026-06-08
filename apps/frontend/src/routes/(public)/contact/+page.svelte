<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
</script>

<svelte:head><title>Contact | DidiDecks</title></svelte:head>
<PageHeader eyebrow="Contact" title="Talk to the team" copy="Use this route for product, onboarding, support, business, and collaboration enquiries." />

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Product and support</div>
    <div class="stack-list">
      <div class="list-card"><div><strong>Product walkthrough</strong><p>Review the active SvelteKit product shell and workflow model.</p></div></div>
      <div class="list-card"><div><strong>Onboarding</strong><p>Discuss upload flows, templates, and how deck structure maps into your workflow.</p></div></div>
      <div class="list-card"><div><strong>Support</strong><p>Raise issues with deck editing, exports, billing status, or access control.</p></div></div>
    </div>
  </article>

  <article class="panel">
    <div class="eyebrow">Business and collaboration</div>
    <p class="muted-copy">
      This repo does not include a public contact mailbox, so the frontend surface uses routing CTAs only for now.
    </p>
    <div class="hero-actions">
      <a class="primary-button" href="/auth/sign-up">Start a workspace</a>
      <a class="ghost-button" href="/pricing">Review plans</a>
    </div>
  </article>
</section>
