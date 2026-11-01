---
title: "Integrating Instadeck Back into Dididecks-AI"
lede: "Instadeck began as dididecks-ai and grew into its own full-stack product. A month after our comparison study we rechecked its progress and why its output feels different from ours, then parked the question."
date_authored_initial_draft: 2026-10-31
date_authored_current_draft: 2026-11-01
date_authored_final_draft:
date_first_published:
date_last_updated: 2026-11-01
at_semantic_version: 0.0.1.0
status: Parked
augmented_with: Claude Code (Opus 5.5, 1M context)
category: Exploration
tags:
  - Instadeck
  - Dididecks-AI
  - Collaborations
  - Integration
  - Sense-Making
  - Deck-Generation
authors:
  - Michael Staton
date_created: 2026-10-31
date_modified: 2026-11-01
private: true
publish: false
site_uuid: 18e519b3-78b1-4340-859e-7c940ad06c1c
hex_code: b0cjwy
---
# Integrating Instadeck Back into Dididecks-AI

> [!warning] This repo is public
> `private: true` keeps a file off the splash, not off GitHub. Correspondence
> and account details for this work live only in the gitignored `context-v/extra/`.
> Never paste them here.

## Status

**Parked, 2026-11-01.** Michael's conclusion: Instadeck's output doesn't work
the way he wants, so no further experiments for now. The public write-up is the
splash page `studies/collaborations/dididecks-vs-instadeck-recheck`.

## The situation

Instadeck and dididecks-ai were meant to be one project. Instadeck's developer
took the dididecks-ai lineage and built a separate full-stack product from it.
They share a goal, due-diligence-grade decks, but almost no code. The question
here was what, if anything, to bring back.

Earlier study, which compared the two harnesses rather than this question:

- The harness-evidence and compare-contrast notes under ai-labs `studies/collaborations/`
- `splash/src/pages/studies/collaborations/dididecks-vs-instadeck.astro`

## Her progress against her own records

Read 2026-11-01 from the two read-only mounts in
`studies/collaborations/`. No code was run. Anything uncommitted
isn't counted.

**The engineering progress is real.** The older repo gained 148 commits after
the study and the V4 repo has 98. V4 has about 152,000 lines of backend Python,
about 57,000 lines of frontend code and 40 page routes. The product is now five
user steps: Upload Deck, Extract Brand, Review Brand, Choose Style, Your
Redesign. V4 also dropped the vector database.

**Her records don't yet show an accepted deck:**

| Date | Run | Her recorded result |
|---|---|---|
| 10/21 | Two paid test runs | Both ended before the design stage |
| After 10/23 | Four-page synthetic PDF, online | Seven slides published in about 14 minutes; "Styling is basic" |
| 10/26 | Three-page test deck | Published, but "needs_improvement; not accepted" |
| 10/26 | Corrected version of that deck | Rendered cleanly; publishing failed; "still not accepted" |

Her committed output images are mostly labelled fixtures, so they're weak
evidence of what the model produces.

## Why it feels clunky (inference)

1. **Iteration is the expensive operation.** Ours: edit a file, look, edit
   again. Hers: artifacts are immutable and each operation gets one correction
   pass. A headline fix after publication needed new code and still failed in
   the publisher.
2. **The sequence isn't the difference, but the handoff might be.** Corrected
   by Michael 2026-11-01: our process is also sequential. It recreates the
   content as narrative Markdown with graphic-design layout descriptions, then
   frontend agents generate from those files alone, told not to look at the
   original deck or at each other's work
   (`context-v/plans/Remake-Source-Deck-into-Design-Variants.md`). Her spec has
   a similar shape on paper. The differences that remain, not tested as causes:
   - **Brief format.** Our narrative is prose plus loose frontmatter (for
     example, "Two-panel layout…" and "Why it's here" in calmstorm's
     `07-market-momentum.md`). Her slide design is short typed fields:
     `dominantComposition` is capped at 160 characters and `focalElement` at 600.
   - **Who generates.** Ours: Claude Code subagents with tools, N isolated
     variants, a human choosing. Hers: one budget-capped OpenAI pipeline run
     into a compiler.
   - **The orchestrator.** Ours has one Claude session supervising with a view
     of everything, though the designers themselves don't have it.
3. **Reasoning goes to content before design.** Michael's read, and the evidence
   supports it: content stages come first and can stop design from starting, and
   V4's request caps give research, memo and factual review 550 cents against
   400 for the designer. Caps aren't actual spend. One copy call spent 1,600 of
   1,800 output tokens on reasoning and returned incomplete text.
4. **Gates stop runs for reasons unrelated to the deck.** A leftover veto, a
   job-history check and a spending guard each stopped or blocked a run.
5. **Her tests measure validity, not taste.** She says so herself: "Tests do not
   establish product acceptance."

**Caveats.** The calmstorm slides are real content iterated by an operator; her
images are small synthetic runs and fixtures. Claude versus OpenAI is a confound
we can't separate by reading code. Ours has no tests or measurement and needs an
operator.

## The papers behind her vocabulary

Local copies are in `context-v/extra/`.

| Paper | What it explains |
|---|---|
| Huang et al., "A Self-Evolving Agentic Framework for Metasurface Inverse Design," *Laser & Photonics Reviews*, 2026 | "The Meta research paper" and "self-evolving agent runtimes": Meta here means metasurface |
| Borg et al., "E-mail classification with machine learning and word embeddings for improved customer support," *Neural Computing and Applications*, 2021 | Her idea of embedding and scoring agent output to rank slide content. V4 removes embeddings, so V4 doesn't test it |
| Ge, Wang, et al., "AutoPresent: Designing Structured Visuals from Scratch," CVPR 2025 | The only one about generating slides directly |
| Bayeshi et al., "DeepLens Diagnosis Agent," John Snow Labs, 2026 | Staged workflows with verification gates |
| Liu et al., "iDesignGPT enhances conceptual design via large language model agentic workflows," *Nature Communications*, 2026 | Agentic workflows and iterative evaluation in design |
| Xiong, Han, Zhang, "Design AI Agent for Auditing," *Journal of Emerging Technologies in Accounting*, 2026 | Retrieval over private knowledge with multiple agents |

## If this reopens

1. **Port patterns, not code.** Rebuild her measurement and repair ideas here.
2. **Run Instadeck as a service** that our sites call for first drafts.
3. **Lift specific modules** into a dididecks-ai package.
4. **Converge on one codebase.** The largest option.
5. **Host our loop and take her plumbing (recommendation, unproven).** Run the
   Claude Code loop in a hosted per-deck workspace, so it stops being tied to
   Michael's machine. Reuse the non-creative parts: sign-in, upload and
   extraction, brand extraction, durable jobs, spend limits, and Chromium layout
   checks as a tool the agent calls. Unknowns: cost per deck, sandboxing, and how
   much of the quality comes from operator judgment.

## Open questions

- Should `dddecks.ai`, our planned self-serve name, point at Instadeck at all?
- What does the collaboration look like if the generators stay separate?
