# Local API Contract

The local MVP contract lives under:

`/api/dididecks/*`

This is a repo-local SvelteKit API only. It exists so the product app can work locally without importing a separate backend.

It is not a claim of production persistence or production architecture.

Play mode currently uses local mock-backed slide data through the same-origin editor path:

- `/api/dididecks/decks/[deckId]/editor`

The current MVP play surface is keyboard-driven via top-level `<svelte:window>` handling in the frontend and is intended only for local/product-surface behavior.

Production Play mode should use backend play-surface data rather than assuming the local editor payload is the final runtime source of truth.
