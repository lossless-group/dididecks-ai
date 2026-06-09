<script lang="ts">
  import { page } from '$app/stores';
  import DidiDecksLogo from './DidiDecksLogo.svelte';

  const mainItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/decks', label: 'Decks' },
    { href: '/decks/new', label: 'Create Deck' },
    { href: '/admin/ai-providers', label: 'Provider Status' },
    { href: '/account/settings', label: 'Account' }
  ];

  const reviewItems = [
    { href: '/map', label: 'Deck Map' },
    { href: '/editor', label: 'Editor' },
    { href: '/smart-edit', label: 'Smart Edit' },
    { href: '/rebuild', label: 'Rebuild' },
    { href: '/review-matrix', label: 'Review Matrix' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/comments', label: 'Comments' },
    { href: '/scroll', label: 'Scroll View' },
    { href: '/play', label: 'Play Mode' },
    { href: '/print', label: 'Print View' }
  ];

  const platformItems = [
    { href: '/versions', label: 'Versions' },
    { href: '/access', label: 'Access' }
  ];

  const accountItems = [
    { href: '/account/settings', label: 'Settings' }
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
      '/admin/ai-providers',
      '/decks/new',
      '/account/settings',
      '/'
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
    <div class="sidebar-label">Platform</div>
    <nav class="sidebar-nav compact">
      {#each platformItems as item}
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
