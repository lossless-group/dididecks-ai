<script lang="ts">
  import { page } from '$app/stores';

  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/decks', label: 'Decks' },
    { href: '/account/settings', label: 'Settings' },
    { href: '/admin/ai-providers', label: 'AI Providers' }
  ];
</script>

<aside class="app-sidebar panel">
  <div class="brand sidebar-brand">
    <span class="mark">D</span>
    <div>
      <strong>DidiDecks</strong>
      <small>Workspace shell</small>
    </div>
  </div>

  <nav class="sidebar-nav">
    {#each items as item}
      <a class:active={$page.url.pathname === item.href || $page.url.pathname.startsWith(`${item.href}/`)} href={item.href}>{item.label}</a>
    {/each}
  </nav>
</aside>
