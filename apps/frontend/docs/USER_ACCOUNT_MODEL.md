# User Account Model

The repo-local SvelteKit MVP now includes a mock-backed user and account model.

Primary entities:

- `users`
- `workspaces`
- `memberships`
- `customer_accounts`
- `subscriptions`
- `deck_ownership`
- `auth_sessions`
- `provider_connections`
- `connection_events`

This layer exists to answer:

- who the current user is
- which workspace is active
- which internal customer number owns the workspace
- which plan and paid status apply
- which decks belong to the workspace
- which provider connections are configured
- which safe session and connection events are visible in the UI

The current implementation is in-memory only and lives inside the SvelteKit repo-local backend.

The related server modules are now annotated to make clear which records are
frontend-safe, which identifiers are customer-account level, and why sessions
store token hashes rather than raw cookie values.
