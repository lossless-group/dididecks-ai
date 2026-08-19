export const northStars = [
  {
    tag: 'NS-1',
    title: 'Two-sided system: private native to white-label publish',
    body: "A private workspace where a managing partner develops decks with AI in confidence, paired with a publish target that can live in the client's brand."
  },
  {
    tag: 'NS-2',
    title: 'A player so good you present live from the deck',
    body: 'The deck author should also present from DidiDecks directly. PDF, PPTX, and share exports are handoff artifacts, not the primary runtime.'
  }
] as const;

export const principles = [
  {
    n: '01',
    title: 'Auth vs. publish, balanced',
    body: 'Confidential by default for sensitive materials, easy to publish for the rest, with the boundary visible and controllable.'
  },
  {
    n: '02',
    title: 'AI design agents that wow-ify prior art',
    body: 'Take ugly prior decks or raw outlines to shareable polish on a short turnaround. AI is not optional. Polish bar is not optional.'
  },
  {
    n: '03',
    title: 'Non-destructive iteration',
    body: 'Tweak, embellish, try variants, reorder, but never destroy. Optionality is a deliverable, not a side effect.'
  },
  {
    n: '04',
    title: 'MVP-playable deck, always',
    body: 'At any given moment, a deck should still be ready to present. Opportunity windows do not wait for cleanup.'
  },
  {
    n: '05',
    title: 'Continuous iterate, fork, personalize',
    body: 'Personalize toward a specific meeting on short notice without breaking the always-playable baseline.'
  },
  {
    n: '06',
    title: 'Passable PDF export',
    body: 'The export bar is keynote-grade enough that it does not look like a compromised fallback from a web tool.'
  },
  {
    n: '07',
    title: 'Urgent content integration',
    body: "Fresh research, yesterday's call transcript, or new market data should fold in quickly and reflow without manual rebuild."
  }
] as const;

export const siblingSpecs = [
  {
    href: '/resources',
    tag: 'Spec',
    title: 'Slide Decks as Code',
    body: 'Decks are repositories, slides are components, variants are first class, and AI is a primary authoring path.'
  },
  {
    href: '/resources',
    tag: 'Spec',
    title: 'DD-Ready Citation and Source Access',
    body: 'Claims, charts, and KPI blocks remain tied to source material so the receiver can continue diligence.'
  },
  {
    href: '/resources',
    tag: 'Spec',
    title: 'Visual and Diagram Component Library',
    body: 'Reusable AI-composable visual primitives so each new deck reaches the wow bar without redrawing from scratch.'
  },
  {
    href: '/about',
    tag: 'Exploration',
    title: 'Business model posture',
    body: 'Hosted product plus high-touch delivery where needed, keeping option space open while the category gets defined.'
  }
] as const;

export const useCases = [
  {
    title: 'Funds and investment teams',
    body: 'Run recurring diligence, IC, LP, and board narratives with reusable layouts, citation continuity, and version control.'
  },
  {
    title: 'Founders',
    body: 'Keep fundraising narratives aligned as traction, metrics, and the ask evolve without slide-chaos rewrites.'
  },
  {
    title: 'Advisors and studios',
    body: 'Port strong slide structures between client contexts while inheriting the destination brand automatically.'
  }
] as const;

export const resourceCards = [
  {
    title: 'Brand rationale',
    body: 'Why the product identity is a three-layer deck system rather than generic AI branding.',
    href: '/about'
  },
  {
    title: 'Theme and style guide',
    body: 'Where the shared tokens, global CSS, shell utilities, and theme store live in the repo.',
    href: '/resources'
  },
  {
    title: 'Frontend-backend contract',
    body: 'The public surface stays clean while auth, billing, and AI provider control remain backend owned.',
    href: '/pricing'
  }
] as const;

export const loopDiagram = `ingest  ->  wow-ify  ->  variant  ->  publish (with auth)  ->  export (keynote-grade)
                                   ^                               |
                                   \\-------- re-integrate ---------/
                                           fresh inputs`;
