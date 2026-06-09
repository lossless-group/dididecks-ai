<script lang="ts">
  export let maxWidth = '100%';
  export let maxHeight = '100%';
  export let align = 'center';
  export let padding = '0px';
</script>

<div
  class="content-fit"
  style={`--content-fit-max-width:${maxWidth};--content-fit-max-height:${maxHeight};--content-fit-align:${align};--content-fit-padding:${padding};`}
>
  <slot />
</div>
