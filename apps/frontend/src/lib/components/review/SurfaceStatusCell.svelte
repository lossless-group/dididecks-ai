<script lang="ts">
  export let status = 'pending';
</script>

<span class={`status-chip review-status-${status}`}>{status}</span>
