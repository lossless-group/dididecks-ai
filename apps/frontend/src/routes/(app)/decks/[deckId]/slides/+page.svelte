<script lang="ts">
  import type { PageData } from './$types';
  import DeckWorkspaceShell from '$lib/components/deck-workspace/DeckWorkspaceShell.svelte';
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  export let data: PageData;
</script>

<DeckWorkspaceShell deckId={data.deckId}>
  <PageHeader eyebrow="Slides" title="Slide registry" copy="Inspect slide identity, order, and render support independently from the current editor or presentation surface." />

  <section class="panel">
    <div class="stack-list">
      {#each data.slides as slide, index}
        <div class="list-card">
          <div>
            <strong>{index + 1}. {slide.title}</strong>
            <p>{slide.slideKey ?? slide.id} · {slide.slideType ?? 'slide'}</p>
          </div>
          <div class="hero-actions">
            <a class="ghost-button" href={`/decks/${data.deckId}/editor?slide=${slide.id}`}>Edit</a>
            <a class="ghost-button" href={`/decks/${data.deckId}/scroll#scroll-slide-${slide.id}`}>Scroll</a>
          </div>
        </div>
      {/each}
    </div>
  </section>
</DeckWorkspaceShell>
