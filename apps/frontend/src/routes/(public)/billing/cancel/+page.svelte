<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
</script>

<svelte:head><title>Billing cancelled | DidiDecks</title></svelte:head>
<PageHeader eyebrow="Billing" title="Checkout cancelled" copy="No billing changes were applied. You can return to pricing and choose a plan whenever you are ready." />

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">No changes applied</div>
    <p class="muted-copy">
      Your workspace remains on its current plan until a backend-confirmed checkout completes successfully.
    </p>
    <div class="hero-actions">
      <a class="primary-button" href="/pricing">Back to pricing</a>
      <a class="ghost-button" href="/dashboard">Return to dashboard</a>
    </div>
  </article>

  <article class="panel">
    <div class="eyebrow">Still evaluating?</div>
    <p class="muted-copy">
      Review feature differences, keep working in the current workspace, and return when you want to upgrade.
    </p>
  </article>
</section>
