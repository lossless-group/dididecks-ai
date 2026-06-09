<script lang="ts">
  import DidiDecksLogo from './DidiDecksLogo.svelte';
</script>

<header class="topbar">
  <DidiDecksLogo compact={true} className="topbar-brand" href="/dashboard" />
  <div class="topbar-actions topbar-actions-shell">
    <label class="topbar-search">
      <input type="search" placeholder="Search decks..." aria-label="Search decks" />
    </label>
    <button class="topbar-icon-button" type="button" aria-label="Notifications">
      <span class="topbar-badge">9</span>
      N
    </button>
    <button class="topbar-profile" type="button">
      <span class="sidebar-user-avatar">A</span>
      <span>Andrea</span>
    </button>
  </div>
</header>
