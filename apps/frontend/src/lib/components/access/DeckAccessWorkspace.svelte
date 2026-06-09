<script lang="ts">
  import type { DeckAccessEntry, DeckShareLink } from '$lib/types/dididecks';
  import MembersAccessTable from './MembersAccessTable.svelte';
  import ShareLinksTable from './ShareLinksTable.svelte';

  export let entries: DeckAccessEntry[] = [];
  export let shareLinks: DeckShareLink[] = [];
</script>

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Workspace members</div>
    <MembersAccessTable {entries} />
  </article>
  <article class="panel">
    <div class="eyebrow">Share links</div>
    <ShareLinksTable links={shareLinks} />
  </article>
</section>
