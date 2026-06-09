<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import ComponentRegistryBrowser from '$lib/components/infrastructure/ComponentRegistryBrowser.svelte';
  import DeckRegistryWorkspace from '$lib/components/infrastructure/DeckRegistryWorkspace.svelte';
  import InfoDisplaySwitcher from '$lib/components/infrastructure/InfoDisplaySwitcher.svelte';
  import { componentRegistry, infoDisplayOptions } from '$lib/registry/componentRegistry';

  const items = [
    { title: 'App shell components', body: 'Layout primitives for dashboard and workspace continuity.' },
    { title: 'Workflow components', body: 'Map, Smart Edit, rebuild, and infrastructure operations.' },
    { title: 'Review and viewer components', body: 'Matrix, scroll, play, and print-oriented shells.' }
  ];

  const libraryEntries = componentRegistry.filter((entry) => entry.layer === 'component-library');
</script>

<PageHeader eyebrow="Registry" title="Component library" copy="Inspect the reusable product components that should remain portable and DRY across deck projects." />
<DeckRegistryWorkspace title="Component registry" {items} />

<InfoDisplaySwitcher displays={infoDisplayOptions} activeKey="numbered-column-grid" />

<ComponentRegistryBrowser
  title="Component library entries"
  description="These are the reusable render components, viewers, and workflow patterns that can be swapped or recomposed without rewriting the deck product shell."
  entries={libraryEntries}
/>
