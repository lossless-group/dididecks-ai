<script lang="ts">
  export let compact = false;
  export let subtitle = 'Deck operating system';
  export let href = '/';
  export let className = '';
</script>

<a class={`brand ${className}`.trim()} href={href} aria-label="DidiDecks home">
  <span class="dd-logo-mark" aria-hidden="true">
    <svg viewBox="0 0 64 64" role="img" focusable="false">
      <rect x="12" y="14" width="30" height="38" rx="9" fill="#22d3ee" opacity="0.36" />
      <rect x="20" y="10" width="30" height="40" rx="10" fill="#8b5cf6" opacity="0.64" />
      <path
        d="M26 8h14c8.837 0 16 7.163 16 16v8c0 8.837-7.163 16-16 16H26c-1.105 0-2-.895-2-2V10c0-1.105.895-2 2-2Z"
        fill="#ec4899"
      />
      <path
        d="M35 18h5.5c6.351 0 11.5 5.149 11.5 11.5S46.851 41 40.5 41H35c-1.105 0-2-.895-2-2V20c0-1.105.895-2 2-2Z"
        fill="#07111f"
        opacity="0.88"
      />
      <path
        d="M37 22h3.5c4.694 0 8.5 3.806 8.5 8.5S45.194 39 40.5 39H37V22Z"
        fill="#ffffff"
        opacity="0.14"
      />
    </svg>
  </span>
  <span class="brand-meta">
    <strong>DidiDecks</strong>
    {#if !compact}
      <small>{subtitle}</small>
    {/if}
  </span>
</a>
