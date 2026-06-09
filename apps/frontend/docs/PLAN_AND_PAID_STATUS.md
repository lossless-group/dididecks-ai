# Plan And Paid Status

The MVP exposes display-only entitlements from the repo-local account layer.

Plan keys:

- `free`
- `pro`
- `team`
- `enterprise`

Paid status:

- `free`
- `trial`
- `paid`
- `past_due`
- `cancelled`

MVP entitlement rules:

- `free`: `maxDecks 3`, `maxAiCommands 10`, basic exports only
- `pro`: `maxDecks 25`, `maxAiCommands 500`, exports enabled
- `team`: `maxDecks 100`, `maxAiCommands 2000`, seats enabled
- `enterprise`: mock unlimited tier for MVP gating

These rules are currently used for mock server-side gating and UI display. Production billing enforcement still requires a real backend and durable persistence.
