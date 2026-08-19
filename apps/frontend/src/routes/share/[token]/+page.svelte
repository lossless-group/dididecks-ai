<script lang="ts">
  import { page } from '$app/stores';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
</script>

<PageHeader eyebrow="Share" title="Shared deck preview" copy="This public share surface is presentation-safe by design. Workflow controls, private metadata, and edit actions remain outside token-based access." />

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Share token</div>
    <p class="muted-copy">Token: {$page.params.token}</p>
    <div class="hero-actions">
      <a class="primary-button" href="/auth/sign-in">Open full workspace</a>
      <a class="ghost-button" href="/">Return home</a>
    </div>
  </article>
  <article class="panel">
    <div class="eyebrow">Boundary</div>
    <p class="muted-copy">
      Token routes should be validated server-side before private deck content is returned. This frontend shell keeps the public route in place without claiming frontend-only authorization.
    </p>
  </article>
</section>
