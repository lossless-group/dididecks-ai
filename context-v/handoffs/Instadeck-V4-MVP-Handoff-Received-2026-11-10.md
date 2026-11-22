---
title: "Instadeck V4 MVP Handoff, Received 2026-11-10"
lede: "Instadeck's developer declared a technical MVP and handed us content expertise and hardening. What it proves, what it doesn't, and what it asks of us."
publish: false
private: true
date_created: 2026-11-21
date_modified: 2026-11-21
date_authored_initial_draft: 2026-11-21
date_authored_current_draft: 2026-11-21
date_authored_final_draft:
authors:
  - Michael Staton
augmented_with:
  - Claude Code on Claude Opus 5.5
at_semantic_version: 0.0.0.2
status: Reference
category: Handoff
tags:
  - Instadeck
  - Collaborations
  - Handoff
  - Deck-Generation
  - VC-Evidence
site_uuid: 82d84316-921a-42e6-afca-fddb944926f1
hex_code: 8jvcp6
summary: "Distilled from a 34-page private handoff PDF sent by Instadeck's developer. Read before deciding whether to take on any of the PRs it proposes for Lossless, or before reopening the parked integration exploration. The raw PDF and its text stay in context-v/extra/."
---
# Instadeck V4 MVP Handoff, Received 2026-11-10

> [!warning] This repo is public
> `private: true` keeps this file off the splash, not off GitHub. The source
> PDF has repo URLs, deployment URLs, operation IDs, file hashes and a client's
> deck content. Those stay in the gitignored `context-v/extra/`
> (`LOSSLESS-HANDOFF.pdf` plus an extracted `.txt`). Don't paste them here.

> `handoffs/` is an experimental folder. Its shape isn't settled yet.

## Why care?

Instadeck started as dididecks-ai, and its developer then built it into a
separate full-stack product. We compared the two in October and parked the
question of bringing it back on 2026-11-01
([[Integrating-Instadeck-Back-into-Dididecks-AI]]). On 2026-11-10 she sent a
34-page handoff titled *"Instant Deck V4: Technical MVP & Lossless handoff."*
It says the website can now turn a real uploaded PDF into a complete
redesigned deck. It hands Lossless two things: **content expertise**, meaning
VC narrative and evidence rules, and **product hardening**. She keeps SEO and
digital marketing as her own next workstream.

This note keeps what is useful from the PDF so nobody has to reread it. It
also separates what the handoff claims from what its own evidence supports,
and lists the decisions it leaves with us.

## What she says is proved

All of these are **local** passes on one real client deck (14 pages, about 40 MB):

| Capability | Her status | What it actually covers |
|---|---|---|
| Upload a real deck and get a redesigned deck | Local pass | 14-page source PDF became 10 new slides, checked in Chromium, exported as PDF and HTML |
| Workspace chat | Local pass | Q&A tied to the selected published deck. Modes that depend on the vector database are disabled |
| Smart Edit (manual edits) | Local pass | Text, font size and position edits on a slide after the first were saved, checked, applied, reopened and exported. Discarding an edit kept the active version |
| Four page chats | Local pass | Answers survived a refresh. Replayed questions started no new model calls |
| Source fidelity | **Open** | Marked `draft_needs_review`. The financial slide drops the qualifier that the funding target comes from financial-consulting clients |
| Visual design | Inspected | No blank pages, clipping or broken images. Some spacing and card layouts repeat |
| Online release | Merged and deployed | All eight services healthy and the sign-in smoke test passed. **A real deck has not been run end to end online** |
| Works on any deck | **Not established** | One real source plus synthetic fixtures |

Her own framing is careful. She says this is not investor-ready factual
acceptance, not proof that any deck will work, and not a completed online run
with a real source.

Compared with the 2026-11-01 recheck, when no deck had been accepted, this is
progress: a real client deck now gets through locally, and the result can be
edited. The gaps that remain are factual accuracy, online acceptance and
coverage of other decks.

## How the system works

- **It is not a trained model.** It is an orchestrated pipeline over pinned
  OpenAI models: `gpt-5-2025-08-07`, `gpt-4.1` and `gpt-4.1-mini-2025-04-14`,
  each used for different tasks. Every saved operation records the model,
  prompt and skill versions it used.
- **The pipeline runs in stages:** upload and extract, then brand review and
  three opening directions, then research, finance, VC, narrative and copy
  stages, then a **saved Markdown handoff** (`05-redesign-context.md`, tied to
  a hash), then **one whole-deck HTML designer call**, then compile and Chromium
  checks plus factual review, then publish, edit and export as immutable
  versions.
- **The slide layouts are generated, not templates.** A different source can
  produce a different number of slides and a different structure. Older code
  that used seven layout primitives per slide is legacy.
- **Rules enforced in code:** a 200 MiB upload limit, 1 to 190 source slides,
  a 1920×1080 canvas, safe HTML and SVG only, source-lineage tracking,
  immutable versions, and exports byte-identical to the version requested.
- **V4 has no vector database and no reusable AI memory, by design.** The
  "specialists" are task prompts with spending limits, not personas that
  carry knowledge from one deck to the next.

**What this means for us:** the pipeline now looks closer to our remake loop
([[Remake-Source-Deck-into-Design-Variants]]). Both write content as Markdown
first and design second. The differences in the earlier exploration still
hold: she runs one budget-capped designer call against our N isolated variants
with a person choosing, and OpenAI against Claude.

## Cost and capacity, as she measured them

- **Test ledger:** 57 requests and about $4.50 in total, under a $7 cap. That
  includes debugging and failed requests, so it is not a per-deck price. The
  corrected run cost $1.32 but reused earlier state.
- **Designer call alone:** an example of 60k tokens in and 32k out comes to
  about $0.40. The first HTML designer request took about 125 seconds, and one
  repair pass about 67 seconds.
- **Spending limits per operation:** designer 400¢, VC 500¢, factual review
  100¢. The designer can produce up to 64k output tokens.
- **Throughput, p50/p95 latency and memory are unmeasured.** Each role runs on
  one Railway replica. Her estimate for the two new editor services running
  flat out is about $60 a month.
- **Pricing advice worth keeping:** don't price per PDF page. A scanned page,
  an image-heavy page and a dense financial table cost very different amounts.

## What she asks Lossless to do

| Priority | Proposed PR | What we would own |
|---|---|---|
| P0 | Fix the funding qualifier on the financial slide as a new immutable version, and add regression tests tied to the source | Approve the exact wording and the source evidence |
| P0 | Run a real deck online on the deployed release, end to end | Review every slide and reconcile the cost |
| P1 | VC narrative and evidence rubric | Fill in the slide worksheet with her; see [[VC-Evidence-Rubric-for-Generated-Decks]] |
| P1 | Measure production capacity and per-deck cost | Engineering: p50/p95 latency and cost per delivered deck |
| P1 | Expand the editor: rich text, chart and table data, image and background changes | Engineering and design |
| P2 | Reusable knowledge or vector memory, only if needed | Decide whether evidence from the source deck alone is enough |
| Lossless follow-up | Font hosting and privacy review | Self-host font files instead of loading Google Fonts and similar. GDPR worry raised, not audited |

The font privacy point applies to our own sites too, which load fonts from
outside services in places. **Deferred (2026-11-21): we don't want to deal
with it now.**

## Our read

1. **The evidence is honest and narrow.** She separates passes from claims
   better than most handoffs do. Taste and investor-grade quality are still
   unproven, which was the original reason we parked this.
2. **"Handoff to Lossless" assumes a commitment we haven't made.** The PR
   list is written as if Lossless now owns content and hardening on her
   codebase. The repo stays read-only for us
   (`ai-labs/studies/collaborations/phoenixcapera/deck-v4/`).
3. **The VC worksheet is the part worth keeping, whatever we decide.** The
   rules about what evidence each slide needs carry straight into our own
   DD-ready work ([[Dididecks-AI-DD-Ready-Citation-and-Source-Access]]).
4. **The source deck is one of our client engagements.** Michael confirmed
   (2026-11-21) that running it through her pipeline is not a concern.

## Open decisions for Michael

- Accept, decline, or partly take on the P0 and P1 work. If we take any of
  it, decide whether it happens in her repo or as a port into dididecks-ai.
- Does this reopen [[Integrating-Instadeck-Back-into-Dididecks-AI]]? Option 5
  there ("host our loop and take her plumbing") is the obvious place it
  connects.
- ~~Who signs off on investor-ready content?~~ Settled 2026-11-21: there's
  no gate, and it isn't part of Instadeck. An evaluative agent gives
  rubric-based feedback instead; see [[Rubric-Driven-Deck-Evaluation-Agent]].

## References

- Source: `context-v/extra/LOSSLESS-HANDOFF.pdf` (gitignored, 34 pages, dated 2026-11-10)
- [[Integrating-Instadeck-Back-into-Dididecks-AI]]
- [[VC-Evidence-Rubric-for-Generated-Decks]]
- [[Remake-Source-Deck-into-Design-Variants]]
- [[Dididecks-AI-DD-Ready-Citation-and-Source-Access]]
