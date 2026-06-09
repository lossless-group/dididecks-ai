<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  const sections = [
    'Account data and workspace identity',
    'Uploaded deck files and transformed deck data',
    'AI processing and model-mediated operations',
    'Billing metadata handled by backend payment systems',
    'Cookies, local storage, and session support',
    'User rights, retention, and contact channels'
  ];
</script>

<svelte:head><title>Privacy | DidiDecks</title></svelte:head>
<PageHeader eyebrow="Legal" title="Privacy draft" copy="Product-appropriate privacy draft for DidiDecks. This text requires legal review before production use." />

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Draft status</div>
    <p class="muted-copy">
      DidiDecks may process account information, uploaded deck material, structured deck data, and workflow metadata in order
      to provide editing, rebuilding, exporting, access control, and subscription services.
    </p>
    <p class="muted-copy">
      AI-assisted operations are initiated within the product workflow, but provider keys, billing systems, and durable data storage
      remain backend-managed and are not embedded in public frontend code.
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

<section class="panel">
  <p class="muted-copy">For privacy questions or legal requests, route users to the product contact surface at <a href="/contact">/contact</a>.</p>
</section>
