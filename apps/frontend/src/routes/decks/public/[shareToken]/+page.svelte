<script lang="ts">
  import { page } from '$app/stores';
  import PageHeader from '$lib/components/common/PageHeader.svelte';
</script>

<PageHeader eyebrow="Public deck" title="Restricted public deck route" copy="Use this route for limited delivery-safe previews only. Full workspace operations stay behind authenticated deck routes." />

<section class="panel">
  <div class="eyebrow">Public token</div>
  <p class="muted-copy">Share token: {$page.params.shareToken}</p>
  <div class="hero-actions">
    <a class="ghost-button" href="/pricing">View product</a>
    <a class="ghost-button" href="/contact">Request full access</a>
  </div>
</section>
