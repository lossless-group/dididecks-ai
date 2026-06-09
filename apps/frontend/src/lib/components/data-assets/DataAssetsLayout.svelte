<script lang="ts">
  import CompaniesAuditTable from './CompaniesAuditTable.svelte';
  import PeopleAuditTable from './PeopleAuditTable.svelte';
  import MissingAssetWarnings from './MissingAssetWarnings.svelte';

  export let companies: Array<{ name: string; status: string; note: string }> = [];
  export let people: Array<{ name: string; status: string; note: string }> = [];
  export let warnings: string[] = [];
</script>

<section class="panel">
  <div class="eyebrow">Missing asset warnings</div>
  <MissingAssetWarnings {warnings} />
</section>

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Companies</div>
    <CompaniesAuditTable {companies} />
  </article>
  <article class="panel">
    <div class="eyebrow">People</div>
    <PeopleAuditTable {people} />
  </article>
</section>
