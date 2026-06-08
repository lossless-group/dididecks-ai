# Billing Frontend Contract

The DidiDecks frontend exposes billing UI and client-side API boundaries only.

Secrets never belong in the frontend. That includes:

- Stripe secret keys
- webhook secrets
- provider API keys
- private billing credentials

Expected backend endpoints:

- `GET /api/billing/plans`
- `GET /api/billing/me`
- `POST /api/billing/checkout`

Expected auth/session endpoint:

- `POST /api/auth/session/validate`

Important constraints:

- browser checkout success is not the source of truth
- subscription state must be confirmed by backend session and billing systems
- billing success and cancel pages are UX surfaces only
- the frontend calls backend API only
