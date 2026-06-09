# Frontend App Boundary

`apps/frontend` is the active product app.

- Frontend UI lives in `src/routes`, `src/lib/components`, and `src/lib/api`.
- Every product page now exists as an explicit SvelteKit route folder with `+page.svelte`, and data-backed pages use colocated `+page.ts` load files.
- Repo-local server routes are MVP shims only and must not be treated as the durable product backend.
- Browser code must call the backend API layer. Client components should not import server modules directly.
- The durable backend belongs outside the deployable frontend shell.
- It must not include copied AiStack backend code.
- It must not include proprietary prompt libraries or private ML logic.
- It must not commit secrets.
- AI provider keys, billing secrets, session secrets, and production persistence config stay out of public frontend code.
- The server-side model may cache session records, but it must store hashed session tokens rather than raw cookie values.
- Real production backend concerns remain separate:
  auth and sessions, billing and checkout verification, durable deck persistence, file uploads, provider credential storage, admin control logic, AI workflows, and review-state persistence.
