<script lang="ts">
  export let status: 'connected' | 'disabled' | 'pending' = 'pending';
</script>

<span class="status-badge">{status}</span>
