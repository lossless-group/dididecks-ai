<script lang="ts">
  import type { DeckAccessEntry, DeckShareLink } from '$lib/types/dididecks';
  import DeckAccessWorkspace from './DeckAccessWorkspace.svelte';
  import PermissionMatrix from './PermissionMatrix.svelte';

  export let entries: DeckAccessEntry[] = [];
  export let shareLinks: DeckShareLink[] = [];
</script>

<DeckAccessWorkspace {entries} {shareLinks} />

<section class="panel">
  <div class="eyebrow">Permission matrix</div>
  <PermissionMatrix rows={entries} />
</section>
