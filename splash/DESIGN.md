---
version: alpha
name: DidiDecks-AI Splash — Ink & Brass
description: >-
  Design system for the dididecks-ai splash site. A dark, editorial,
  Due-Diligence-grade aesthetic: deep ink surfaces, brass and ember accents,
  Cormorant Garamond display serif over Inter, JetBrains Mono for engineered
  labels. Tokens mirror the CSS custom properties in src/styles/global.css's
  :root block — that file remains the runtime source of truth; this DESIGN.md
  is the human- and agent-readable contract.

# ─── Colors ──────────────────────────────────────────────────────────
# Two tiers. Tier 1 is the named palette (--c-*); Tier 2 is the
# semantic role assignment (--bg, --fg, --accent, --stroke).
# The runtime exposes both; this file documents both.
colors:
  # Tier 1 — Ink (the dark canvas, three steps)
  ink: "#0b0d12"          # body bg
  ink-2: "#11141c"        # elevated panels (system-map shell)
  ink-3: "#1a1f2c"        # cards

  # Tier 1 — Paper (warm cream, used as fg on dark and bg in light mode)
  paper: "#f6f3ec"
  paper-dim: "#e9e3d4"

  # Tier 1 — Brass (the primary editorial accent)
  brass: "#c9a25c"        # primary accent — eyebrows, tags, links, kickers
  brass-dim: "#8c6f3d"    # reserved deeper-brass; not yet used at runtime

  # Tier 1 — Ember (the secondary "alert / hover" accent, Claude-orange)
  ember: "#d97757"

  # Tier 1 — Mist (dim text)
  mist: "#8a93a3"

  # Tier 1 — Stroke (brass-tinted hairlines at two alpha levels)
  stroke: "rgba(201, 162, 92, 0.18)"
  stroke-hi: "rgba(201, 162, 92, 0.4)"

  # Tier 2 — Semantic roles (dark default; light mode overrides at runtime)
  bg: "{colors.ink}"
  bg-elev: "{colors.ink-2}"
  bg-card: "{colors.ink-3}"
  fg: "{colors.paper}"
  fg-dim: "{colors.mist}"
  accent: "{colors.brass}"
  accent-strong: "{colors.ember}"

# ─── Typography ──────────────────────────────────────────────────────
# Three families. Cormorant Garamond for display + lede (editorial weight);
# Inter for body prose; JetBrains Mono for eyebrows, tags, kickers, meta.
typography:
  display-hero:
    fontFamily: Cormorant Garamond
    fontSize: 4.4rem            # clamp(2.6rem, 6vw, 4.4rem)
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Cormorant Garamond
    fontSize: 2.6rem            # clamp(1.8rem, 3.4vw, 2.6rem)
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Cormorant Garamond
    fontSize: 1.25rem           # h3 — card titles
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Cormorant Garamond
    fontSize: 1rem              # h4 — section sub-labels (rare)
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: 0.08em
    # Note: h4 inherits text-transform: uppercase and color: --fg-dim
  lede:
    fontFamily: Cormorant Garamond
    fontSize: 1.45rem           # clamp(1.2rem, 1.6vw, 1.45rem)
    fontWeight: 500
    lineHeight: 1.4
  body-md:
    fontFamily: Inter
    fontSize: 17px              # html/body default
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Inter
    fontSize: 0.95rem
    fontWeight: 400
    lineHeight: 1.55
  mono-md:
    fontFamily: JetBrains Mono
    fontSize: 0.95rem           # hero-meta row, system-map pre
    fontWeight: 400
    lineHeight: 1.5
  mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.85rem           # kicker
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.08em
  label-eyebrow:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.16em       # uppercase at runtime
  label-tag:
    fontFamily: JetBrains Mono
    fontSize: 0.72rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.12em       # uppercase at runtime

# ─── Rounded (corner radii) ──────────────────────────────────────────
# Small, deliberately conservative scale. The editorial register favors
# subtle radii over pillowed shapes.
rounded:
  sm: 4px      # not yet used at runtime; reserved for inline chips
  md: 10px     # all cards
  lg: 18px     # system-map shell, future hero-scale panels

# ─── Spacing ─────────────────────────────────────────────────────────
# rem-anchored. The site does not yet use a numbered scale; values appear
# inline (1rem, 1.5rem, 2rem, 5rem, 7rem). Documented here as named
# layout tokens so downstream agents have stable references.
spacing:
  base: 1rem
  card-padding-y: 1.5rem
  card-padding-x: 1.5rem
  card-padding-bottom: 1.6rem    # slight asymmetry — descenders breathe
  split-card-padding: 2rem        # .split .card override
  grid-gap: 1.25rem               # default .grid
  split-gap: 2rem                 # .split
  section-padding-block: 5rem     # every section
  hero-padding-top: 7rem
  hero-padding-bottom: 5rem
  footer-padding-top: 3rem
  footer-padding-bottom: 4rem
  container-padding-inline: 1.5rem
  container-max: 72rem            # ~1152px
  hero-headline-max: 18ch         # h1 line-length cap
  lede-max: 48ch                  # .lede default; pages override to 60ch
  lede-max-wide: 60ch              # the page-level override used in prose

# ─── Components ──────────────────────────────────────────────────────
components:
  # ── Eyebrow (mono uppercase section label) ──────────────────────────
  eyebrow:
    textColor: "{colors.accent}"
    typography: "{typography.label-eyebrow}"

  # ── Lede (display-serif section lede paragraph) ─────────────────────
  lede:
    textColor: "{colors.fg-dim}"
    typography: "{typography.lede}"

  # ── Card (default — section grids of cards) ─────────────────────────
  card:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.fg}"
    border: "1px solid {colors.stroke}"
    rounded: "{rounded.md}"
    padding: "1.5rem 1.5rem 1.6rem"
  card-hover:
    border: "1px solid {colors.stroke-hi}"

  # ── Card tag (mono uppercase tag inside a card) ─────────────────────
  card-tag:
    textColor: "{colors.accent}"
    typography: "{typography.label-tag}"

  # ── Card — split variant (denser content, wider padding) ─────────────
  card-split:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.fg}"
    border: "1px solid {colors.stroke}"
    rounded: "{rounded.md}"
    padding: "2rem"

  # ── System map (the ASCII pipeline diagram shell) ───────────────────
  system-map:
    backgroundColor: "{colors.bg-elev}"
    textColor: "{colors.accent}"
    border: "1px solid {colors.stroke}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
    typography: "{typography.mono-md}"

  # ── Hero (top of page, twin radial-gradient halos) ──────────────────
  hero:
    backgroundColor: "{colors.bg}"
    backgroundImage: >-
      radial-gradient(900px 480px at 80% -10%, rgba(217, 119, 87, 0.10), transparent 60%),
      radial-gradient(700px 380px at 0% 80%, rgba(201, 162, 92, 0.08), transparent 70%)
    padding: "7rem 0 5rem"

  # ── Footer ──────────────────────────────────────────────────────────
  footer:
    borderTop: "1px solid {colors.stroke}"
    textColor: "{colors.fg-dim}"
    typography: "{typography.body-sm}"
    padding: "3rem 0 4rem"
  footer-link:
    textColor: "{colors.fg}"

  # ── Kicker (mono small accent line, often near footer) ──────────────
  kicker:
    textColor: "{colors.accent}"
    typography: "{typography.mono-sm}"

  # ── Link (inline anchor, default global treatment) ──────────────────
  link:
    textColor: "{colors.accent}"
    borderBottom: "1px solid transparent"
  link-hover:
    textColor: "{colors.accent-strong}"
    borderBottom: "1px solid {colors.accent-strong}"
---

# DidiDecks-AI Splash — Design System

> The runtime source of truth is `src/styles/global.css`'s `:root` block,
> which defines the CSS custom properties consumed by every page-scoped
> style. This document is the **human- and agent-readable** contract that
> explains the system's intent. Keep the two in sync when either changes.

## Brand & Style

DidiDecks-AI is a code-first slide-deck operating system for Due-Diligence-grade content. The splash exists to teach a reader — investor, partner, design-curious engineer — what the system is *aiming at* before they open a single spec.

The aesthetic is **editorial-dark with brass and ember accents**. The metaphors are *the memo*, *the letter of intent*, *the printed prospectus* — not the marketing landing. A serif display face (Cormorant Garamond) carries every headline and section lede; sans body text reads quickly underneath; engineered labels (eyebrows, tags, meta rows, kickers) are in JetBrains Mono so the reader is never in doubt that this is a code-first product.

Tone calibration:

- **Considered, not flashy.** No glow shadows. No motion beyond a 120ms border-color/color transition on hover. Depth is conveyed by tonal layers (ink → ink-2 → ink-3) and brass-tinted hairlines, not by neon, mesh, or shadow stacks.
- **Due Diligence as the throughline.** The codename DidiDecks is a contraction of *Due Diligence*. Every visual choice should feel like it would survive a partner-meeting screen-share: brass on ink reads serious in a way that mesh gradients on near-black do not.
- **Two ambient halos, no more.** The hero carries a soft ember halo top-right and a soft brass halo bottom-left at ~8–10% opacity. That is the *only* place ambient color appears in the layout. Don't add a second gradient anywhere else.
- **Light mode is wired but opt-in.** `:root[data-mode="auto"]` under `prefers-color-scheme: light` swaps ink → paper as the canvas. No mode-toggle UI ships in this iteration; the override is reserved for when a mode toggle lands. When that happens, the swap is already correct.

## Colors

The palette is built on a single triplet of ink surfaces, a single warm paper, and two warm accents — brass (the primary) and ember (the hover / alert).

- **Ink — Body (`#0b0d12`):** The body background. Effectively the canvas of the entire page.
- **Ink-2 — Elevated (`#11141c`):** One tonal step up. Reserved for elevated panels — currently the system-map ASCII shell.
- **Ink-3 — Card (`#1a1f2c`):** Two tonal steps up. The background of every `.card`. Choosing a card surface that *is* discernibly lighter than the body (instead of a translucent variant of body) reads as "printed on paper" rather than "floating over a void." This is the editorial register at work.
- **Paper (`#f6f3ec`) / Paper-Dim (`#e9e3d4`):** The warm cream. Used today as the foreground text color on the dark canvas. In the light-mode override (`data-mode="auto"` + `prefers-color-scheme: light`), paper becomes the canvas and ink becomes the foreground — the same two colors trade roles.
- **Brass (`#c9a25c`):** The primary editorial accent. Drives links, eyebrows, tags, kickers, and the ASCII pipeline diagram color. Reads as "this is an action / this is meaningful" without leaving the warm-tone palette. Chosen specifically because it doesn't shout — it's the color of a printed gold-foil header on a serious document.
- **Brass-Dim (`#8c6f3d`):** Reserved deeper-brass. Defined in the token set but not yet referenced at runtime; available for selected-state or visited-link treatments when those land.
- **Ember (`#d97757`):** The secondary accent — Claude-orange. Used only for hover/active states on links and as the upper hero halo color. It is intentionally close to brass on the color wheel so the hover transition reads as "warming up," not "switching tracks."
- **Mist (`#8a93a3`):** Dim text. Used for `.hero-meta` labels, card body paragraphs, `.lede` (when dimmed), and the footer text. Cool against the warm accents — provides hierarchy without introducing a third hue.

**Borders.** Two brass-tinted alpha hairlines tier the visual weight:

- `--c-stroke` (brass at 18% alpha): default border on every card, every section-top divider, the footer's top edge.
- `--c-stroke-hi` (brass at 40% alpha): hover state on cards. The shift is subtle and warm — the affordance is "the brass got a little brighter," not "a new element appeared."

The choice to tint the hairline brass (instead of using a neutral white-alpha) is what makes the dark canvas read as warm rather than cold. Every neutral surface has a quiet brass tone tracing its edges.

## Typography

Three families. **Cormorant Garamond** for everything that should feel *editorial* — the hero H1, every section H2, card titles (h3), and the section lede paragraphs. **Inter** for body prose. **JetBrains Mono** for everything that should feel *engineered* — eyebrows, tags, hero-meta rows, the system-map ASCII diagram, the kicker.

- **Display Hero (`display-hero`):** The H1 across the site. Cormorant Garamond 600 at `clamp(2.6rem, 6vw, 4.4rem)`. Letter-spacing tight at `-0.01em`; line-height 1.15. Always capped at `max-width: 18ch` so headlines wrap deliberately. The hero H1 is the only place the display face reaches its full size.
- **Headline LG (`headline-lg`):** Section H2 across the site. Cormorant Garamond 600 at `clamp(1.8rem, 3.4vw, 2.6rem)`. Same family as the hero — section heads are *declarations*, not labels, so the serif treatment carries through.
- **Headline MD (`headline-md`):** Card titles (h3). Still Cormorant Garamond, dropped to 1.25rem. The serif headline on a card is a deliberate cue: each card is a *short essay*, not a UI tile.
- **Headline SM (`headline-sm`):** H4. Rare. At 1rem, uppercase, letter-spacing `0.08em`, color `--fg-dim`. Reserved for sub-labels inside dense content — almost a hybrid with eyebrow.
- **Lede (`lede`):** The display-serif lead paragraph that follows every section's H2. Cormorant Garamond at `clamp(1.2rem, 1.6vw, 1.45rem)` in `--fg-dim`. Default `max-width: 48ch`; pages override to `60ch` when the lede needs to carry a fuller argument.
- **Body MD (`body-md`):** Inter at 17px (the html/body default), line-height 1.55. The site's reading face. Used inside cards and across all general prose.
- **Mono MD (`mono-md`):** JetBrains Mono at 0.95rem. The hero-meta row, the system-map ASCII pipeline, any other "this is code-shaped content" surface.
- **Mono SM (`mono-sm`):** JetBrains Mono at 0.85rem with `0.08em` letter-spacing. The kicker. One-line statements that sign off a section.
- **Label Eyebrow (`label-eyebrow`):** JetBrains Mono at 0.75rem with `0.16em` letter-spacing, uppercase, in `--accent` (brass). The runtime selector is `.eyebrow`. Always sits one line above the H2 it introduces.
- **Label Tag (`label-tag`):** JetBrains Mono at 0.72rem with `0.12em` letter-spacing, uppercase, in `--accent`. Sits at the top of every card (the runtime selector is `.card .tag`). Tighter letter-spacing than eyebrow because the surrounding card box already provides framing.

**Reading-width convention.** The container caps at 72rem (`--maxw`); section ledes cap independently at 48–60ch via `.lede`. Hero H1 caps at 18ch. Cards are width-controlled by the surrounding grid (`auto-fit, minmax(16rem, 1fr)` for `.grid`; `minmax(20rem, 1fr)` for `.split`), not by inline `max-width`.

## Layout & Spacing

A **fixed-max-width** layout: every page wraps content in `.container { max-width: 72rem; margin: 0 auto; padding: 0 1.5rem; }`. The 72rem (~1152px) ceiling is wider than the typical 1200px-fixed-max splash because the system-map diagram needs horizontal room.

**Vertical rhythm.** Every `section` gets `padding: 5rem 0` and a `border-top: 1px solid var(--stroke)` (suppressed on the first section). The hero overrides with `padding: 7rem 0 5rem` for extra presence above the fold. The footer pads `3rem 0 4rem`. Inter-section dividers are brass hairlines, not blank space — they're the visual signal that one declaration has ended and the next begins.

**Grid conventions:**

- **`.grid`** (default card grid): `gap: 1.25rem`; `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))`. Reflows from 4 columns down to 1 across breakpoints without explicit media queries. Used for principles, sibling specs.
- **`.split`** (wider 2-up): `gap: 2rem`; `grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr))`. Used for the North Stars row — two larger cards that need more breathing room and a fatter internal padding (`2rem`).

**Container padding.** `.container` reserves `1.5rem` (24px) inline on each side. This is the minimum air between any content and the viewport edge — never let an element extend past that gutter.

**Hero centering.** The hero is not centered; everything is left-aligned. The "weight" of the H1 lives on the left margin, with the brass and ember halos floating in from the corners — the geometry of a memo, not a marketing splash.

## Elevation & Depth

The system is **flat**. There are no `box-shadow` declarations anywhere in `global.css`. Depth is conveyed by three mechanisms only:

1. **Tonal layering.** ink → ink-2 → ink-3 reads as three perceptible shelves. The system-map (ink-2) reads as elevated above the body. The cards (ink-3) read as further elevated still. No shadow needed.
2. **Brass-tinted hairline borders at two alphas.** Default border (`--stroke`, brass at 18%) is the resting state; hover (`--stroke-hi`, brass at 40%) brightens to signal interactivity. The transition is 120ms — fast enough to feel responsive, slow enough that the warming doesn't feel mechanical.
3. **Ambient hero halos.** Two soft radial gradients in the hero — ember at top-right (~10% opacity) and brass at bottom-left (~8% opacity) — provide the only ambient color in the layout. They sit *inside* the hero element, not as a fixed background, so they don't bleed into subsequent sections.

The discipline here is the editorial register at work: a Due-Diligence-grade document doesn't levitate. It sits on the page, hairlines tracing its edges. If you find yourself reaching for `box-shadow`, you're in the wrong project.

## Shapes

A **small, conservative rounded scale**. Three levels:

- **`sm` (4px):** Defined but not yet used at runtime. Reserved for inline chips, kbd-like tokens, or input fields when those land.
- **`md` (10px):** The standard card radius — every `.card` and `.split .card`.
- **`lg` (18px):** The system-map shell. Reserved for hero-scale containers; if a future "callout" component needs more visual presence than a card, this is its radius.

There is no `full` token. Pill-shaped CTAs and round icon buttons are not part of the splash's vocabulary today. The editorial register doesn't want pill-buttons — when a CTA component lands, the default will be a `md`-radius button, not a pill.

**Border thickness.** All borders are 1px solid by default. No asymmetric or accent-side-border treatments today.

## Components

### Eyebrow (`.eyebrow`)

The JetBrains Mono uppercase label that introduces every section. 0.75rem, `0.16em` letter-spacing, in brass. Always sits one line above the H2 it introduces. Provides rhythm — the reader's eye anchors on these tokens (`THE BAR`, `NORTH STARS`, `DESIGN PRINCIPLES`, `SYSTEM MAP`, `SPECS & EXPLORATIONS`) before each section's H2 lands.

### Lede (`.lede`)

The display-serif lead paragraph that follows every section's H2. Cormorant Garamond at `clamp(1.2rem, 1.6vw, 1.45rem)` in `--fg-dim`. Default `max-width: 48ch`; the inline-override pattern (`style="max-width: 60ch;"`) widens to 60ch when the lede carries a fuller argument. The lede is the *one place* the serif drops to dim — everywhere else, serifs read at full foreground weight.

### Card (`.card`)

The standard content card. ink-3 background, 1px brass-stroke border at 18% alpha, 10px radius, padding `1.5rem 1.5rem 1.6rem` (the extra 0.1rem at the bottom lets descenders breathe). The card body always begins with a `.tag` (uppercase brass mono), then an h3 title, then a `<p>` description in `--fg-dim`. Hover transitions the border-color to `--stroke-hi` (brass at 40%) over 120ms — no transform, no shadow.

**Anchor wrapping.** Cards in the "Specs & explorations" section *are* `<a>` elements directly (the whole card is a link). For card grids that are not click-through (Principles, North Stars), the card is a plain `<article>`. Don't introduce nested anchors.

### Card — split variant (`.split .card`)

Same surface treatment as `.card` but with `2rem` padding for denser, more weighted content. Used in the North Stars row, where two larger cards carry the most consequential statements on the page.

### System map (`.system-map`)

The ASCII pipeline diagram shell. ink-2 background (elevated above the body), 18px radius, 1px brass-stroke border, 1.5rem padding, `overflow-x: auto` for narrow viewports. Inside, the `<pre>` block uses JetBrains Mono in brass at `0.95rem`, `line-height: 1.5`. The system-map is the *only* component that combines elevated surface (ink-2) with a larger radius (lg) — that combination is what reads as "this is the system, summarized."

### Hero (`.hero`)

The top-of-page block. ink background with two radial-gradient halos layered on top:

- An ember halo at `80% -10%` (top-right, just off-canvas), `900px × 480px`, fading from `rgba(217, 119, 87, 0.10)` to transparent.
- A brass halo at `0% 80%` (bottom-left, just on-canvas), `700px × 380px`, fading from `rgba(201, 162, 92, 0.08)` to transparent.

Padding `7rem 0 5rem` for above-the-fold weight. The hero H1 caps at `max-width: 18ch`. The `.lede` inside the hero gets `margin-top: 1.25rem`. The `.hero-meta` row sits at `margin-top: 2.5rem` — a `flex` row of mono key:value pairs (`Status:`, `Branches:`, `Parent:`, `Repo:`) with `gap: 1rem 2rem`.

### Hero-meta (`.hero-meta`)

The mono inline meta-row at the foot of the hero. `font-family: --f-mono`, `font-size: 0.95rem`, color `--fg-dim`. The `<strong>` label inside each meta-pair gets `color: --fg; font-weight: 500` — the values brighten while the labels stay dim, so the row reads as a printed colophon.

### Kicker (`.kicker`)

A one-line mono brass statement, typically at the foot of a section. 0.85rem with `0.08em` letter-spacing. Used today on the footer's license-status line ("OSS posture under exploration · License terms TBD"). When a section needs to *sign off* with a short editorial note, the kicker is the affordance.

### Footer (`.footer`)

`border-top: 1px solid var(--stroke)`, padding `3rem 0 4rem`, color `--fg-dim`. Inline `<a>` elements inside the footer get `color: --fg` (foreground brightening, the inverse of the body convention where links are brass). This is deliberate: the footer is a list of *credits*, not actions, so brass would over-signal.

## Do's and Don'ts

- **Do** use Cormorant Garamond for every headline (H1, H2, H3) and every section lede. The serif is the editorial register — drop it, and the system reads as generic-startup-splash within a single screen.
- **Do** introduce JetBrains Mono whenever a label is *naming* something rather than persuading (eyebrows, tags, meta rows, kicker). The mono/serif split is the deepest signal that this is a code-first product.
- **Do** keep all borders brass-tinted via `--stroke` / `--stroke-hi`. The warm hairline is what makes the dark canvas read as editorial rather than cold-tech.
- **Do** widen `.lede` to 60ch with an inline `style="max-width: 60ch;"` only when the lede carries a fuller argument. The 48ch default is the right cap for one-sentence ledes.
- **Do** use the brass→ember transition on hover. The warming-up read is intentional; switching to a cooler accent (e.g. a teal) would break the editorial-warm palette.

- **Don't** introduce a fourth typeface. Cormorant Garamond, Inter, and JetBrains Mono are the system.
- **Don't** add `box-shadow` anywhere. Depth is tonal layering + brass hairline alpha, never shadow. If a component feels like it needs more presence, try increasing tonal contrast (ink-3 → reach for ink-2 or vice versa) before reaching for shadow.
- **Don't** add a second background gradient outside the hero. The hero's twin radial halos are the *only* ambient color in the layout.
- **Don't** hard-code color hexes in component styles. Always reference the CSS custom properties (`--c-brass`, `--accent`, `--bg-card`, etc.). The light-mode override under `data-mode="auto"` only works for components that consume the semantic Tier-2 tokens (`--bg`, `--fg`, `--stroke`).
- **Don't** introduce pill-shaped buttons. The splash's shape language is `sm` / `md` / `lg` radii — no `full`. When a CTA component lands, default to `md`-radius rectangle.
- **Don't** nest `<a>` inside `<a>`. The "Specs & explorations" card uses the whole card as a link; if a card needs an internal link, it must not also wrap the card as a link. (This will matter the first time a card grows a footer with a separate target.)
- **Don't** drop the section-top brass hairline. The hairline divider is what tells the reader "one declaration has ended; the next begins." Without it, the editorial pacing collapses into a generic stacked-sections layout.
- **Don't** treat `data-mode="auto"` as a live feature. The light-mode override exists in CSS so it doesn't have to be retrofitted later, but no UI surfaces this today. When a mode toggle lands, audit every component (especially cards and the system-map) to make sure semantic tokens carry the swap correctly.
