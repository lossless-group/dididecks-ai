<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  const sections = [
    'Use of service and account responsibilities',
    'User uploads and rights in submitted deck content',
    'AI-generated outputs and operator review responsibilities',
    'Subscriptions, billing, and backend checkout confirmation',
    'Acceptable use and prohibited behavior',
    'Termination, limitation of liability, and legal review status'
  ];
</script>

<PageHeader eyebrow="Legal" title="Terms draft" copy="Product terms draft for DidiDecks. This text requires legal review before production use." />

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Draft status</div>
    <p class="muted-copy">
      Users remain responsible for the legality and accuracy of uploaded decks, the appropriateness of edits they accept,
      and downstream use of exported or shared materials.
    </p>
    <p class="muted-copy">
      AI-assisted recommendations are workflow inputs, not guarantees. Billing, subscription state, and access enforcement
      remain subject to backend validation.
    </p>
  </article>

  <article class="panel">
    <div class="eyebrow">Covered topics</div>
    <ol class="ordered-list">
      {#each sections as section}
        <li>{section}</li>
      {/each}
    </ol>
  </article>
</section>
