<script lang="ts">
  export let displays: Array<{ key: string; title: string; summary: string }> = [];
  export let activeKey = '';

  $: activeDisplay = displays.find((display) => display.key === activeKey) ?? displays[0] ?? null;
</script>

<section class="panel">
  <div class="eyebrow">Info display switcher</div>
  <h2>Same data, different render component</h2>
  <p class="muted-copy">
    The same slide data shape can render through different display primitives without changing the underlying content contract.
  </p>

  <div class="play-chrome-meta">
    {#each displays as display}
      <span class:item-active={display.key === activeDisplay?.key} class="status-chip">{display.title}</span>
    {/each}
  </div>

  {#if activeDisplay}
    <div class="runtime-block">
      <strong>{activeDisplay.title}</strong>
      <p>{activeDisplay.summary}</p>
    </div>
  {/if}
</section>
