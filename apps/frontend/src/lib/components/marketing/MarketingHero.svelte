<script lang="ts">
  const benefits = [
    { title: 'Deck map', copy: 'Treat the deck as a persistent field-backed object, not static slide markup.' },
    { title: 'Smart edit', copy: 'Preview field-aware changes before they touch versions, exports, or share links.' },
    { title: 'Rebuild and apply', copy: 'Review impact, regenerate affected blocks, and keep version history visible.' }
  ];

  const metrics = [
    { value: '24', label: 'Decks active' },
    { value: '92%', label: 'Review score' },
    { value: '138', label: 'Exports shipped' }
  ];
</script>

{#snippet metricPill(value: string, label: string)}
  <article class="metric-pill">
    <strong>{value}</strong>
    <span>{label}</span>
  </article>
{/snippet}

{#snippet featureCard(title: string, copy: string)}
  <article class="panel feature-card">
    <div class="eyebrow">Surface</div>
    <h3>{title}</h3>
    <p>{copy}</p>
  </article>
{/snippet}

<section class="hero-grid">
  <div class="hero-copy">
    <div class="eyebrow">DidiDecks</div>
    <h1>The active SvelteKit product frontend for decks that need to close.</h1>
    <p>
      Build the SaaS shell around deck structure, persistent fields, Smart Edit,
      Rebuild and Apply, versions, exports, and access controls without putting backend secrets in the UI.
    </p>
    <div class="hero-actions">
      <a class="primary-button" href="/auth/sign-up">Start a workspace</a>
      <a class="ghost-button" href="/pricing">See pricing</a>
    </div>
    <div class="metrics-row">
      {#each metrics as metric}
        {@render metricPill(metric.value, metric.label)}
      {/each}
    </div>
  </div>

  <div class="panel hero-preview">
    <div class="section-row">
      <span>DidiDecks workspace</span>
      <div class="eyebrow">Animated preview</div>
    </div>
    <div class="preview-stack">
      <div class="preview-sidebar">
        <span class="primary-button">Upload deck</span>
        <span>Dashboard</span>
        <span>Deck map</span>
        <span>Smart edit</span>
        <span>Rebuild</span>
      </div>
      <div class="preview-canvas">
        <div class="eyebrow">Investor-ready narrative</div>
        <h2>The future of work is AI-native.</h2>
        <p>Persistent data, slide variants, versions, exports, and share state moving together.</p>
        <div class="floating-tiles"><span></span><span></span><span></span></div>
      </div>
    </div>
  </div>
</section>

<section class="feature-grid-landing">
  {#each benefits as benefit}
    {@render featureCard(benefit.title, benefit.copy)}
  {/each}
</section>
