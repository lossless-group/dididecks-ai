---
description: Remake a source deck into N clean-room design variants that play in the Scroll-UI shell
argument-hint: <Company> <client-site path> <source deck path> [N_VARIANTS=3] [DECK_SLUG=pitch] [CONTENT_POLICY=rewrite-ok] [BRAND_POLICY=client-brand] [INCLUDE_FAITHFUL=false]
---

Read `context-v/plans/Remake-Source-Deck-into-Design-Variants.md` and execute it
as the orchestrator. Read `context-v/prompts/README.md` first for the variable
contract and the filesystem contract.

Arguments: $ARGUMENTS

Map the arguments to the plan's variables like this:

1. The first argument is `COMPANY`. Quote a multi-word name ("Edit on the Spot").
2. The second argument is `CLIENT_SITE`. Accept either `client-sites/<slug>` or a bare `<slug>`.
3. The third argument is `SOURCE_DECK`: a PDF, a PPTX, or a folder of slide images.
4. Any further `KEY=value` pairs override the plan's defaults.

If the required three are missing or unclear, ask for all of them in one
question, then proceed. Don't ask anything else up front. The plan's step 0
covers the rest.
