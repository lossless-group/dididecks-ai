# Local API Contract

The local MVP contract lives under:

`/api/dididecks/*`

and

`/api/account/*`

This is a repo-local SvelteKit API only. It exists so the product app can work locally without importing a separate backend.

It is not a claim of production persistence or production architecture.

Play mode currently uses local mock-backed slide data through the same-origin editor path:

- `/api/dididecks/decks/[deckId]/editor`

The current MVP play surface is keyboard-driven via top-level `<svelte:window>` handling in the frontend and is intended only for local/product-surface behavior.

Production Play mode should use backend play-surface data rather than assuming the local editor payload is the final runtime source of truth.

Current route coverage includes:

- `/api/dididecks/decks`
- `/api/dididecks/decks/[deckId]`
- `/api/dididecks/decks/[deckId]/editor`
- `/api/dididecks/decks/[deckId]/map`
- `/api/dididecks/decks/[deckId]/editable-fields`
- `/api/dididecks/decks/[deckId]/changes/preview`
- `/api/dididecks/decks/[deckId]/changes/apply`
- `/api/dididecks/decks/[deckId]/review-matrix`
- `/api/dididecks/decks/[deckId]/versions`
- `/api/dididecks/decks/[deckId]/exports`
- `/api/dididecks/decks/[deckId]/access`
- `/api/dididecks/decks/[deckId]/comments`
- `/api/dididecks/decks/[deckId]/reviews`
- `/api/dididecks/ai-commands`
- `/api/dididecks/admin/ai-providers`

Account route coverage includes:

- `/api/account/me`
- `/api/account/me/workspaces`
- `/api/account/me/subscription`
- `/api/account/me/provider-connections`
- `/api/account/me/connection-events`

Key data pages now use colocated `+page.ts` files and load through same-origin `/api/dididecks/*` routes where practical.

The route files now include short boundary comments and basic parameter checks
so the HTTP contract is easier to follow during handoff.
