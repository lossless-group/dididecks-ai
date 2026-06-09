# API Contract

All DidiDecks product routes in this frontend assume a backend-owned API
boundary.

Recommended product backend namespace:

`/api/products/dididecks/*`

Examples:

- `/api/products/dididecks/decks`
- `/api/products/dididecks/auth/session`
- `/api/products/dididecks/billing/plans`
- `/api/products/dididecks/admin/ai-providers`

The backend base URL comes from a public environment variable only.

Frontend responsibility:

- typed API clients
- route rendering
- user workflow surfaces

Backend responsibility:

- auth and session handling
- persistence
- billing
- deck state
- review state
- AI workflows
