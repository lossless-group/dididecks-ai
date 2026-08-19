<script lang="ts">
  export let title = 'Infrastructure workspace';
  export let copy = 'Operational surfaces for exports, versions, comments, access, audit, and change tracking.';
</script>

<section class="panel">
  <div class="eyebrow">Infrastructure</div>
  <h2>{title}</h2>
  <p class="muted-copy">{copy}</p>
</section>

<section class="route-grid route-grid-wide">
  <slot />
</section>
