# Deck SaaS To Svelte Migration

This migration uses `~/Documents/andrea-projects-workspace/aistack_codes/deck-saas` as reference material only.

React and Next.js runtime code were not copied blindly into DidiDecks. The active implementation target is the SvelteKit app at `apps/frontend` inside `dididecks-ai`.

## Source and target

- Source reference: `deck-saas/front-end`
- Target app: `dididecks-ai/apps/frontend`

## Framework comparison

- `deck-saas/front-end`: Next.js 15 + React 19 + TypeScript
- `dididecks-ai/apps/frontend`: SvelteKit + Svelte 5 + TypeScript

## Classification

| deck-saas source | useful product idea | target Svelte file/folder | decision | notes |
| --- | --- | --- | --- | --- |
| `front-end/app/page.tsx` | product-led landing page | `apps/frontend/src/routes/(public)/+page.svelte` | `PORT_TO_SVELTE_NOW` | Rebuild in Svelte, keep messaging and surface hierarchy only |
| `front-end/app/about/page.tsx` | about/product framing | `apps/frontend/src/routes/(public)/about/+page.svelte` | `PORT_TO_SVELTE_NOW` | Use product copy patterns, not React markup |
| `front-end/app/pricing/page.tsx`, `app/billing/*` | pricing and billing result surfaces | `apps/frontend/src/routes/(public)/pricing`, `billing/*` | `PORT_TO_SVELTE_NOW` | UI only, backend checkout remains separate |
| `front-end/app/auth/*` | auth shell surfaces | `apps/frontend/src/routes/(public)/auth/*` | `PORT_TO_SVELTE_NOW` | No OAuth secrets or fake auth |
| `front-end/app/dashboard/page.tsx` | workspace dashboard layout | `apps/frontend/src/routes/(app)/dashboard/+page.svelte` | `PORT_TO_SVELTE_NOW` | Port product structure only |
| `front-end/app/decks*` | deck library and deck detail flow | `apps/frontend/src/routes/(app)/decks*` | `PORT_TO_SVELTE_NOW` | Adapt to Svelte route model |
| `front-end/components/editor/*` | editor shell concepts | `apps/frontend/src/lib/components/editor/*` | `PORT_TO_SVELTE_NOW` | Reimplemented as Svelte components |
| `front-end/components/workflows/*` | map, smart edit, rebuild workflow concepts | `apps/frontend/src/routes/(app)/decks/[deckId]/*` | `PORT_TO_SVELTE_NOW` | Keep only safe workflow ideas |
| `front-end/lib/api/*` | frontend API boundary ideas | `apps/frontend/src/lib/api/*` | `PORT_TO_SVELTE_NOW` | Endpoint shapes only, no backend logic |
| `front-end/lib/types/*` | product data contracts | `apps/frontend/src/lib/types/*` | `PORT_TO_SVELTE_NOW` | Normalize to target app types |
| `front-end/components/data-assets/*` | asset audit workspace | not yet mapped | `KEEP_AS_REFERENCE` | Richer workflow than current target scope |
| `front-end/components/guardrails/*` | design/guardrail workflow | not yet mapped | `KEEP_AS_REFERENCE` | Useful later after backend rules/API mature |
| `front-end/app/share/[token]/page.tsx` | share-token surface | not yet mapped | `NEEDS_BACKEND_FIRST` | Requires backend validation and access rules |
| `front-end/app/api/*` | Next.js local route handlers | none | `IGNORE` | Wrong runtime model for SvelteKit target |
| `deck-backend/` | backend implementation | none | `KEEP_AS_REFERENCE` | Separate backend concern, not ported into frontend |

## Risks

- `deck-saas` contains multiple nested and legacy folders; only `front-end/` should be treated as primary frontend reference.
- Some route concepts in `deck-saas` depend on backend capabilities that do not yet exist in `dididecks-ai`.
- Any billing, auth, share token, or AI provider flow must stay backend-dependent.
