<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
</script>

<PageHeader eyebrow="Support" title="Support for the deck operating system" copy="Use this surface for workspace, access, export, billing, and review-flow support without turning the frontend into a backend control plane." />

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Product support</div>
    <div class="stack-list">
      <div class="list-card"><div><strong>Deck workflow issues</strong><p>Scroll, play, smart edit, rebuild, and review matrix questions belong here.</p></div></div>
      <div class="list-card"><div><strong>Access and sharing</strong><p>Validate workspace membership, share links, and private-route behavior.</p></div></div>
      <div class="list-card"><div><strong>Exports and delivery</strong><p>Check print readiness, export job state, and artifact lineage.</p></div></div>
    </div>
  </article>

  <article class="panel">
    <div class="eyebrow">Boundary note</div>
    <p class="muted-copy">
      This public support route explains the product surface only. Session enforcement, billing execution, durable
      persistence, and guarded AI actions remain backend-owned.
    </p>
    <div class="hero-actions">
      <a class="primary-button" href="/contact">Contact</a>
      <a class="ghost-button" href="/legal/terms">Terms</a>
    </div>
  </article>
</section>
