# Frontend App Boundary

`apps/frontend` is the active product app.

- Frontend UI lives in `src/routes`, `src/lib/components`, and `src/lib/api`.
- Every product page now exists as an explicit SvelteKit route folder with `+page.svelte`, and data-backed pages use colocated `+page.ts` load files.
- Repo-local backend behavior for MVP use lives only in `src/routes/api/dididecks/*` and `src/lib/server/dididecks/*`.
- Repo-local account and session behavior for MVP use lives only in `src/routes/api/account/*` and `src/lib/server/account/*`.
- Browser code must call the backend API layer. Client components should not import server modules directly.
- It may include repo-local SvelteKit server routes for MVP use, but that is still the backend boundary.
- It must not include copied AiStack backend code.
- It must not include proprietary prompt libraries or private ML logic.
- It must not commit secrets.
- AI provider keys, billing secrets, session secrets, and production persistence config stay out of public frontend code.
- The server-side model may cache session records, but it must store hashed session tokens rather than raw cookie values.
- Real production backend concerns remain separate even if the MVP backend currently runs inside the same SvelteKit deploy:
  auth and sessions, billing and checkout verification, durable deck persistence, file uploads, provider credential storage, and admin control logic.
