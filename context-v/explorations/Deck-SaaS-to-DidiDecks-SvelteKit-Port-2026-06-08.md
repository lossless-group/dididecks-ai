---
title: "Deck SaaS to DidiDecks SvelteKit Port — 2026-06-08"
lede: "Controlled comparison and selective migration note for using `deck-saas` as product/reference material while keeping `dididecks-ai/apps/frontend` as the active SvelteKit implementation target."
date_authored_initial_draft: 2026-06-08
date_authored_current_draft: 2026-06-08
date_last_updated: 2026-06-08
date_first_published: 2026-06-08
at_semantic_version: 0.0.1.0
status: Active
augmented_with: Codex on GPT-5
category: Exploration
tags:
  - SvelteKit
  - Deck-SaaS
  - Migration
  - Frontend-Boundary
  - Product-Surfaces
authors:
  - Michael Staton
date_created: 2026-06-08
date_modified: 2026-06-08
---

# Deck SaaS to DidiDecks SvelteKit Port

## Core Decision

The correct target for active product work is:

- `dididecks-ai/apps/frontend`

and the correct role for `deck-saas` is:

- **reference material**

This is the key architectural decision that keeps the repo coherent. `deck-saas/front-end/` is useful because it captures product surface ideas and route coverage, but it is a Next.js/React app. `dididecks-ai/apps/frontend/` is the active SvelteKit implementation and should stay that way.

## Repo Reality

### Source reference

Useful source tree:

- `~/Documents/andrea-projects-workspace/aistack_codes/deck-saas/front-end`

Framework:

- Next.js 15
- React 19
- TypeScript

It also contains other folders that should not be treated as the primary frontend reference:

- `.next/`
- `deck-backend/`
- `clean-product/`
- nested clones / legacy material

### Target repo

Target tree:

- `~/Documents/andrea-projects-workspace/aistack_codes/dididecks-ai`

Active frontend:

- `apps/frontend`

Framework:

- SvelteKit
- Svelte 5
- TypeScript
- `pnpm` workspace

Reference-only siblings:

- `apps/deck-shell`
- `splash`

## What Was Worth Porting

### Port now

These ideas were safe to port immediately into Svelte:

- landing page and public route family
- about/contact/pricing/legal/auth shells
- dashboard layout
- deck library and deck detail structure
- deck editor shell
- slide navigation and canvas layout
- comments / versions / exports side-panels
- map / smart-edit / rebuild page shapes
- API wrapper patterns
- frontend data contracts and mock state

### Keep as reference

These are useful but not yet first-priority runtime work:

- richer data-assets audit surfaces
- guardrail workflow UI
- some design-system and component-library artifacts
- more specialized share/play/scroll runtime variations

### Needs backend first

These should not be pushed further in frontend-first mode:

- real checkout flow
- real session truth
- upload persistence
- share-token validation
- AI provider orchestration
- export execution

## What Was Deliberately Not Done

- No React component code was copied directly into the Svelte app.
- No Next.js route handlers were transplanted as-is.
- No backend secret or provider key was introduced.
- No billing secret or fake payment logic was added.
- No repo restructuring was done to force-fit `deck-saas` into Michael's tree.

## Outcome of the First Port Pass

`apps/frontend/` now carries the active product surface for:

- public/commercial pages
- billing success/cancel
- auth shell pages
- dashboard and decks flow
- deck overview / map / smart-edit / rebuild / access / exports / versions
- editor shell with comments / versions / exports side panels

The route family is present, buildable, and aligned to the product story.

## Remaining Architectural Truth

The frontend is now strong enough to demo and review, but it is still operating as:

- a product surface
- a mock/local-state workflow shell
- an API-boundary client

It is **not yet** the complete deployed product runtime because the backend still owns:

- auth/session validation
- billing plan truth and checkout
- subscription confirmation
- deck persistence
- uploads
- AI provider configuration
- export job execution
- share-token enforcement

## Next Useful Pass

The next pass should focus on one of two things, not both at once:

1. **Backend contract connection**
   Wire the existing frontend surfaces to the real session, billing, deck CRUD, and workflow endpoints.

2. **Selective deeper UI port**
   Pull more ideas from the `deck-saas` reference set only where they add immediate product value and do not drag React assumptions into the Svelte app.

## Cross-References

- `docs/DECK_SAAS_TO_SVELTE_MIGRATION.md`
- `docs/COMPONENT_INVENTORY.md`
- `docs/API_FRONTEND_CONTRACT.md`
- `docs/BILLING_FRONTEND_CONTRACT.md`
- `docs/PUBLIC_PAGES_AND_BILLING_SURFACES.md`
