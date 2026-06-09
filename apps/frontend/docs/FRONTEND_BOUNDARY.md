# Frontend Boundary

This app is the active SvelteKit product frontend.

- Do not place backend secrets here.
- Do not place AI provider keys here.
- Do not place billing secrets here.
- Do not call model providers directly from the browser.

The external backend owns:

- auth
- billing
- persistence
- exports
- AI provider configuration
- deck state
- review state

This frontend may render the full product shell, but it must not become the
source of truth for persistence, billing, auth, AI command execution, or
database writes outside approved APIs.
