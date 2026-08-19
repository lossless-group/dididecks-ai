<script lang="ts">
  export let title = '';
  export let reviewer = '';
  export let status = 'pending';
  export let note = '';
</script>

<div class="list-card">
  <div>
    <strong>{title}</strong>
    <p>{reviewer}{note ? ` • ${note}` : ''}</p>
  </div>
  <small>{status}</small>
</div>
