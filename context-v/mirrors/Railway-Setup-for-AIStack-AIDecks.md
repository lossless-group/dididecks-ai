---
title: "Railway Setup for AIStack AI Decks"
lede: "What actually runs in the resplendent-mercy Railway project: the live Instadeck V4 stack, its data stores, the leftovers, and what it costs."
publish: false
private: true
date_created: 2026-11-21
date_modified: 2026-11-21
date_authored_initial_draft: 2026-11-21
date_authored_current_draft: 2026-11-21
date_authored_final_draft:
date_mirrored: 2026-11-21
mirrors: "Railway project resplendent-mercy, production environment, The Lossless Group workspace"
authors:
  - Michael Staton
augmented_with:
  - Claude Code on Claude Opus 5.5
at_semantic_version: 0.0.0.1
status: Current
category: Mirror
tags:
  - Railway
  - Infrastructure
  - Instadeck
  - Deck-Generation
site_uuid: 9daed124-a521-4e56-9fcd-16d1c6ed4f23
hex_code: 674gqb
summary: "Mirror of the Railway project that hosts Instadeck (AIStack AI Decks), the collaborator's rebuild of dididecks-ai. Read it before touching that project, deciding what to shut down, or estimating what the deck pipeline costs to host. Taken from the Railway API on 2026-11-21; re-take it rather than trusting it once a month has passed."
---
# Railway Setup for AIStack AI Decks

> [!info] Mirrors are experimental
> A mirror describes what is built and running right now, in words a person
> or an agent can act on without reading code or clicking through a
> dashboard. It is only as good as its `date_mirrored`. When it drifts, take
> it again from the source; don't edit it from memory.

> [!warning] Public repo
> This repo is public. The doc names the project and its services, but
> leaves out Railway IDs, public URLs and every variable value. Ask the
> Railway API (or MCP) for those.

## In one paragraph

Instadeck, the collaborator's full-stack rebuild of dididecks-ai, runs in the
Railway project **`resplendent-mercy`** in **The Lossless Group** workspace,
so it bills to us. It has one environment, `production`, in `us-east4`
(Virginia). Of its **20 services**, 8 are the live V4 product, built from
her `deck-v-4-` repo and last deployed on 2026-11-10. 4 are data stores, 6
are leftovers from earlier versions and experiments that are still running,
and 3 are crashed or offline. Use is close to idle: about 2.1 GB of RAM in
total and almost no CPU. See [[Instadeck-V4-MVP-Handoff-Received-2026-11-10]]
for what the product does.

## The live V4 product (8 services)

All eight build from her `deck-v-4-` repo, branch `main`, and were deployed
together on 2026-11-10 at 17:15 UTC (the `deck-api` redeploy followed at
17:40). They match the handoff's "eight services healthy".

| Service | Role (inferred from name and handoff) | Public URL | RAM (7-day avg) |
|---|---|---|---|
| `deck-v2` | Web app (the name is historical; it runs V4) | yes, Railway domain, port 3000 | 0.11 GB |
| `deck-api` | API | yes, Railway domain, port 8080 | 0.36 GB |
| `deck-worker` | General job worker | no | 0.21 GB |
| `deck-renderer` | Renders slides (Chromium checks and exports) | no | 0.24 GB |
| `worker-instant-deck-research` | Research stage of the pipeline | no | 0.09 GB |
| `worker-llm-generation` | Model calls (narrative, copy, the designer) | no | 0.11 GB |
| `worker-preview-render` | Slide previews | no | 0.20 GB |
| `worker-apply-version` | Applies edits as new immutable versions | no | 0.19 GB |

## Data stores (4)

| Store | What | Size |
|---|---|---|
| `Postgres` | Postgres 18 (Railway's SSL template), the main database | 1.2 GB used of a 50 GB volume |
| `Postgres-AI` | Postgres 16 with pgvector | 1.3 GB used of a 50 GB volume |
| `Redis` | Redis 8.2, the job queue and cache | 0.8 GB used of a 50 GB volume |
| `deck-files` | Railway bucket, in `ams` (Amsterdam) | not measured |

The handoff says V4 has no vector database by design, yet `Postgres-AI`
(pgvector) is running with 1.3 GB in it. It may be left over from V2/V3, or
used for something the handoff doesn't mention. Check before deleting it.

The bucket sits in Amsterdam while every service runs in Virginia, so every
file read and write crosses the Atlantic.

## Leftovers still running (6)

None of these is part of V4. Together they use about 0.22 GB of RAM.

| Service | Built from | Last deployed | Public URL |
|---|---|---|---|
| `deck-v3` | her `deck-v3` repo, `integration/frozen-production-capabilities` | 2026-11-04 | no |
| `deck-v5` | her `deck-v5` repo, `integration/evidence-frame-capability` | 2026-10-26 | no |
| `deck-v2-pr-106-preview` | her `deck-v2` repo, a PR branch (`feat/frontend-source-migration`) | 2026-10-20 | yes |
| `deck-Aistack-front-new` | a second account's `deck-Aistack-front-new` repo, `integration/v4-runtime-connection` | 2026-10-26 | yes |
| `adventurous-benevolence` | the same repo, `main` | 2026-10-26 | no |
| `adventurous-expression` | her fork of **dididecks-ai**, `development` | 2026-10-26 (its later deploys failed) | no |

`deck-v5` suggests there is already a V5 line beyond the handoff.

## Crashed or offline (3)

| Service | Built from | State |
|---|---|---|
| `deck-Aistack-backend-new` | her fork of **context-vigilance-kit**, `master` | Crashed since 2026-10-25 |
| `intuitive-curiosity` | her fork of **memopop-ai**, `main` | Crashed since 2026-10-25 |
| `lossless-engine` | no source connected | Offline; last deploy failed 2026-10-25 |

So she tried deploying forks of three Lossless repos (dididecks-ai,
memopop-ai and context-vigilance-kit) into this project. Only the
dididecks-ai fork is still up.

## Configuration worth knowing

- **One shared variable, `OPENAI_API_KEY`.** Every service can read it.
  Whose key it is, and who pays the OpenAI bill, isn't recorded here.
- **One replica for every service.** There's no redundancy and no
  autoscaling, as the handoff said.
- **No custom domains.** The three public services use Railway's generated
  domains.

## What it costs

Railway bills mostly for RAM held, plus CPU used, disk and network. Over the
last 7 days:

- **RAM:** about 2.1 GB held around the clock, roughly 1.75 GB of it by the
  live V4 stack and its stores.
- **CPU:** close to zero (about 0.01 vCPU in total), because nobody is
  running decks.
- **Disk:** about 3.3 GB used across the three volumes.

That is **on the order of $20–25 a month idle**, almost all RAM. The
leftovers account for about a tenth of it. These are estimates from usage,
not the bill: the Railway usage page for the workspace is the source of
truth. Real deck runs add CPU, and they add OpenAI spend, which isn't billed
through Railway.

## Decisions this mirror raises

- **Should this stay in our workspace?** It's her product, billing to The
  Lossless Group.
- **Shut down the leftovers and the crashed services?** That's 9 services
  with no role in V4: `deck-v3`, `deck-v5`, `deck-v2-pr-106-preview`,
  `deck-Aistack-front-new`, `adventurous-benevolence`,
  `adventurous-expression` and the three crashed or offline ones. It saves
  little money, but there's less to reason about.
- **Whose OpenAI key is `OPENAI_API_KEY`?**
- **Is `Postgres-AI` still used?**

## How to re-take this mirror

Read it from the Railway API (the Railway MCP server in Claude Code).
List the projects and find `resplendent-mercy`, then describe its
`production` environment for services, sources, volumes and buckets. Pull
environment status (with healthy services included) for what's up, list the
domains per service, and pull 7-day metrics (CPU, memory, disk) per service.
Update `date_mirrored` and every table in one pass.
