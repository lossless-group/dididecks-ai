---
title: "Rubric-Driven Deck Evaluation Agent"
lede: "An agent that reviews a generated deck against an evidence rubric and gives feedback. Advisory only: there is no investor-ready gate."
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
status: Stub
category: Spec
tags:
  - Deck-Evaluation
  - VC-Evidence
  - Agents
site_uuid: a3788894-6421-440f-ac2d-1cd0a243eae7
hex_code: 84yw8d
summary: "Stub. Records the decision that deck quality is handled by an evaluative agent giving feedback against a rubric, not by a sign-off gate. Not a current priority; don't expand it or raise it unless Michael asks. The rubric it would use is [[VC-Evidence-Rubric-for-Generated-Decks]]."
---
# Rubric-Driven Deck Evaluation Agent

> [!note] Stub, not a priority
> This records a direction, not planned work. Don't expand it or raise it
> unless asked.

## The decision (2026-11-21)

There is **no "investor-ready" gate** and no sign-off step, and the
question isn't part of Instadeck. When a deck's quality needs checking, an
**evaluative agent** reviews it against a rubric and gives feedback. The
feedback advises; it doesn't block anything.

## The shape, in brief

- **Input:** a deck (source plus generated slides) and a rubric.
- **Rubric:** starts from [[VC-Evidence-Rubric-for-Generated-Decks]]: the
  distinctions a slide must keep, the rules about missing evidence, and the
  questions for each slide role.
- **Output:** feedback for each slide (what the slide claims, what the
  source supports, what's missing or overstated) and a short summary for
  the deck.
- **Where it could run:** after generation in our remake loop
  ([[Remake-Source-Deck-into-Design-Variants]]), or on demand against any
  deck.

## Not in scope

- Approving, blocking or certifying decks.
- Recording who signed off.
