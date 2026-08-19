# Session And Connection Cache

The MVP stores session and connection metadata, not raw secrets.

Server-side session records include:

- `sessionTokenHash`
- `userId`
- `workspaceId`
- `status`
- `expiresAt`
- `lastSeenAt`
- optional hashed request metadata

The MVP does not store:

- raw cookie values
- raw OAuth tokens
- raw API keys
- raw session secrets

Provider connections store:

- provider kind
- scope
- status
- key last four only
- default model
- last tested timestamp

This is a mock in-memory cache only. Production requires encrypted storage and a real database.
