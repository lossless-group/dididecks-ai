---
title: "Railway Services Outside V4: Keep or Wind Down?"
lede: "Nine services in the resplendent-mercy Railway project aren't part of the live V4 stack. Each needs a keep or wind-down call from their owner."
publish: false
date_created: 2026-11-21
date_modified: 2026-11-21
date_authored_initial_draft: 2026-11-21
date_authored_current_draft: 2026-11-21
date_authored_final_draft:
authors:
  - Michael Staton
augmented_with:
  - Claude Code on Claude Opus 5.5
at_semantic_version: 0.0.0.1
status: Open
category: Issue
tags:
  - Railway
  - Infrastructure
  - Instadeck
  - Cleanup
site_uuid: c80f351d-a4d2-4294-b47b-e000099fbbfd
hex_code: b3w9a5
summary: "To share with Instadeck's developer. Lists the 9 Railway services in resplendent-mercy that aren't part of the 8-service V4 stack, what each runs and its state as of 2026-11-21, plus one open question about the pgvector database. She decides what stays; nothing gets deleted from our side. Source data: [[Railway-Setup-for-AIStack-AIDecks]]."
---
# Railway Services Outside V4: Keep or Wind Down?

## The ask

The `resplendent-mercy` Railway project runs **20 services**. Eight are the
live V4 product built from `deck-v-4-` `main`: `deck-v2` (web), `deck-api`,
`deck-worker`, `deck-renderer` and the four `worker-*` services. Four are data
stores. **The other nine don't appear to be part of V4.**

Nothing will be removed from our side. **For each service below, please say
whether to keep it (and what it's for) or wind it down.** You know which ones
your work still depends on; we don't.

The stack stays in the Lossless workspace while we work out how our two
efforts come together, so this is housekeeping, not a move.

## Still running, not part of V4 (6)

| Service | Built from | Last deployed | Public URL | Keep or wind down? |
|---|---|---|---|---|
| `deck-v3` | `deck-v3`, `integration/frozen-production-capabilities` | 2026-11-04 | no | |
| `deck-v5` | `deck-v5`, `integration/evidence-frame-capability` | 2026-10-26 | no | |
| `deck-v2-pr-106-preview` | `deck-v2`, `feat/frontend-source-migration` (PR #106 preview) | 2026-10-20 | yes | |
| `deck-Aistack-front-new` | `deck-Aistack-front-new`, `integration/v4-runtime-connection` | 2026-10-26 | yes | |
| `adventurous-benevolence` | `deck-Aistack-front-new`, `main` | 2026-10-26 | no | |
| `adventurous-expression` | the `dididecks-ai` fork, `development` (later deploys failed; an older one is still serving) | 2026-10-26 | no | |

## Crashed or offline (3)

| Service | Built from | State | Keep or wind down? |
|---|---|---|---|
| `deck-Aistack-backend-new` | the `context-vigilance-kit` fork, `master` | Crashed since 2026-10-25 | |
| `intuitive-curiosity` | the `memopop-ai` fork, `main` | Crashed since 2026-10-25 | |
| `lossless-engine` | no source connected | Offline; last deploy failed 2026-10-25 | |

## One question about the data stores

**Is `Postgres-AI` (Postgres with pgvector, about 1.3 GB in use) still read
by V4?** The handoff describes V4 as having no vector database by design, but
this database is running and has data in it. If V4 doesn't use it, does
anything else? If nothing does, should it be kept as an archive, exported, or
wound down?

## Why it matters

- **Clarity.** With 20 services, it's hard to tell from the dashboard which
  ones are the product. Removing the ones that aren't makes the project easy
  to reason about, for both of us and for agents working on it.
- **Cost.** It's small: the nine use about 0.2 GB of RAM between them.
  It isn't the main reason.
- **Public URLs.** Two leftovers still answer on public Railway URLs.

## How to close this issue

Fill in the last column (or reply with the list), and wind down whatever you
mark. Then we'll re-take [[Railway-Setup-for-AIStack-AIDecks]] so the mirror
matches, and set this issue's status to Resolved.
