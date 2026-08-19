<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';

  export type SeoContentItem = {
    title: string;
    body: string;
    href?: string;
    label?: string;
  };

  export type SeoContentSection = {
    eyebrow?: string;
    title: string;
    body?: string;
    items?: SeoContentItem[];
  };

  export let eyebrow = '';
  export let title = '';
  export let copy = '';
  export let highlights: SeoContentItem[] = [];
  export let sections: SeoContentSection[] = [];
  export let faqs: Array<{ question: string; answer: string }> = [];
  export let ctas: Array<{ label: string; href: string; tone?: 'primary' | 'ghost' }> = [];
</script>

<PageHeader {eyebrow} {title} {copy} />

{#if highlights.length}
  <section class="route-grid route-grid-wide">
    {#each highlights as item}
      <article class="panel feature-card">
        {#if item.label}<div class="eyebrow">{item.label}</div>{/if}
        <h2>{item.title}</h2>
        <p>{item.body}</p>
        {#if item.href}
          <a class="ghost-button" href={item.href}>Learn more</a>
        {/if}
      </article>
    {/each}
  </section>
{/if}

{#if sections.length}
  <section class="route-grid route-grid-wide">
    {#each sections as section}
      <article class="panel">
        {#if section.eyebrow}<div class="eyebrow">{section.eyebrow}</div>{/if}
        <h2>{section.title}</h2>
        {#if section.body}<p class="muted-copy">{section.body}</p>{/if}
        {#if section.items?.length}
          <div class="stack-list">
            {#each section.items as item}
              <div class="list-card">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
                {#if item.href}
                  <a class="ghost-button" href={item.href}>{item.label ?? 'Open'}</a>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </article>
    {/each}
  </section>
{/if}

{#if faqs.length}
  <section class="panel">
    <div class="eyebrow">FAQ</div>
    <div class="stack-list">
      {#each faqs as faq}
        <div class="list-card">
          <div>
            <strong>{faq.question}</strong>
            <p>{faq.answer}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>
{/if}

{#if ctas.length}
  <section class="panel">
    <div class="eyebrow">Next step</div>
    <div class="hero-actions">
      {#each ctas as cta}
        <a class={cta.tone === 'ghost' ? 'ghost-button' : 'primary-button'} href={cta.href}>{cta.label}</a>
      {/each}
    </div>
  </section>
{/if}
