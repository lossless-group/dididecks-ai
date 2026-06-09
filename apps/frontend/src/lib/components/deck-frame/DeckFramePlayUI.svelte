<script lang="ts">
  import FullscreenToggle from '$lib/components/viewer/FullscreenToggle.svelte';
  import VariantSwitchMenu from './VariantSwitchMenu.svelte';

  export let variants: Array<{ label: string; href?: string }> = [];
</script>

<div class="panel section-row">
  <VariantSwitchMenu {variants} />
  <FullscreenToggle />
</div>
