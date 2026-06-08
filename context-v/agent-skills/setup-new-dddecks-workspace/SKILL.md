---
name: setup-new-dddecks-workspace
description: Scaffold a new dididecks-ai client workspace end-to-end — submodule scaffold under `client-sites/<slug>/`, DESIGN.md from the client's brand identity, theme tokens, auth-surface wiring, initial substantiation-corpus connection, and a Scroll-UI starter deck the deck-iteration-workflow can pick up from. Two source-of-branding modes — **website-parse** (crawl the client's public site for tokens, fonts, logos via `crawl-fetch-ingest`) and **source-code-copy** (lift `theme.css` / `DESIGN.md` / brand assets directly from an existing repo when the client is us, an adjacent Lossless property, or otherwise hands over their source). Use whenever a new engagement starts and a `client-sites/<slug>/` submodule does not yet exist; whenever the user says "set up a workspace for <client>", "scaffold a new client", "we have a new client", "spin up a deck site for <firm>"; whenever The Lossless Group itself or any other internal Lossless property needs a deck-site of its own (source-code-copy mode triggers automatically when the brand source is a sibling Lossless repo); and as the cloud-workspace evolves, whenever the equivalent flow needs to fire from a chat surface rather than a CLI. Composes the existing skills — does not re-implement them — for crawl-fetch-ingest, maintain-design-md, theme-system, generate-consistent-og-images, deck-iteration-workflow, and pseudomonorepos (the submodule and branch-tier discipline).
---

# setup-new-dddecks-workspace

> **STUB — 2026-06-08.** Skeleton only. Phases are named, sibling skills it will compose are linked, but the inside of each phase is **[awaits first run]**. The trigger engagement that produces the first real run is **The Lossless Group as its own client** (we need a deck for our own firm), and the substantive content of this skill will be authored against that engagement so it generalizes from real evidence rather than speculation.

## What this skill is for

A new dididecks-ai client engagement is currently a hand-rolled sequence: clone the calmstorm-decks (or chroma-decks) submodule pattern, edit `package.json`, rewrite `DESIGN.md`, paste in theme tokens, swap brand assets, set up `astro:db` for auth, scaffold a Scroll-UI starter. The sequence is real, the discipline is documented across half a dozen other skills, but no skill ties them together into "create a workspace for `<slug>`." This is that skill.

Its trajectory:

1. **Today — a local CLI-shaped workflow.** A maintainer (Michael, mostly) walks the phases with this skill loaded as a checklist. Each phase produces files committed inside the new submodule.
2. **Soon — a chat-surface workflow.** As `dididecks-ai` evolves toward the cloud-workspace described in [[../../explorations/Bridging-PLG-Self-Serve-with-Previous-Approach]] and [[../../specs/Cloud-Workspace-for-Dididecks]], this skill becomes the contract that a self-serve user's "create a deck site" flow executes against. The user's chat ("I want a deck site for Acme Co; here's their URL") triggers the equivalent of this skill.
3. **Long-term — the agent-emits-component pattern.** Per the bridging exploration, slide content becomes spec rows in Postgres that an agent reads/writes; this skill emits the *skeleton* and a publish step does the rest.

The skill is authored as a checklist of phases that are stable across all three trajectories. The difference between trajectories is **who runs the checklist** (maintainer / chat agent / server-side job), not what's on it.

## When to use this skill

- A new engagement is starting and no `client-sites/<slug>/` submodule exists yet
- An internal Lossless property needs a deck site (The Lossless Group itself, or any sibling property under the lossless-monorepo)
- A self-serve user (eventually) signs up and asks for a deck-site scaffold
- An existing submodule needs to be rebuilt cleanly (rare — usually `git checkout` an earlier state, not re-scaffold)
- The user says "set up a workspace for <X>", "spin up a deck site for <X>", "scaffold a new client", "we have a new client"

## When NOT to use this skill

- An existing client-site needs a *new deck* — that's `deck-iteration-workflow`, not this skill
- An existing client-site needs new branding or theme work — that's `maintain-design-md` + `theme-system`
- A new piece of *substantiation corpus* needs to be ingested for an existing client — that's `crawl-fetch-ingest`
- The relocation HARD STOP from `pseudomonorepos` applies (moving an existing repo into the tree) — that is a different operation with three preconditions and is never this skill's job

## Two source-of-branding modes

The first concrete phase — importing brand identity — branches on where the source of truth lives.

### Mode A — website-parse

The default, used when the client is external and only their public web presence is available.

- Crawl the client's marketing site with `crawl-fetch-ingest`
- Extract: primary palette, fonts, logo (SVG preferred), favicon, OG image, hero imagery
- Run the heuristics: extract used colors from CSS, map type stack to the `theme-system`'s two-tier tokens, pull `og:image` for share preview
- Output: a draft `DESIGN.md` per `maintain-design-md`, draft `theme.css` per `theme-system`, an `assets/brand/` folder with logos/favicons

### Mode B — source-code-copy

Used when the client is us, an adjacent Lossless property, or any case where we have direct access to a repo with the brand already encoded.

- Identify the source repo (e.g., `lossless-monorepo/splash/` for The Lossless Group itself)
- Lift: `DESIGN.md`, `src/styles/theme.css`, brand-asset files
- Reconcile: the source repo may have additional theme dimensions we don't need (e.g., a vibrant mode); strip or preserve per the new workspace's needs
- Output: same target shape as Mode A, but the inputs are code-to-code copies, not crawl-derived guesses

**For the trigger engagement (Lossless Group as its own client):** Mode B. Source is the lossless-monorepo's existing splash + DESIGN.md.

## Phases

Each phase produces named files and a clear "done" condition. Substantive bodies are **[awaits first run]** and will be filled in against the Lossless-Group trigger.

### Phase 0 — Decide the slug and scope  [awaits first run]

- Slug convention: `<client-shortname>-decks` (e.g., `lossless-decks`, `podium-decks`)
- Decide: native workspace, cloud workspace (per [[../../specs/Cloud-Workspace-for-Dididecks]]), or both
- Decide: which branch tier (development / main / master) — matches parent per `pseudomonorepos` branch-alignment

### Phase 1 — Scaffold the submodule  [awaits first run]

- Create the repo on GitHub under `lossless-group/<slug>`
- Add as a submodule per `pseudomonorepos` discipline: `.gitmodules` entry with the matching `branch =` line
- Seed: `package.json`, `astro.config.mjs`, `tsconfig.json`, `pnpm-lock.yaml`, `.gitignore`
- Verify: workspace inclusion in `pnpm-workspace.yaml` if the engagement is workspace-linked (chroma-decks pattern) vs standalone (calmstorm-decks pattern) — record the decision in the new submodule's own `context-v/`

### Phase 2 — Import brand identity  [awaits first run]

- Pick Mode A (website-parse) or Mode B (source-code-copy) per the section above
- Produce: `DESIGN.md` (per `maintain-design-md`), `src/styles/theme.css` + `global.css` (per `theme-system`), `src/assets/brand/` with logo/favicon
- For OG / share imagery: scaffold the `imagery:` block in `DESIGN.md` (per `generate-consistent-og-images`) — actual image generation is deferred to Phase 6

### Phase 3 — Wire the auth surface  [awaits first run]

- Per the parent ai-labs exploration `[[Shared-Auth-for-Applied-AI-Labs]]` and the per-engagement auth model
- Seed `db/config.ts` with `Identity`, `Session`, `MintedToken`, `Organization`, `Membership` tables
- Per the organization-as-domain convention: seed `lossless.group` (operating-team org) plus the client's domain (e.g., `lossless.group` again if the client IS Lossless — interesting edge case to surface explicitly)
- Decide: per-client-site Turso DB (engagement-anchored auth) or shared (PLG product)

### Phase 4 — Connect the substantiation corpus  [awaits first run]

- Per `[[../../models/Substantiation-Corpus-Data-Model]]`
- Decide: filesystem-anchored (`<client>/corpus/`, gitignored) or object-storage-anchored (MinIO / R2 per the bridging exploration)
- For the Lossless-Group trigger: this is itself a discovery — where does *our own* substantiation corpus live?

### Phase 5 — Seed the data layer  [awaits first run]

- Per the three-layout convention in `[[../../models/README]]` — pick single-firm-anchored / multi-investor / flat operating-company
- Seed minimal Person + Company records to verify the discovery globs render
- For the Lossless-Group trigger: flat operating-company layout (Lossless IS the firm)

### Phase 6 — Scaffold a starter Scroll-UI deck  [awaits first run]

- Hand off to `deck-iteration-workflow` Phase 1 (single-page narrative)
- This skill ends here; deck-iteration-workflow picks up

### Phase 7 — Generate OG / share imagery  [awaits first run]

- Per `generate-consistent-og-images` and `overlay-svg-text`
- Ship at least a primary OG image so the deploy unfurls before any deck content is final

### Phase 8 — Verify the deploy path  [awaits first run]

- For native / current pattern: stand up a Vercel project, wire env vars per the per-engagement `Install-Auth-Surface-from-Calmstorm-Pattern` plan
- For cloud-workspace clients (when that pattern exists): wire to the central server-side build per the bridging exploration's "publish step"

## Output shape (canonical, target)

When this skill finishes, the new submodule looks like:

```
client-sites/<slug>/
├── DESIGN.md                              # per maintain-design-md
├── README.md
├── package.json
├── pnpm-lock.yaml
├── astro.config.mjs
├── tsconfig.json
├── .gitignore
├── context-v/
│   ├── plans/Install-Auth-Surface-from-Calmstorm-Pattern.md
│   └── (per-engagement context)
├── data/                                  # per models/README layout
│   ├── audits/slides.json                 # initially empty
│   └── (Person / Company / Firm seeds)
├── corpus/                                # gitignored, or object-storage pointer
├── db/
│   ├── config.ts                          # Identity, Session, MintedToken, Organization, Membership
│   └── seed.ts
├── src/
│   ├── assets/brand/                      # logo, favicon, OG source
│   ├── styles/
│   │   ├── theme.css                      # two-tier tokens per theme-system
│   │   └── global.css
│   ├── pages/scroll/<deck>/<variant>/index.astro
│   └── components/slides/<variant>/       # initially empty, deck-iteration-workflow fills
└── public/
    ├── favicon.svg
    ├── og-banner.jpg
    └── (other static)
```

## The trigger engagement — The Lossless Group as its own client

We need a deck for our own firm. This skill's first real run is that engagement, with these specifics:

- **Slug:** `lossless-decks` (pending confirmation — see Phase 0)
- **Branding source:** Mode B (source-code-copy). Source repo: the existing splash sites under the lossless-monorepo, the parent `DESIGN.md`, and the published brand assets at <https://lossless.group/>.
- **Layout:** flat operating-company (we are the firm; no investor container needed)
- **Substantiation corpus:** TBD — discovery item. Likely the existing context-v across the lossless-monorepo plus a curated subset of changelog and shipped artifacts.
- **Auth model:** engagement-anchored Turso DB. `Organization.id = "lossless.group"` for both the operating team and the client (same entity).
- **Deploy target:** TBD — likely a private subdomain initially.

The first run of this skill will fill in the **[awaits first run]** sections by doing the work and recording what actually happens, not what we predicted would happen.

## Sibling skills this skill composes

- [[../pseudomonorepos/SKILL]] — submodule scaffolding, `.gitmodules` discipline, branch-tier alignment
- [[../maintain-design-md/SKILL]] — `DESIGN.md` authoring per Google Stitch spec + Lossless extensions
- [[../theme-system/SKILL]] — two-tier tokens, three-mode (light/dark/vibrant) contract
- [[../crawl-fetch-ingest/SKILL]] — Mode A website-parse for branding import
- [[../generate-consistent-og-images/SKILL]] — share imagery scaffold
- [[../overlay-svg-text/SKILL]] — branded SVG overlays on top of generated OG
- [[../deck-iteration-workflow/SKILL]] — picks up at Phase 6; this skill hands off to it
- [[../context-vigilance/SKILL]] — for the new submodule's own `context-v/` discipline
- [[../changelog-conventions/SKILL]] — for the new submodule's `changelog/` directory

## Specs this skill implements against

- [[../../specs/Dididecks-AI-Slide-Decks-as-Code]] — the parent OS spec
- [[../../specs/Cloud-Workspace-for-Dididecks]] — the cloud-mode equivalent flow (stub, waiting on decisions)
- [[../../explorations/Bridging-PLG-Self-Serve-with-Previous-Approach]] — the PLG-vs-DD-grade fork that determines whether this skill runs as CLI checklist (DD-grade) or chat-surface flow (PLG)
- [[../../models/README]] — the data-model layouts this skill seeds against

## Status discipline

- **2026-06-08** — Stub authored. All phases are placeholders.
- **First real run** — author the Lossless-Group engagement; fill in **[awaits first run]** sections from observation.
- **Second real run** — when the next external client lands, run this skill with Mode A (website-parse) and reconcile the differences from the Mode B first run.
- **Promote out of stub** — when this skill has been run for ≥2 distinct engagements and the sibling skills it composes have been exercised in both modes.

## See also

- `../README.md` — index of all skills in this directory (add this skill to the table)
- `../../specs/Dididecks-AI-Slide-Decks-as-Code.md` — the deck-OS spec
- `../../explorations/Bridging-PLG-Self-Serve-with-Previous-Approach.md` — the architectural fork this skill straddles
- The four reference client-sites: `client-sites/calmstorm-decks` (single-firm-anchored), `client-sites/chroma-decks` (multi-investor), `client-sites/humain-vc-decks` (flat operating-company), `client-sites/reach-edu-hub` (education-sector precedent)
