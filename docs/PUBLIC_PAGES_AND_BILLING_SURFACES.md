# Public Pages And Billing Surfaces

This repo now includes the commercial/public DidiDecks product surfaces in the active SvelteKit app at `apps/frontend`.

Implemented public routes:

- `/`
- `/about`
- `/pricing`
- `/billing/success`
- `/billing/cancel`
- `/contact`
- `/legal/privacy`
- `/legal/terms`
- `/auth/sign-in`
- `/auth/sign-up`

These routes are frontend surfaces only.

They do not contain:

- billing secrets
- Stripe secrets
- AI provider keys
- private auth credentials
- fake checkout processing

The frontend may call backend endpoints through the public API base URL, but the backend remains the source of truth for auth, billing, persistence, uploads, and AI provider configuration.
