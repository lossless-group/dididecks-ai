<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';

  onMount(() => {
    theme.initialise();
  });
</script>

<svelte:head>
  <script>
    try {
      const savedTheme = localStorage.getItem('dddecks-theme') || 'dark';
      document.documentElement.dataset.theme = savedTheme;
    } catch {
      document.documentElement.dataset.theme = 'dark';
    }
  </script>
</svelte:head>

<div class="app-frame">
  <button class="theme-toggle button-secondary" type="button" on:click={() => theme.toggleTheme()}>
    {$theme === 'dark' ? 'Light mode' : 'Dark mode'}
  </button>

  <slot />
</div>
