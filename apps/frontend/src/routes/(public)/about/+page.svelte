<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  const pillars = [
    {
      title: 'Structured decks',
      copy: 'Turn slides into persistent fields, blocks, variants, and reusable story structure instead of static visuals.'
    },
    {
      title: 'AI with operator control',
      copy: 'Use Smart Edit and rebuild flows to propose improvements while keeping human review and acceptance in the loop.'
    },
    {
      title: 'Operational surfaces',
      copy: 'Manage versions, exports, access, and review state in one product shell instead of ad hoc file passing.'
    }
  ];
</script>

<svelte:head><title>About | DidiDecks</title></svelte:head>
<PageHeader eyebrow="About" title="DidiDecks turns high-stakes decks into managed product assets" copy="Built for fundraising, board, LP, and diligence workflows where deck quality, control, and repeatability matter." />

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">What it does</div>
    <p class="muted-copy">
      DidiDecks lets teams upload or create decks, transform slides into structured editable elements,
      improve copy with AI-guided commands, rebuild affected slides, and manage versions and exports.
    </p>
    <p class="muted-copy">
      The system is designed for operators who need better narrative tooling without surrendering control of the final deck.
    </p>
  </article>

  <article class="panel">
    <div class="eyebrow">Who it is for</div>
    <div class="stack-list">
      <div class="list-card"><div><strong>Founders</strong><p>Keep fundraising narratives consistent as traction and ask evolve.</p></div></div>
      <div class="list-card"><div><strong>Funds and advisors</strong><p>Run recurring diligence and update workflows without slide chaos.</p></div></div>
      <div class="list-card"><div><strong>Operating teams</strong><p>Manage board, LP, and strategic communication decks as repeatable systems.</p></div></div>
    </div>
  </article>
</section>

<section class="card-grid-3 route-grid">
  {#each pillars as pillar}
    <article class="panel feature-card">
      <div class="eyebrow">Pillar</div>
      <h2>{pillar.title}</h2>
      <p>{pillar.copy}</p>
    </article>
  {/each}
</section>
