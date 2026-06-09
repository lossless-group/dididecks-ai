<script lang="ts">
  import type { DeckReviewMatrixItem } from '$lib/types/dididecks';
  import SurfaceReviewMatrix from './SurfaceReviewMatrix.svelte';

  export let items: DeckReviewMatrixItem[] = [];
</script>

<section class="panel">
  <div class="eyebrow">Slide readiness</div>
  <SurfaceReviewMatrix {items} />
</section>
