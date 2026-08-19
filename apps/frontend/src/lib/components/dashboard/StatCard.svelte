<script lang="ts">
  export let label = '';
  export let value = '';
  export let delta = '';
  export let tone = 'violet';
</script>

<article class="panel stat-card dashboard-stat-card">
  <div class={`dashboard-stat-icon ${tone}`}></div>
  <div class="dashboard-stat-copy">
    <div class="eyebrow">{label}</div>
    <strong>{value}</strong>
    {#if delta}
      <small>{delta}</small>
    {/if}
  </div>
</article>
