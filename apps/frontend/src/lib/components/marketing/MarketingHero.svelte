<script lang="ts">
  import MarketingNarrative from './MarketingNarrative.svelte';

  const logos = ['Calmstorm', 'Chroma', 'Lossless', 'Humain VC', 'Reach Edu Hub'];

  const valuePills = [
    { title: 'Portable layouts', body: 'One slide system, many client brands' },
    { title: 'Structured edits', body: 'Rebuild without losing operator control' },
    { title: 'Playable runtime', body: 'Present live, then export when needed' }
  ];

  const features = [
    {
      title: 'AI-Powered Editing',
      body: 'Smart edits, rewrite, and rebuild your deck with guardrailed AI.',
      tone: 'violet'
    },
    {
      title: 'Persistent Field System',
      body: 'Change once, update everywhere. Keep your deck consistent.',
      tone: 'blue'
    },
    {
      title: 'Design Guardrails',
      body: 'Built-in checks keep your deck on-brand, on-message, and investor-safe.',
      tone: 'green'
    },
    {
      title: 'Review & Feedback Loop',
      body: 'Rank slides, compare variants, and learn from investor preferences.',
      tone: 'amber'
    },
    {
      title: 'Export Everywhere',
      body: 'Export to PDF, PPTX, images, or share a live link.',
      tone: 'violet'
    },
    {
      title: 'Team Collaboration',
      body: 'Work together in real time with comments, roles, and version history.',
      tone: 'indigo'
    }
  ];

  const workflowSteps = [
    { n: '1', title: 'Create', body: 'Start from templates or AI. Structure your deck in minutes.', tone: 'violet' },
    { n: '2', title: 'Map', body: 'Connect content to persistent fields. Keep everything in sync.', tone: 'blue' },
    { n: '3', title: 'Smart Edit', body: 'Make changes with confidence and see impact instantly.', tone: 'green' },
    { n: '4', title: 'Rebuild', body: 'Apply AI improvements across affected slides with one click.', tone: 'amber' },
    { n: '5', title: 'Review', body: 'Evaluate, rank, and compare. Learn what investors respond to.', tone: 'violet' },
    { n: '6', title: 'Export & Share', body: 'Deliver the perfect deck in any format or share live.', tone: 'indigo' }
  ];

  const testimonials = [
    {
      quote: 'DidiDecks cut our deck creation time by 70%. The smart edit and rebuild features are game changers.',
      name: 'Sarah Chen',
      role: 'Partner',
      company: 'Northstar Capital'
    },
    {
      quote: 'The guardrails give us confidence that every deck we send is on-brand, compliant, and investor-ready.',
      name: 'Mike Johnson',
      role: 'CEO',
      company: 'FlowAI'
    },
    {
      quote: 'We finally have a system for learning what investors care about. Our decks keep getting better.',
      name: 'Andrea Rossi',
      role: 'Founder',
      company: 'Beta Labs'
    }
  ];

  const references = [
    {
      tag: 'NS-1',
      title: 'Two-sided system: private native to white-label publish',
      body: 'A private workspace where a managing partner develops decks with AI in confidence, paired with a publish target that can live in the client brand.'
    },
    {
      tag: 'NS-2',
      title: 'A player so good you present live from the deck',
      body: 'The person building the deck should also be able to present from DidiDecks directly. PDF, PPTX, and share exports are handoff artifacts, not the primary runtime.'
    },
    {
      tag: 'Spec',
      title: 'Slide Decks as Code',
      body: 'Decks are repositories, slides are components, variants are first-class, and AI is a primary authoring path.'
    },
    {
      tag: 'Spec',
      title: 'DD-Ready Citation and Source Access',
      body: 'Claims, charts, and KPI blocks should stay tied to source material so the receiver can continue diligence.'
    }
  ];

  const stackNotes = [
    'Dashboard',
    'Decks',
    'Clients',
    'Templates',
    'Analytics',
    'Investor Pitch Deck',
    'Overview',
    'Smart Edit',
    'Rebuild & Apply',
    'Versions',
    'Exports'
  ];
</script>

<section class="hero-grid splash-hero">
  <div class="hero-copy splash-copy">
    <div class="eyebrow">DidiDecks-AI · The Lossless Group</div>
    <h1>Decks for <span>due diligence</span>, not for vibes.</h1>
    <p class="splash-lede">
      A code-first deck operating system for ingest, wow-ify, variant, publish, export, and re-integrate
      loops where citations survive and the presentation runtime matters as much as the authoring flow.
    </p>
    <div class="hero-actions">
      <a class="primary-button" href="/auth/sign-up">Get Started Free</a>
      <a class="ghost-button" href="/contact">Book a Demo</a>
    </div>
    <div class="hero-value-pills">
      {#each valuePills as pill}
        <div class="hero-value-pill">
          <strong>{pill.title}</strong>
          <span>{pill.body}</span>
        </div>
      {/each}
    </div>
  </div>

  <article class="panel hero-preview hero-workspace-preview">
    <div class="hero-product-frame">
      <div class="hero-product-frame-bar">
        <strong>DidiDecks</strong>
        <span>Slides</span>
        <span>Play</span>
        <span>Preview</span>
      </div>
      <div class="hero-product-frame-body">
        <div class="hero-product-sidebar">
          <a class="selected" href="/">Dashboard</a>
          {#each stackNotes as note}
            <a href="/">{note}</a>
          {/each}
        </div>
        <div class="hero-product-canvas">
          <div class="hero-slide-card">
            <div class="eyebrow">Live preview</div>
            <h2>One layout, many <span>brand hosts</span></h2>
            <p>Reusable slide components inherit the destination brand without rewriting spacing, color, or structure.</p>
            <div class="hero-slide-metrics">
              <div><strong>3</strong><span>theme layers</span></div>
              <div><strong>1</strong><span>play runtime</span></div>
              <div><strong>∞</strong><span>brand targets</span></div>
            </div>
          </div>
          <div class="hero-slide-visual" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="hero-product-inspector">
          <div class="hero-inspector-card">
            <strong>Text</strong>
            <span>Heading 1</span>
          </div>
          <div class="hero-inspector-card">
            <strong>Size</strong>
            <span>56px</span>
          </div>
          <div class="hero-inspector-card">
            <strong>Export</strong>
            <span>PDF / PPTX</span>
          </div>
        </div>
      </div>
      <div class="hero-film-strip">
        {#each Array(8) as _, index}
          <span>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
        {/each}
      </div>
    </div>
  </article>
</section>

<section class="logo-band panel">
  <span>Designed for reusable client deck systems across</span>
  <div class="logo-row">
    {#each logos as logo}
      <strong>{logo}</strong>
    {/each}
  </div>
</section>

<MarketingNarrative />

<section class="splash-section">
  <div class="section-heading">
    <div class="eyebrow">Capabilities</div>
    <h2>Everything you need to build <span>decks that win</span></h2>
    <p class="splash-lede">
      From first draft to investor-ready, DidiDecks gives you the intelligence and control to
      build better decks, faster.
    </p>
  </div>
  <div class="feature-grid-landing feature-grid-six">
    {#each features as item}
      <article class="panel feature-card">
        <div class={`feature-icon ${item.tone}`}></div>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        <a class="feature-link" href="/pricing">Learn more</a>
      </article>
    {/each}
  </div>
</section>

<section class="splash-section">
  <div class="section-heading">
    <div class="eyebrow">Workflow</div>
    <h2>A workflow built for <span>speed and quality</span></h2>
  </div>
  <div class="workflow-grid">
    {#each workflowSteps as step}
      <article class="workflow-step">
        <div class={`workflow-step-icon ${step.tone}`}>{step.n}</div>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
      </article>
    {/each}
  </div>
</section>

<section class="splash-section">
  <div class="section-heading">
    <div class="eyebrow">Social proof</div>
    <h2>Loved by founders and investors</h2>
  </div>
  <div class="testimonial-grid">
    <article class="panel testimonial-summary">
      <h3>Teams save hours every week and ship decks investors actually love.</h3>
      <p>
        DidiDecks combines review, rebuilding, field mapping, and export quality into one system
        instead of scattering the workflow across deck files and chat threads.
      </p>
      <a class="feature-link" href="/about">See all testimonials</a>
    </article>
    {#each testimonials as testimonial}
      <article class="panel testimonial-card">
        <p>“{testimonial.quote}”</p>
        <div class="testimonial-meta">
          <div class="testimonial-avatar">{testimonial.name[0]}</div>
          <div>
            <strong>{testimonial.name}</strong>
            <span>{testimonial.role} · {testimonial.company}</span>
          </div>
        </div>
      </article>
    {/each}
  </div>
</section>

<section class="panel cta-band">
  <div class="cta-copy">
    <div class="eyebrow">Ready to build decks that win?</div>
    <h2>Join founders and teams using DidiDecks to build smarter, faster, and better investor decks.</h2>
  </div>
  <div class="hero-actions">
    <a class="primary-button" href="/auth/sign-up">Get Started Free</a>
    <a class="ghost-button" href="/contact">Book a Demo</a>
  </div>
</section>

<section class="splash-section">
  <div class="section-heading">
    <div class="eyebrow">Reference continuity</div>
    <h2>What the active app should keep inheriting</h2>
  </div>
  <div class="spec-grid">
    {#each references as item}
      <article class="panel feature-card spec-link">
        <div class="eyebrow">{item.tag}</div>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </article>
    {/each}
  </div>
</section>
