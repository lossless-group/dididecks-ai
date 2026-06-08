<script lang="ts">
  import PageHeader from '$lib/components/common/PageHeader.svelte';
  import { mockPlans } from '$lib/data/mockPlans';
  import type { BillingPlan } from '$lib/types/billing';

  const plansPromise = Promise.resolve(mockPlans);

  const ctaMap: Record<string, { label: string; href: string }> = {
    Starter: { label: 'Start free', href: '/auth/sign-up' },
    Growth: { label: 'Upgrade to Pro', href: '/billing/success' },
    Capital: { label: 'Contact for Team', href: '/contact' }
  };
</script>

<svelte:head><title>Pricing | DidiDecks</title></svelte:head>
<PageHeader eyebrow="Pricing" title="Plans for investor-grade deck operations" copy="Billing remains backend-owned. This page defines the commercial surface and API boundary without exposing checkout secrets." />

{#snippet planCard(plan: BillingPlan)}
  <article class="panel plan-card">
    <div class="eyebrow">{plan.name}</div>
    <h2>{plan.price}<small>/month</small></h2>
    <p>{plan.description}</p>
    <ul>
      {#each plan.features as feature}
        <li>{feature}</li>
      {/each}
    </ul>
    <a class={plan.name === 'Growth' ? 'primary-button' : 'ghost-button'} href={ctaMap[plan.name].href}>{ctaMap[plan.name].label}</a>
  </article>
{/snippet}

{#await plansPromise}
  <section class="panel">
    <p>Loading plans...</p>
  </section>
{:then plans}
  <section class="plan-grid">
    {#each plans as plan}
      {@render planCard(plan)}
    {/each}
  </section>
{/await}

<section class="panel">
  <div class="eyebrow">Billing boundary</div>
  <p class="muted-copy">
    Checkout, subscription confirmation, portal access, and invoicing status remain backend/API dependent.
    The frontend contract for the next step is `GET /api/billing/plans`, `GET /api/billing/me`,
    and `POST /api/billing/checkout`.
  </p>
</section>
