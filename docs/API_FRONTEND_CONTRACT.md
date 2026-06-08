# API Frontend Contract

The DidiDecks frontend uses API contract ideas from `deck-saas` as reference only.

No backend runtime code, secret, provider key, or billing credential has been copied into this repo.

## Active frontend API wrappers

- `apps/frontend/src/lib/api/client.ts`
- `apps/frontend/src/lib/api/auth.ts`
- `apps/frontend/src/lib/api/billing.ts`
- `apps/frontend/src/lib/api/dididecks.ts`

## Frontend-owned responsibility

- route UI
- page state
- safe client wrappers
- product copy and workflow surfaces

## Backend-owned responsibility

- auth/session truth
- billing plan truth and checkout creation
- subscription confirmation
- deck persistence
- uploads
- AI provider configuration
- export job execution
- share-token validation

## Endpoint direction

- `POST /api/auth/session/validate`
- `GET /api/billing/plans`
- `GET /api/billing/me`
- `POST /api/billing/checkout`
- deck CRUD and workflow endpoints through the existing `dididecks` API wrapper

## Constraint

The frontend may use a public API base URL only. Secrets stay out of frontend code.
