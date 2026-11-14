# Bidveil

Bidveil is a privacy-preserving procurement workspace for organizations and suppliers. It helps a buyer publish a tender, collect sealed bids, verify supplier eligibility privately, open a controlled reveal window, and record an award without exposing every commercial detail to every participant.

The product is intentionally not another glossy procurement dashboard. Its core promise is simple: **make the decision, keep the sensitive details controlled**.

## What we are building

Bidveil is being built as a buyer-and-supplier workflow around sealed procurement. A buyer defines the brief, requirements, bid rule, deadline, and reveal policy before inviting suppliers. A supplier reviews the same rules, proves eligibility without unnecessarily exposing underlying evidence, and submits a bid that remains sealed. When the review window opens, the buyer reveals only the fields allowed by the tender policy, then records the award and the relevant integrity events.

The long-term product will use Midnight Compact contracts and private state so confidentiality is enforced by the application and the protocol rather than by an informal promise. The current implementation is a functional local prototype: it demonstrates the end-to-end experience with in-memory state and deliberately labels the boundary where Midnight proofs, wallets, transactions, and persistent storage will be connected.

## Current status

Phase 0 delivered the premium landing page and the product's visual language. Phase 1 is now delivered as a functional vertical slice:

- Buyers can create and publish a tender with a brief, requirements, deadline, bid rule, and reveal policy.
- Suppliers can open an invitation, review the requirements, enter a bid value and proposal summary, and submit a sealed bid.
- Suppliers receive a submission receipt with verified eligibility and sealed reveal state.
- Buyers can open a reveal window, selectively reveal a bid, award the revealed bid, and see the action in the integrity log.
- Buyer and supplier views are switchable from the dashboard and are responsive on mobile.

Phase 1 state is local to the running React session. It is not yet a production data store and it is not yet connected to a Midnight network. That limitation is intentional and documented in [ARCHITECTURE.md](ARCHITECTURE.md), [DATABASE.md](DATABASE.md), and [SECURITY.md](SECURITY.md).

## Product principles

1. **Privacy should support a decision.** Hide what does not need to be visible, but make required evidence and outcomes legible.
2. **Rules come before bids.** The buyer's disclosure policy is explicit before suppliers submit.
3. **Proof beats exposure.** Eligibility is represented as a verified state wherever the underlying document does not need to be shared.
4. **Every consequential action leaves a record.** Publication, submission, reveal, and award belong in an integrity trail.
5. **The interface should feel calm.** Bidveil uses editorial typography, document rules, a warm paper palette, and restrained motion instead of glossy SaaS decoration.

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | Product landing page, how it works, docs overview, FAQs, and dashboard entry point |
| `/dashboard` | Buyer/supplier workspace overview and activity metrics |
| `/dashboard/tenders/new` | Three-step buyer tender creation flow |
| `/dashboard/tenders/:id` | Tender detail, sealed bid room, controlled reveal, and award flow |
| `/dashboard/invitations/:id` | Supplier invitation, bid submission, and sealed receipt |

## Technology

The application currently uses:

- React and TypeScript for the client application.
- Vite for frontend development and production bundling.
- Express and the managed Webdev runtime for server delivery.
- Wouter for lightweight route matching.
- Tailwind CSS plus project CSS tokens for the visual system.
- Lucide React for interface icons.
- Drizzle ORM and the managed MySQL-compatible database capability for future persistent application records.
- Vitest for automated tests.
- Midnight Compact and wallet integration as the next protocol phase, not yet connected in Phase 1.

## Quick start

Use Node and pnpm from the project root:

```bash
pnpm install
pnpm dev
```

The development server uses `PORT` when provided and defaults to port `3000`.

Useful commands:

```bash
pnpm check        # TypeScript diagnostics
pnpm test         # Vitest test suite
pnpm build        # Production client and server build
pnpm start        # Serve the production build
pnpm db:migrate   # Apply checked-in migrations
pnpm db:push      # Generate and apply schema changes when appropriate
```

Do not put credentials in source files. Public runtime configuration is deliberately whitelisted by `server/_core/publicConfig.ts`; private keys and service credentials stay server-side.

## Project structure

```text
client/
  public/                 Static assets and the route manifest
  src/
    components/           Shared brand, dashboard shell, and UI components
    contexts/             Theme state and Bidveil workspace state
    pages/                Landing page and procurement workflow pages
    index.css             Design tokens, layout, responsive rules, and motifs
server/
  _core/                  Runtime, auth, public config, and platform helpers
  db.ts                   Database connection helpers
  routers.ts              Server API boundary
  storage.ts              Persistence helpers
shared/                   Shared types and constants
drizzle/                 Checked-in database migrations and relations
PRD.md                    Product requirements and phased scope
DESIGN_SYSTEM.md          Visual and interaction rules
ARCHITECTURE.md           Application and protocol architecture
DATABASE.md               Current and target data model
SECURITY.md               Security and privacy model
CODE_STYLE.md             Implementation conventions
TESTING.md                Verification strategy
AGENTS.md                 Instructions for future coding agents
```

The directory is written as `drizzle/` in the repository; the spaced rendering above is only a visual separator in this guide.

## Phase 1 workflow

To demo the current slice, open `/dashboard` and choose one of the paths below.

### Buyer path

Open **Create a tender**, complete the three steps, and publish. The new tender is routed into its detail page. From there, open the reveal window, reveal a bid when one is present, and award the revealed bid. The integrity log updates as actions happen.

### Supplier path

Switch the workspace to **Supplier**, open the Office fit-out invitation, enter a bid value and proposal summary, and submit. The resulting receipt shows the bid as sealed, the eligibility as verified, and the reveal state as private.

## Important prototype boundaries

Phase 1 uses `BidveilContext` as a local in-memory workspace provider. A full page reload resets the prototype data to its seeded demo state. No real supplier identity, wallet, proof, payment, tender notification, or chain transaction is implied by the UI. These boundaries are visible in the product preview banner and should remain explicit until the underlying systems are implemented.

The next implementation phase should replace individual local actions with Compact contracts and real private-state flows, while preserving the user-facing language and state semantics already established here.

## Documentation map

- [PRD.md](PRD.md) explains the problem, users, scope, requirements, and roadmap.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) defines the confidential editorial visual system.
- [ARCHITECTURE.md](ARCHITECTURE.md) explains routes, state, boundaries, and the Midnight integration plan.
- [DATABASE.md](DATABASE.md) distinguishes the current starter schema from the target application model.
- [SECURITY.md](SECURITY.md) defines current controls, future controls, threat assumptions, and privacy boundaries.
- [CODE_STYLE.md](CODE_STYLE.md) explains naming, component, TypeScript, CSS, and commit conventions.
- [TESTING.md](TESTING.md) describes unit, integration, contract, security, and acceptance verification.
- [AGENTS.md](AGENTS.md) gives future agents the context and constraints needed to continue safely.

## Delivery and repository

The project is developed as a managed Webdev project. The canonical repository transfer to GitHub is handled through the project configuration flow so that the website checkpoint history and repository ownership stay aligned. The GitHub repository should remain private by default unless the owner explicitly chooses otherwise.
