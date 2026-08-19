<script lang="ts">
  export let title = 'AI-guided changes';
  export let copy = 'Draft controlled field changes before the backend persists them.';
</script>

<section class="panel">
  <div class="eyebrow">Smart edit</div>
  <h2>{title}</h2>
  <p class="muted-copy">{copy}</p>
  <slot name="composer" />
</section>

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Active proposal lane</div>
    <slot name="proposal" />
  </article>
  <article class="panel">
    <div class="eyebrow">Field context</div>
    <slot name="fields" />
  </article>
</section>
