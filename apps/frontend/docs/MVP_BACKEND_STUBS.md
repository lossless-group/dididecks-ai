# MVP Backend Stubs

The local backend-like behavior lives inside:

- `src/routes/api/dididecks/*`
- `src/lib/server/dididecks/*`

This layer is intentionally thin, modular, and replaceable.

Future dedicated backend work can swap these internals without changing the product route structure.

Play mode notes:

- the local MVP uses mock slide data exposed through the SvelteKit local API
- keyboard behavior is handled in the frontend via `<svelte:window>`
- production Play mode should use backend-provided play-surface data
- Scroll-UI and Play-UI remain separate implementations that share deck identity and underlying data, not identical runtime surfaces
