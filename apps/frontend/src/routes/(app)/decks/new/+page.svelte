<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  const creationModes = [
    { title: 'Upload existing deck', copy: 'Bring in PPTX or PDF and map persistent fields before editing.' },
    { title: 'Start from template', copy: 'Create a fundraising, board, or LP narrative from a known structure.' },
    { title: 'Generate from brief', copy: 'Use backend AI orchestration to create a first-pass narrative shell.' }
  ];
</script>

<PageHeader eyebrow="Deck creation" title="New deck" copy="Create the next workspace object. Upload, template, and generation flows stay backend-owned but the product route is now in place." />

<section class="route-grid route-grid-wide">
  <article class="panel auth-panel">
    <div class="eyebrow">Create deck</div>
    <h2>Name the narrative and choose the input path</h2>
    <label>
      <span>Deck name</span>
      <input type="text" placeholder="Series A Investor Narrative" />
    </label>
    <label>
      <span>Audience</span>
      <select>
        <option>Investor</option>
        <option>Board</option>
        <option>LP</option>
        <option>Customer</option>
      </select>
    </label>
    <div class="hero-actions">
      <a class="primary-button" href="/decks/deck-001">Create draft deck</a>
      <a class="ghost-button" href="/dashboard">Back to dashboard</a>
    </div>
    <small>Real upload and creation requests still need the backend endpoint and storage flow.</small>
  </article>

  <article class="panel">
    <div class="eyebrow">Creation modes</div>
    <div class="stack-list">
      {#each creationModes as mode}
        <div class="list-card">
          <div>
            <strong>{mode.title}</strong>
            <p>{mode.copy}</p>
          </div>
        </div>
      {/each}
    </div>
  </article>
</section>
