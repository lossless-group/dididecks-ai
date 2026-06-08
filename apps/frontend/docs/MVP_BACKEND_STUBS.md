# MVP Backend Stubs

The local backend-like behavior lives inside:

- `src/routes/api/dididecks/*`
- `src/lib/server/dididecks/*`

This layer is intentionally thin, modular, and replaceable.

Future dedicated backend work can swap these internals without changing the product route structure.
