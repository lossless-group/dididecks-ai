---
title: "VC Evidence Rubric for Generated Decks"
lede: "A generated investor deck should ask for missing evidence, not invent it. Draft rules for what each slide role needs before it can claim anything."
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
status: Draft
category: Exploration
tags:
  - VC-Evidence
  - Due-Diligence
  - Deck-Generation
  - Acceptance-Criteria
site_uuid: a84cae36-6559-4d78-9296-dc924bcea8e4
hex_code: 3xmevf
summary: "Seed for an acceptance rubric used by any deck-generating pipeline, ours or Instadeck's. It started as the VC worksheet in the Instadeck V4 handoff, rewritten without the client specifics. It feeds the DD-Ready Citation spec and the remake-deck review step. Needs Michael's VC judgment before it becomes a spec."
---
# VC Evidence Rubric for Generated Decks

## Why care?

An AI pipeline that redesigns a pitch deck makes it look more convincing, and
that is exactly the risk. A community of 500 families becomes "500
customers." A fundraising target becomes "revenue." A fund that is only a
plan becomes an operating fund. Nobody has to intend any of this; the model
just fills a standard VC slide outline. A due-diligence-grade deck has to do
the reverse: **keep every qualifier the source gave, and when evidence is
missing, ask the founder for it instead of making it up.**

These rules started as the slide worksheet in the Instadeck V4 handoff
([[Instadeck-V4-MVP-Handoff-Received-2026-11-10]]), rewritten here without the
client details. They apply to our remake loop as much as to hers.

## Distinctions a slide must keep

| Don't merge | With | Rule |
|---|---|---|
| Revenue | Capital raised or facilitated | Capital a company facilitates for third parties is not its own earned revenue |
| Targets and forecasts | Actuals | Keep the target wording, the date and the unit exactly as the source gives them |
| Community size, registrations, workshop attendees | Paying customers | Name the metric and the period. Don't upgrade it to a bigger word |
| Associations and events attended | Customers, partners, endorsements | Only state a relationship the source supports with authority |
| A planned fund or concept | An operating, regulated fund | Keep "planned." Never invent AUM, regulatory status, fees, carry or returns |
| Resources the company uses | Resources it owns | Don't imply ownership, utilization or unit economics without evidence |
| Credentials the company provides | Independently verified credentials | Mark them company-reported until they are verified |
| Text a user edits by hand | Text taken from the source | User-written copy is reviewed again before it goes out |

## Rules about missing evidence

- **Never fabricate standard VC slides.** If the source has no market, competition, unit economics or ask/use-of-funds slide, the deck leaves it out or asks for it. It does not generate a generic one.
- **Missing conversion, retention or revenue figures are shown as unknown**, not smoothed over.
- **Funding mechanics need a statement of who pays whom and who holds the funds** before the slide can describe them. No guaranteed returns and no money-back language.
- **Each claim keeps its source reference** and the date of its evidence. See [[Dididecks-AI-DD-Ready-Citation-and-Source-Access]].

## Questions for each slide role (reviewer prompts)

1. **Opening:** what is the investable company, who buys, and what is the one supported reason to care?
2. **Problem and solution:** what problem, for whom, and why is this better than the alternatives? Keep the mission separate from proven outcomes.
3. **Product and journey:** what is the actual product, and what is the conversion between steps?
4. **Business model:** who pays whom, who holds the funds, and what legal or regulatory structure applies?
5. **Traction:** which metric shows demand, and over what period?
6. **Financials:** how does each revenue source produce the target? What is earned revenue, and what is facilitated capital?
7. **Fund or vehicle:** is it a legal operating entity, a plan, or a fundraising concept?
8. **Team:** which experience supports the execution thesis, and what is still unverified?
9. **Resources:** what is owned and operating, and what does it cost?
10. **Relationships:** which associations matter to the investment decision, and what exactly is each relationship?

## Open questions (need Michael's VC judgment)

- Which audience is primary: founder, angel, investment committee, fund LP or operating partner? What decision should each deck enable?
- What is the minimum evidence for revenue, traction, customers, partnerships, market size, forecasts, valuation and terms?
- Which slide roles are recommended for each stage and sector, and which should be left out when evidence is missing?
- When should the product stop and ask for missing financials or an investment ask instead of generating something?
- Which claims need external verification, which can stay company-reported, and which must block distribution?
- What counts as investor-ready, who signs off, and how is the sign-off recorded?

## Where this could go

- A review checklist in the remake loop's human-choice step ([[Remake-Source-Deck-into-Design-Variants]]).
- Acceptance criteria in the DD-Ready Citation spec, once these questions are answered.
- Fixtures: source decks with known traps, such as a target worded like revenue or associations worded like customers, used to check that a generator keeps the qualifiers.
