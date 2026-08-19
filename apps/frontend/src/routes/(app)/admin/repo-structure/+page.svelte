<script lang="ts">
  import type { PageData } from './$types';
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  export let data: PageData;

  const folders = [
    {
      path: data.sourceOfTruth.frontend,
      role: 'Real frontend app',
      detail: 'This is the SvelteKit app with the public pages, private app routes, and the real route tree Vercel should compile.'
    },
    {
      path: data.sourceOfTruth.shell,
      role: 'Deck shell runtime',
      detail: 'This holds the shell/runtime layer and related deck infrastructure code, not the main marketing/product frontend.'
    },
    {
      path: data.sourceOfTruth.backend,
      role: 'Backend',
      detail: 'This is the backend app for Railway or backend deployment, not the Vercel frontend.'
    },
    {
      path: data.sourceOfTruth.shared,
      role: 'Shared contracts',
      detail: 'This package holds shared types and API/data contracts used by the frontend.'
    }
  ];
</script>

<PageHeader
  eyebrow="Admin"
  title="Repo structure"
  copy="This page shows which folders are real app sources, which folders are shared infrastructure, and which ones are duplicates that cause confusion."
/>

<section class="route-grid route-grid-wide">
  <article class="panel">
    <div class="eyebrow">Source of truth</div>
    <div class="stack-list">
      {#each folders as folder}
        <div class="list-card">
          <div>
            <strong>{folder.path}</strong>
            <p>{folder.role}</p>
            <small>{folder.detail}</small>
          </div>
        </div>
      {/each}
    </div>
  </article>

  <article class="panel">
    <div class="eyebrow">Deployment</div>
    <div class="stack-list">
      <div class="list-card">
        <div>
          <strong>Vercel</strong>
          <p>{data.deployment.vercel}</p>
        </div>
      </div>
      <div class="list-card">
        <div>
          <strong>Railway</strong>
          <p>{data.deployment.railway}</p>
        </div>
      </div>
    </div>
  </article>
</section>

<section class="panel">
  <div class="eyebrow">Duplicates and confusion points</div>
  <div class="stack-list">
    {#each data.duplicates as duplicate}
      <div class="list-card">
        <div>
          <strong>{duplicate.path}</strong>
          <p>{duplicate.status}</p>
          <small>{duplicate.note}</small>
        </div>
      </div>
    {/each}
  </div>
</section>

<section class="panel">
  <div class="eyebrow">Practical rule</div>
  <p class="muted-copy">
    If you want to know where pages are built, look in <strong>`apps/frontend/src/routes`</strong>. If you want to know what
    Vercel should build, use the frontend app under <strong>`apps/frontend`</strong>. The top-level <strong>`frontend`</strong>
    folder is a duplicate copy and should not be treated as the live app source.
  </p>
</section>
