<script lang="ts">
  import PublicHeader from '$lib/components/app-shell/PublicHeader.svelte';
  import PublicFooter from '$lib/components/app-shell/PublicFooter.svelte';
</script>

<div class="site-shell page-stack page-stack-public">
  <PublicHeader />
  <main class="public-main">
    <slot />
  </main>
  <PublicFooter />
</div>
