<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
</script>

<svelte:head><title>Billing success | DidiDecks</title></svelte:head>
<PageHeader eyebrow="Billing" title="Payment received" copy="Your checkout completed. Subscription state will still be confirmed by the backend before the workspace is fully upgraded." />

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Next step</div>
    <p class="muted-copy">
      Return to the workspace and continue with deck editing, rebuild flows, or exports while the backend validates the subscription update.
    </p>
    <div class="hero-actions">
      <a class="primary-button" href="/dashboard">Go to dashboard</a>
      <a class="ghost-button" href="/decks">Open deck library</a>
    </div>
  </article>

  <article class="panel">
    <div class="eyebrow">Why confirmation is separate</div>
    <p class="muted-copy">
      Browser checkout success is not the source of truth. Billing status must be confirmed by the backend checkout session and webhook layer.
    </p>
  </article>
</section>
