# MVP Backend Stubs

The local backend-like behavior lives inside:

- `src/routes/api/dididecks/*`
- `src/lib/server/dididecks/*`
- `src/routes/api/account/*`
- `src/lib/server/account/*`

This layer is intentionally thin, modular, and replaceable.

Future dedicated backend work can swap these internals without changing the product route structure.

Play mode notes:

- the local MVP uses mock slide data exposed through the SvelteKit local API
- keyboard behavior is handled in the frontend via `<svelte:window>`
- production Play mode should use backend-provided play-surface data
- Scroll-UI and Play-UI remain separate implementations that share deck identity and underlying data, not identical runtime surfaces

Explicit mock-backed route groups now include:

- public marketing and auth surfaces
- dashboard and deck library routes
- deck control-room routes
- editor, map, smart-edit, rebuild
- review matrix, comments, reviews, versions, exports, access
- admin AI provider management

These routes compile against the repo-local server layer today, but production persistence still requires a real database and backend storage.

The service, repository, and route modules are now intentionally commented so a
developer can trace where HTTP validation stops and product behavior begins.
