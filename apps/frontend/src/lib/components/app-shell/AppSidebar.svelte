<script lang="ts">
  import { page } from '$app/stores';
  import DidiDecksLogo from './DidiDecksLogo.svelte';

  const mainItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/decks', label: 'Decks' },
    { href: '/clients', label: 'Clients' },
    { href: '/templates', label: 'Templates' },
    { href: '/analytics', label: 'Analytics' }
  ];

  const reviewItems = [
    { href: '/scroll', label: 'Scroll Review' },
    { href: '/play', label: 'Play Mode' },
    { href: '/review-matrix', label: 'Review Matrix' },
    { href: '/comments', label: 'Comments' },
    { href: '/reviews', label: 'Feedback Learning' }
  ];

  const aiStackItems = [
    { href: '/guardrails', label: 'Guardrails' },
    { href: '/audit', label: 'Audit Log' },
    { href: '/admin/ai-providers', label: 'API Status' },
    { href: '/sync', label: 'Backend Sync' }
  ];

  const accountItems = [
    { href: '/account/settings', label: 'Settings' },
    { href: '/billing', label: 'Billing' },
    { href: '/support', label: 'Support' }
  ];

  $: pathname = $page.url.pathname;
  $: deckMatch = pathname.match(/^\/decks\/([^/]+)/);
  $: deckId = deckMatch?.[1] ?? null;
  $: deckLabel = deckId ? deckId.replace(/^deck-/, 'Deck ') : 'No deck selected';
  $: deckItems = deckId
    ? [
        { href: `/decks/${deckId}`, label: 'Overview' },
        { href: `/decks/${deckId}/map`, label: 'Deck Map' },
        { href: `/decks/${deckId}/editor`, label: 'Interactive Editor' },
        { href: `/decks/${deckId}/smart-edit`, label: 'Smart Edit' },
        { href: `/decks/${deckId}/rebuild`, label: 'Rebuild & Apply' },
        { href: `/decks/${deckId}/versions`, label: 'Versions' },
        { href: `/decks/${deckId}/exports`, label: 'Exports' }
      ]
    : [];

  function resolveHref(baseHref: string) {
    if (!deckId) {
      return baseHref === '/admin/ai-providers' || baseHref === '/account/settings' ? baseHref : '/decks';
    }

    const globalRoutes = new Set([
      '/dashboard',
      '/decks',
      '/clients',
      '/templates',
      '/analytics',
      '/admin/ai-providers',
      '/account/settings',
      '/billing',
      '/support'
    ]);

    return globalRoutes.has(baseHref) ? baseHref : `/decks/${deckId}${baseHref}`;
  }
</script>

<aside class="app-sidebar panel">
  <DidiDecksLogo className="sidebar-brand" subtitle="Portable slide infrastructure" />

  <a class="sidebar-cta" href="/decks/new">New Deck</a>

  <div class="sidebar-section">
    <div class="sidebar-label">Main</div>
    <nav class="sidebar-nav">
      {#each mainItems as item}
        <a class:active={pathname === item.href || pathname.startsWith(`${item.href}/`)} href={item.href}>{item.label}</a>
      {/each}
    </nav>
  </div>

  <div class="sidebar-section current-deck-panel">
    <div class="sidebar-label">Current deck</div>
    <strong>{deckLabel}</strong>
    <small>{deckId ? 'Status: active workspace route' : 'Select a deck to unlock deck controls'}</small>
    {#if deckItems.length}
      <nav class="sidebar-nav compact">
        {#each deckItems as item}
          <a class:active={pathname === item.href || pathname.startsWith(`${item.href}/`)} href={item.href}>{item.label}</a>
        {/each}
      </nav>
    {/if}
  </div>

  <div class="sidebar-section">
    <div class="sidebar-label">Review</div>
    <nav class="sidebar-nav compact">
      {#each reviewItems as item}
        <a
          class:active={pathname === resolveHref(item.href) || pathname.startsWith(`${resolveHref(item.href)}/`)}
          href={resolveHref(item.href)}
        >
          {item.label}
        </a>
      {/each}
    </nav>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-label">AIStack</div>
    <nav class="sidebar-nav compact">
      {#each aiStackItems as item}
        <a
          class:active={pathname === resolveHref(item.href) || pathname.startsWith(`${resolveHref(item.href)}/`)}
          href={resolveHref(item.href)}
        >
          {item.label}
        </a>
      {/each}
    </nav>
  </div>

  <div class="sidebar-assistant-card">
    <strong>AI Assistant</strong>
    <p>Ask for slide improvements, guardrailed edits, review synthesis, or export-ready rebuilds.</p>
    <a class="ghost-button" href={deckId ? `/decks/${deckId}/smart-edit` : '/decks'}>Open Assistant</a>
  </div>

  <div class="sidebar-section sidebar-section-end">
    <nav class="sidebar-nav compact">
      {#each accountItems as item}
        <a class:active={pathname === item.href || pathname.startsWith(`${item.href}/`)} href={item.href}>{item.label}</a>
      {/each}
    </nav>
  </div>

  <div class="sidebar-user">
    <div class="sidebar-user-avatar">A</div>
    <div>
      <strong>Andrea</strong>
      <small>Founder</small>
    </div>
  </div>
</aside>
