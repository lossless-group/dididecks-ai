<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { MetaTags, JsonLd, deepMerge } from 'svelte-meta-tags';
  import type { JsonLdProps, MetaTagsProps } from 'svelte-meta-tags';
  import { theme } from '$lib/stores/theme';

  export let data: {
    baseMetaTags: Readonly<MetaTagsProps>;
    baseJsonLd: JsonLdProps['schema'];
  };

  $: metaTags = deepMerge(data.baseMetaTags, $page.data.pageMetaTags ?? {});
  $: jsonLdSchema = [data.baseJsonLd, $page.data.pageJsonLd].filter(Boolean);

  onMount(() => {
    theme.initialise();
  });
</script>

<svelte:head>
  <MetaTags {...metaTags} />
  <JsonLd schema={jsonLdSchema.length === 1 ? jsonLdSchema[0] : jsonLdSchema} />
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
