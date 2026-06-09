# Code Readability Guide

This guide explains how the active `apps/frontend` MVP is organized so another
developer can extend it without guessing where data or product behavior lives.

## Folder map

- `src/routes/(public)` public marketing, legal, pricing, auth, and billing-status pages
- `src/routes/(app)` authenticated product surfaces such as dashboard, deck library, editor, review, and account pages
- `src/routes/api/dididecks/*` same-origin local MVP API routes for deck flows
- `src/routes/api/account/*` same-origin local MVP API routes for account/workspace flows
- `src/lib/components/*` reusable UI shells and page components
- `src/lib/api/*` frontend-safe API clients used by load functions and components
- `src/lib/server/dididecks/*` server-only deck services, repository helpers, and guardrail logic
- `src/lib/server/account/*` server-only account, subscription, workspace, and provider-connection logic
- `src/lib/data/*` in-memory mock fixtures that stand in for a database
- `src/lib/types/*` shared product contracts used by routes, services, and UI

## Server and client boundary

- Browser code should import from `src/lib/api/*`, `src/lib/types/*`, and UI/component folders.
- Browser code should not import from `src/lib/server/*`.
- `src/routes/api/*` is the HTTP boundary between the Svelte frontend and the repo-local MVP backend.
- The repo-local backend is still backend code even though it ships inside the same SvelteKit app.
- Secrets, provider keys, billing secrets, and raw session cookies must never be added to frontend-safe modules.

## Local API route pattern

The main request flow is:

1. `+page.ts` load function or UI action calls `src/lib/api/*`
2. API helper hits a same-origin route under `/api/dididecks/*` or `/api/account/*`
3. Route file validates params/body and calls a server service
4. Service applies product behavior and permission checks
5. Repository or mock data module returns in-memory records
6. Route returns a typed JSON response back to the page

Use this separation when adding new features:

- route = HTTP contract and validation
- service = product behavior and orchestration
- repository/data = persistence shape, currently mock-backed

## Mock repository limitation

- The current MVP uses in-memory arrays and mutable objects.
- Data may reset across server restarts or deployments.
- This is intentionally shaped like a future database-backed backend, but it is not production persistence.
- Export jobs, billing checkout, uploads, and session validation are still product surfaces only.

## Account and customer model

The account layer currently models:

- user
- workspace
- membership
- customer account number
- subscription plan and paid status
- deck ownership
- provider connection state
- safe connection events
- hashed session-token storage

`user-001` and `workspace-001` are the primary demo path. Other mock records show trial, invited, and alternate workspace states.

## AI command proposal flow

The AI command flow is intentionally conservative:

1. user issues a command
2. `/api/dididecks/ai-commands` creates a proposal
3. proposal is stored in local mock state
4. deck content does not mutate yet
5. accept route applies the proposal only after local guardrail checks
6. reject route records the decision without mutating the deck

This keeps the MVP explicit about AI being proposal-driven rather than silently mutating content.

## Guardrail handoff flow

- `src/lib/server/dididecks/guardrails.ts` is a local heuristic only.
- It exists to explain where future evaluation logic belongs.
- Production provider output should not be accepted without a real guardrail/evaluation layer.

## How to add a new page

1. Create the SvelteKit route under `src/routes`
2. Add a `+page.ts` loader if the page needs backend data
3. Call typed helpers from `src/lib/api/*`
4. Keep page copy explicit when data is mock-backed or backend-dependent

## How to add a new API route

1. Add a `+server.ts` file under `src/routes/api/...`
2. Add a short module comment saying it is a local MVP endpoint
3. Validate required params and request body fields
4. Delegate to a server service rather than importing mock data directly
5. Return frontend-safe JSON only

## How to add a new mock-backed service method

1. Define or reuse shared types in `src/lib/types/*`
2. Add or update mock fixtures in `src/lib/data/*`
3. Add repository helpers if the data access shape matters
4. Add a service method for product behavior and entitlement checks
5. Expose the result through an API route
6. Consume it from `src/lib/api/*`
