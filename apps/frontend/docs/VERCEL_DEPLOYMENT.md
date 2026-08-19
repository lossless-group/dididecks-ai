# Vercel Deployment

Deploy the active DidiDecks app from `apps/frontend`.

- Root directory: `apps/frontend`
- Install command: `pnpm install`
- Build command: `pnpm build`
- Framework preset: `SvelteKit`
- Adapter: `@sveltejs/adapter-vercel`

Notes:

- The repo-local API under `src/routes/api/dididecks/*` deploys as SvelteKit server functions on Vercel.
- The current repository state is in-memory only. Vercel function memory can reset between invocations and deployments.
- Production requires external persistence for decks, versions, exports, provider configuration, and uploads.
- Production also requires encrypted storage for managed provider credentials. The current MVP stores masked key state only and never returns a full secret to the frontend.
