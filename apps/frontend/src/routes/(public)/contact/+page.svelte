<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
</script>

<svelte:head><title>Contact | DidiDecks</title></svelte:head>
<PageHeader eyebrow="Contact" title="Talk to the team behind the deck system" copy="Use this route for product walkthroughs, client-site portability, onboarding, support, and commercial collaboration." />

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Product and support</div>
    <div class="stack-list">
      <div class="list-card"><div><strong>Product walkthrough</strong><p>Review the active SvelteKit deck shell, live play runtime, and structured edit workflow.</p></div></div>
      <div class="list-card"><div><strong>Brand portability</strong><p>Discuss how slide components can move across client sites and inherit the destination identity.</p></div></div>
      <div class="list-card"><div><strong>Support</strong><p>Raise issues with editing, exports, reviews, billing state, or access control boundaries.</p></div></div>
    </div>
  </article>

  <article class="panel">
    <div class="eyebrow">Business and collaboration</div>
    <p class="muted-copy">
      This repo does not expose a public mailbox, so the Svelte marketing surface uses routing CTAs for now. The real collaboration ask is usually product fit, client rollout, or white-label deck delivery.
    </p>
    <div class="hero-actions">
      <a class="primary-button" href="/auth/sign-up">Start a workspace</a>
      <a class="ghost-button" href="/use-cases">Review use cases</a>
    </div>
  </article>
</section>
