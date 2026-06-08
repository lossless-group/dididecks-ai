<script lang="ts">
  import AppSidebar from './AppSidebar.svelte';
  import Topbar from './Topbar.svelte';
</script>

<div class="app-shell">
  <AppSidebar />
  <div class="app-shell-main">
    <Topbar />
    <main class="workspace-main">
      <slot />
    </main>
  </div>
</div>
