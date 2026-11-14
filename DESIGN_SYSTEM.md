# Bidveil Design System

## Design direction

Bidveil uses **confidential editorial**: the material restraint of a high-end procurement document combined with the precision of an operations console. The interface should feel measured, discreet, and exact. It should never look like a glossy fintech template or a generic dashboard assembled from shiny cards.

The design makes privacy legible through status, spacing, and language rather than visual noise. Warm paper surfaces communicate deliberation. Deep navy communicates seriousness. Cobalt marks actions. Violet marks proof states. Amber marks controlled disclosure.

## Brand essence

**Positioning:** Bidveil helps organizations run fair procurement without exposing every bid.

**Personality:** Measured, discreet, exact.

**Voice:** Plain, specific, calm, and operational. Good examples include “Run fair procurement without exposing every bid” and “Reveal only what the decision requires.” Avoid hype, blockchain jargon, fake urgency, and vague filler such as “Unlock the future of procurement.”

## Color tokens

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#101827` | Primary text, dark shell, high-contrast action surfaces |
| Navy | `#172338` | Dashboard shell and dark product surfaces |
| Ivory | `#F7F5F0` | Main background and light text on dark surfaces |
| Paper | `#FBFAF7` | Content surfaces and forms |
| Line | `#DDDCD7` | Rules, separators, and document structure |
| Muted | `#6E7480` | Supporting copy and metadata |
| Cobalt | `#315CFF` | Primary action, active state, brand square, links |
| Blue soft | `#E9EDFF` | Preview notices and calm action backgrounds |
| Violet | `#7358C7` | Eligibility proofs and verified private state |
| Violet soft | `#F0ECFF` | Proof state surfaces |
| Amber | `#B7791F` | Controlled disclosure and reveal state |
| Amber soft | `#FFF4D6` | Disclosure policy surfaces |
| Green | `#16866A` | Success, awarded, and verified completion |
| Green soft | `#E6F6EF` | Success surfaces |

Use accent colors sparingly. A page should not have multiple competing primary actions. Do not use gradients, glassmorphism, strong drop shadows, or high-gloss card treatments.

## Typography

- **Newsreader:** large editorial headlines, section titles, tender names, and meaningful numerical metrics.
- **DM Sans:** navigation, body copy, forms, buttons, and operational labels.
- **IBM Plex Mono:** IDs, timestamps, status labels, metadata, and system language.

Headlines use a tight negative letter spacing and short line height. Body copy should remain comfortable to read, generally between 14px and 17px with a 1.55–1.7 line height. Metadata should be uppercase, small, and letter-spaced, but never so small that it becomes inaccessible.

## Layout

The landing page is a vertical narrative: editorial hero, proof line, process, decision, product bridge, documentation, FAQs, and final CTA. The dashboard uses a left rail and roomy operational panels rather than dense card grids.

Use a max content width around 1240px on desktop. Use 36px page gutters on small screens and 44–64px gutters on wider screens. Prefer rules, columns, and alignment to decorative containers.

## Signature motifs

1. **Split-veil mark:** two offset vertical strokes around a cobalt square, representing a sealed document and controlled opening.
2. **Document rules:** thin lines, ledger rows, and mono labels that make state and provenance visible.
3. **Status language:** `SEALED`, `VERIFIED`, `CONTROLLED REVEAL`, `AWARDED`, and `PREVIEW` are treated as product vocabulary, not decoration.

## Component rules

Buttons should use explicit verbs: “Create a tender,” “Open reveal window,” “Seal and submit bid,” and “Award.” Primary buttons are cobalt; secondary buttons are paper with a line; dark buttons are reserved for navigation or major dark surfaces.

Forms should have visible labels, useful placeholders, clear error and disabled states, and focus rings. Requirements use rows rather than glossy cards. The bid room should make private values visually distinct from revealed values. Success receipts should expose the receipt ID and meaningful states without exposing unrelated sensitive data.

## State semantics

- **Sealed:** cobalt, lock icon, value hidden.
- **Verified:** violet, shield/check icon, underlying evidence not automatically exposed.
- **Reveal:** amber, eye or scan icon, an action with consequences.
- **Awarded:** green, check icon, final decision recorded.
- **Preview:** blue, explicit prototype boundary.
- **Not selected:** muted, never styled as an error.

## Interaction and motion

Interactions are quiet and purposeful. Use 160–220ms transitions for hover and focus. Use 300–500ms for larger state transitions. Do not animate sensitive values into view without an explicit action. Respect `prefers-reduced-motion: reduce` by disabling non-essential motion.

## Accessibility

Use semantic headings in order, real buttons for actions, real links for navigation, keyboard-visible focus rings, `aria-expanded` for accordion controls, and `aria-selected` for role tabs. Maintain sufficient text contrast and do not communicate privacy state through color alone.

## Responsive behavior

Mobile is a first-class layout. Collapse the navigation into a menu, stack form and privacy guidance sections, preserve readable headline measures, convert multi-column metrics into two columns, and allow bid-room rows to wrap without hiding status or actions.
