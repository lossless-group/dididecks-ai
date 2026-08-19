# Route Tree

Active app: `apps/frontend`

Public routes:

- `src/routes/(public)/+page.svelte`
- `src/routes/(public)/about/+page.svelte`
- `src/routes/(public)/pricing/+page.svelte`
- `src/routes/(public)/contact/+page.svelte`
- `src/routes/(public)/legal/privacy/+page.svelte`
- `src/routes/(public)/legal/terms/+page.svelte`
- `src/routes/(public)/auth/sign-in/+page.svelte`
- `src/routes/(public)/auth/sign-up/+page.svelte`
- `src/routes/(public)/billing/success/+page.svelte`
- `src/routes/(public)/billing/cancel/+page.svelte`

Authenticated app routes:

- `src/routes/(app)/dashboard/+page.svelte`
- `src/routes/(app)/dashboard/+page.ts`
- `src/routes/(app)/decks/+page.svelte`
- `src/routes/(app)/decks/+page.ts`
- `src/routes/(app)/decks/new/+page.svelte`
- `src/routes/(app)/decks/[deckId]/+page.svelte`
- `src/routes/(app)/decks/[deckId]/+page.ts`
- `src/routes/(app)/account/settings/+page.svelte`
- `src/routes/(app)/admin/ai-providers/+page.svelte`
- `src/routes/(app)/admin/ai-providers/+page.ts`

Deck workspace routes:

- `src/routes/(app)/decks/[deckId]/editor/+page.svelte`
- `src/routes/(app)/decks/[deckId]/editor/+page.ts`
- `src/routes/(app)/decks/[deckId]/map/+page.svelte`
- `src/routes/(app)/decks/[deckId]/map/+page.ts`
- `src/routes/(app)/decks/[deckId]/smart-edit/+page.svelte`
- `src/routes/(app)/decks/[deckId]/smart-edit/+page.ts`
- `src/routes/(app)/decks/[deckId]/rebuild/+page.svelte`
- `src/routes/(app)/decks/[deckId]/rebuild/+page.ts`
- `src/routes/(app)/decks/[deckId]/review-matrix/+page.svelte`
- `src/routes/(app)/decks/[deckId]/review-matrix/+page.ts`
- `src/routes/(app)/decks/[deckId]/comments/+page.svelte`
- `src/routes/(app)/decks/[deckId]/comments/+page.ts`
- `src/routes/(app)/decks/[deckId]/reviews/+page.svelte`
- `src/routes/(app)/decks/[deckId]/reviews/+page.ts`
- `src/routes/(app)/decks/[deckId]/scroll/+page.svelte`
- `src/routes/(app)/decks/[deckId]/scroll/+page.ts`
- `src/routes/(app)/decks/[deckId]/play/+page.svelte`
- `src/routes/(app)/decks/[deckId]/play/+page.ts`
- `src/routes/(app)/decks/[deckId]/print/+page.svelte`
- `src/routes/(app)/decks/[deckId]/print/+page.ts`
- `src/routes/(app)/decks/[deckId]/versions/+page.svelte`
- `src/routes/(app)/decks/[deckId]/versions/+page.ts`
- `src/routes/(app)/decks/[deckId]/exports/+page.svelte`
- `src/routes/(app)/decks/[deckId]/exports/+page.ts`
- `src/routes/(app)/decks/[deckId]/access/+page.svelte`
- `src/routes/(app)/decks/[deckId]/access/+page.ts`

Local API routes:

- `src/routes/api/dididecks/decks/+server.ts`
- `src/routes/api/dididecks/decks/[deckId]/+server.ts`
- `src/routes/api/dididecks/decks/[deckId]/editor/+server.ts`
- `src/routes/api/dididecks/decks/[deckId]/map/+server.ts`
- `src/routes/api/dididecks/decks/[deckId]/editable-fields/+server.ts`
- `src/routes/api/dididecks/decks/[deckId]/changes/preview/+server.ts`
- `src/routes/api/dididecks/decks/[deckId]/changes/apply/+server.ts`
- `src/routes/api/dididecks/decks/[deckId]/review-matrix/+server.ts`
- `src/routes/api/dididecks/decks/[deckId]/versions/+server.ts`
- `src/routes/api/dididecks/decks/[deckId]/exports/+server.ts`
- `src/routes/api/dididecks/decks/[deckId]/access/+server.ts`
- `src/routes/api/dididecks/decks/[deckId]/comments/+server.ts`
- `src/routes/api/dididecks/decks/[deckId]/reviews/+server.ts`
- `src/routes/api/dididecks/ai-commands/+server.ts`
- `src/routes/api/dididecks/ai-commands/[commandId]/accept/+server.ts`
- `src/routes/api/dididecks/ai-commands/[commandId]/reject/+server.ts`
- `src/routes/api/dididecks/admin/ai-providers/+server.ts`
