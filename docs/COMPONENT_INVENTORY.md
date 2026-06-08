# Component Inventory

## Active target app

- `apps/frontend`
- Framework: SvelteKit + Svelte 5 + TypeScript

## Ported or implemented now

Public/commercial:

- landing page
- about
- pricing
- billing success
- billing cancel
- contact
- privacy draft
- terms draft
- sign-in shell
- sign-up shell

App shell and workspace:

- dashboard
- decks list
- new deck
- deck detail
- account settings
- map
- smart edit
- rebuild
- versions
- exports
- access

Editor components:

- `DeckEditorShell.svelte`
- `SlideNavigator.svelte`
- `SlideCanvas.svelte`
- `BlockInspector.svelte`
- `AiCommandPanel.svelte`
- `CommentsPanel.svelte`
- `VersionsPanel.svelte`
- `ExportPanel.svelte`

## Reference-only from deck-saas

- data asset audit surfaces
- guardrails workflow surfaces
- share-token runtime
- Next.js server route handlers
- React component implementations

## Remaining TODO

- connect auth shell to real backend session endpoints
- connect pricing/billing pages to real checkout/session flows
- connect deck CRUD and uploads to backend
- finish play/print/scroll/share workflows
- finish guardrails and richer review flows when backend contracts are ready
