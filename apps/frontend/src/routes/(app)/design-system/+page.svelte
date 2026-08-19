<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import ComponentRegistryBrowser from '$lib/components/infrastructure/ComponentRegistryBrowser.svelte';
  import DeckRegistryWorkspace from '$lib/components/infrastructure/DeckRegistryWorkspace.svelte';
  import { componentRegistry, componentRegistryCategories, designSystemRules } from '$lib/registry/componentRegistry';

  const items = [
    { title: 'Theme tokens', body: 'Three-layer token architecture for portable deck branding.' },
    { title: 'Shell primitives', body: 'Sidebar, topbar, nav, and panel structure used across the product.' },
    { title: 'Slide contracts', body: 'Reusable slide and slot rendering expectations for editor, scroll, play, and print.' }
  ];

  const designSystemEntries = componentRegistry.filter((entry) => entry.layer === 'design-system');
</script>

<PageHeader eyebrow="Registry" title="Design system" copy="Review the reusable visual and shell primitives that keep DidiDecks coherent across surfaces." />
<DeckRegistryWorkspace title="Design system registry" {items} />

<section class="route-grid card-grid-3">
  {#each componentRegistryCategories as category}
    <article class="panel feature-card">
      <div class="eyebrow">{category.title}</div>
      <p>{category.description}</p>
    </article>
  {/each}
</section>

<section class="panel">
  <div class="eyebrow">Stable contract</div>
  <h2>What the design system owns</h2>
  <ol class="ordered-list">
    {#each designSystemRules as rule}
      <li>{rule}</li>
    {/each}
  </ol>
</section>

<ComponentRegistryBrowser
  title="Design system registry entries"
  description="These are the stable contract primitives that should remain reliable across projects, brands, and future backend generation rules."
  entries={designSystemEntries}
/>
