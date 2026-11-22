<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import type { Snippet } from 'svelte';
  import { MetaTags, JsonLd, deepMerge } from 'svelte-meta-tags';
  import type { JsonLdProps, MetaTagsProps } from 'svelte-meta-tags';
  import { theme } from '#lib/stores/theme.ts';

  let { data, children }: {
    data: {
      baseMetaTags: Readonly<MetaTagsProps>;
      baseJsonLd: JsonLdProps['schema'];
    };
    children: Snippet;
  } = $props();

  const metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags ?? {}));
  const jsonLdSchema = $derived([data.baseJsonLd, page.data.pageJsonLd].filter(Boolean));

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
  <button class="theme-toggle button-secondary" type="button" onclick={() => theme.toggleTheme()}>
    {$theme === 'dark' ? 'Light mode' : 'Dark mode'}
  </button>

  {@render children()}
</div>
