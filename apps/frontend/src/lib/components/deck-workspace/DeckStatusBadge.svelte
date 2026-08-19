<script lang="ts">
  import StatusBadge from '$lib/components/common/StatusBadge.svelte';

  export let status = 'draft';

  const titleMap: Record<string, string> = {
    'investor-ready': 'Investor-ready',
    'in-review': 'In review',
    draft: 'Draft'
  };
</script>

<StatusBadge label={titleMap[status] ?? status} />
