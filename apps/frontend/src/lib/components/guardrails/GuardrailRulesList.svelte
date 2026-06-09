<script lang="ts">
  export let rules: string[] = [];
</script>

<ol class="ordered-list">
  {#each rules as rule}
    <li>{rule}</li>
  {/each}
</ol>
