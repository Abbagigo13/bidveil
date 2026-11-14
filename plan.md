# Bidveil Landing Page Plan

## Scope

Build the first release of Bidveil as a premium landing-page-first experience for a privacy-preserving procurement and sealed-bid auction platform. The landing page is the primary deliverable in this pass, with a lightweight dashboard preview route so the primary CTA enters the broader product experience.

## Implementation approach

- Use the existing React + TypeScript + Vite + Tailwind starter.
- Keep the landing page content-driven and accessible with semantic sections, keyboard-focusable controls, and responsive layouts.
- Add a `/dashboard` route that previews the future buyer/supplier dashboard without implementing the later-stage procurement workflows.
- Use local React state for FAQ accordions and mobile navigation; no database-backed writes are needed in this pass.
- Add `public/manus-routes.json` for `/` and `/dashboard`.
- Keep the existing server/database configuration intact for future organizations, bids, proof states, reveal events, and audit history.

## Design direction options

- Confidential editorial: premium procurement journal with restrained operational UI — probability 0.06.
- Quiet enterprise atelier: warm paper, precise navy structure, and soft blueprint accents — probability 0.04.
- Monochrome protocol: black-and-white contract language with one electric accent — probability 0.03.

### Chosen direction: Confidential editorial

**Design Movement:** Editorial enterprise minimalism with the material restraint of a high-end procurement document and the precision of an operations console.

**Core Principles:** Make privacy legible; use hierarchy instead of decoration; keep actions calm and intentional; favor evidence over spectacle.

**Color Philosophy:** Warm ivory gives the product the feeling of paper and deliberation. Deep navy anchors trust and seriousness. A singular cobalt blue marks action and movement. Violet is reserved for proof states; amber marks controlled disclosure.

**Layout Paradigm:** A vertical narrative rather than a dashboard grid: editorial hero, horizontal proof line, alternating explanation blocks, then a direct transition into the product preview. The dashboard route uses a left rail and roomy operational panels.

**Signature Elements:** Fine document rules; a sealed-envelope line motif; status labels that read like a procurement ledger (`SEALED`, `VERIFIED`, `CONTROLLED REVEAL`).

**Interaction Philosophy:** Every interactive element explains what happens next. Accordions open with subtle height/opacity transitions. Sensitive actions use explicit copy instead of surprising movement.

**Animation:** Use short, low-amplitude transitions: 160–220ms for hover/focus, 300–500ms for section reveals, and a slow line-draw loop in the hero illustration. Respect `prefers-reduced-motion`.

**Typography System:** Newsreader for large editorial headlines and key section titles; DM Sans for navigation, body, labels, and controls; IBM Plex Mono for IDs and status metadata. Use generous leading and narrow measure for long text.

**Brand Essence:** Bidveil helps organizations run fair procurement without exposing every bid. Personality: measured, discreet, exact.

**Brand Voice:** Speak plainly and specifically. Example lines: “Run fair procurement without exposing every bid.” / “Reveal only what the decision requires.”

**Wordmark & Logo:** Wordmark in DM Sans with a small split-veil mark: two offset vertical strokes enclosing a tiny cobalt square, suggesting a sealed document and controlled opening.

**Signature Brand Color:** Cobalt `#315CFF`, used sparingly for primary actions and the split-veil mark.

## Page architecture

### `/`

1. Header with Bidveil mark, anchor navigation, docs link, and dashboard CTA.
2. Hero with clear value proposition, dual CTAs, editorial proof line, and CSS-drawn sealed document illustration.
3. “How it works” four-step procurement journey: set rules, collect sealed bids, verify privately, reveal and award.
4. “Built for the decision” section explaining buyer and supplier perspectives.
5. Product preview bridge into the dashboard with role-aware buyer/supplier signposts.
6. Docs overview covering privacy model, bid lifecycle, and audit trail.
7. FAQ accordion for confidentiality, eligibility proofs, reveal controls, supplier participation, and procurement integrity.
8. Final CTA and footer.

### `/dashboard`

A polished preview of the future dashboard with a role switcher, activity ledger, tender overview, private-state indicators, and buyer/supplier signposts. Make clear this is a preview, not a fully implemented procurement workflow.

## Project structure

- `client/src/pages/Home.tsx`: landing page sections and FAQ interaction.
- `client/src/pages/Dashboard.tsx`: dashboard preview route.
- `client/src/App.tsx`: route registration.
- `client/src/index.css`: design tokens, typography, responsive layout, and signature motifs.
- `public/manus-routes.json`: declared page routes.
- `app.config.ts`: project logo metadata before checkpointing.


## Phase 1 delivered

The first functional vertical slice uses a shared in-memory workspace provider so the prototype can demonstrate the complete interaction without pretending the Midnight contract is already connected. The buyer can create and publish a tender, configure private requirements and a reveal policy, open the reveal window, selectively reveal a bid, and award it. The supplier can open an invitation, review the brief, submit a bid value and proposal summary, and receive a sealed submission receipt. Activity events are recorded in the workspace integrity log. The next phase will replace these local actions with Midnight Compact state, proofs, wallet transactions, and persistent records.
