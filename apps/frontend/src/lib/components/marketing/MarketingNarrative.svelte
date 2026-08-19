<script lang="ts">
  import { loopDiagram, northStars, principles, siblingSpecs, useCases } from '$lib/data/marketing';
</script>

<section class="splash-section marketing-block">
  <div class="section-heading">
    <div class="eyebrow">The bar</div>
    <h2>The due diligence bar is the bar.</h2>
    <p class="splash-lede">
      DidiDecks is built for receiving-side due diligence workflows where a claim without source access
      is a vibe, not a substantiation. The product exists to keep decks playable, portable, and backable.
    </p>
  </div>
</section>

<section class="splash-section">
  <div class="section-heading">
    <div class="eyebrow">North stars</div>
    <h2>Two hard targets.</h2>
  </div>
  <div class="marketing-split">
    {#each northStars as item}
      <article class="panel feature-card">
        <div class="eyebrow">{item.tag}</div>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </article>
    {/each}
  </div>
</section>

<section class="splash-section">
  <div class="section-heading">
    <div class="eyebrow">Design principles</div>
    <h2>Seven recurring needs.</h2>
    <p class="splash-lede">
      These are not optional nice-to-haves. Together they define the category gap single-deck tools do not fill.
    </p>
  </div>
  <div class="principles-grid">
    {#each principles as item}
      <article class="panel feature-card">
        <div class="eyebrow">{item.n}</div>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </article>
    {/each}
  </div>
</section>

<section class="splash-section">
  <div class="section-heading">
    <div class="eyebrow">System map</div>
    <h2>The loop.</h2>
    <p class="splash-lede">
      Positioned against the systems gap, not against any single-deck tool. End to end for repeat, high-stakes, time-pressured work.
    </p>
  </div>
  <article class="panel marketing-system-map">
    <pre>{loopDiagram}</pre>
  </article>
</section>

<section class="splash-section">
  <div class="section-heading">
    <div class="eyebrow">Use cases</div>
    <h2>Who the system is for.</h2>
  </div>
  <div class="card-grid-3 route-grid">
    {#each useCases as item}
      <article class="panel feature-card">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </article>
    {/each}
  </div>
</section>

<section class="splash-section">
  <div class="section-heading">
    <div class="eyebrow">Specs and explorations</div>
    <h2>What is written down so far.</h2>
  </div>
  <div class="spec-grid">
    {#each siblingSpecs as item}
      <a class="panel feature-card spec-link" href={item.href}>
        <div class="eyebrow">{item.tag}</div>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </a>
    {/each}
  </div>
</section>
