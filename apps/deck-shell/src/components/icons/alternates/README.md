# Icon alternates — design history

This directory preserves icon-pair candidates that were drafted, reviewed at
`/dev/icons`, and **not chosen**. They remain in the repo so the decision
context is legible to anyone reading the codebase cold — and so a future
revisit (different tone, different surface, new component family) can fork
from a previously-explored shape rather than starting blank.

## Conventions

- File names carry the candidate suffix (`-A`, `-C`, …).  
  The canonical pair lives one level up under the unsuffixed name
  (`ScrollIcon.astro`, `PlayIcon.astro`).
- Components stay importable — they are not stubs. `/dev/icons` renders them
  in the **Alternates · design history** section.
- Do **not** import alternates from production code. They exist for review
  only. If a former alternate becomes the right choice for a new context,
  promote a fresh copy under a new canonical name (`ChevronIcon.astro`,
  `MouseWheelIcon.astro`, etc.) rather than re-aliasing.

## Current alternates

| File | Pair | Drafted | Reviewed | Outcome |
|---|---|---|---|---|
| `ScrollIcon-A.astro` / `PlayIcon-A.astro` | A · Surface-shaped frames    | 2026-05-17 | 2026-05-17 | Not chosen |
| `ScrollIcon-C.astro` / `PlayIcon-C.astro` | C · Filled capsules          | 2026-05-17 | 2026-05-17 | Not chosen |

Chosen on 2026-05-17: **Pair B · Frameless glyphs**, promoted to
`../ScrollIcon.astro` + `../PlayIcon.astro`.
