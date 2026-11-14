# Bidveil Architecture

## Overview

Bidveil is a React/TypeScript web application with a server-capable Webdev runtime. The current prototype keeps workflow state in a React context so the product can demonstrate the user journey before protocol and persistence decisions are finalized. The target architecture separates four concerns:

1. **Experience:** pages, forms, status language, responsive layout, and accessibility.
2. **Application:** organization, tender, invitation, notification, and audit orchestration.
3. **Privacy protocol:** Compact contracts, private state, eligibility proofs, reveal rules, and wallet transactions.
4. **Persistence and indexing:** durable metadata, transaction references, searchable activity, and operational records.

## Current source structure

```text
client/src/
  components/BrandMark.tsx          Split-veil wordmark
  components/DashboardLayout.tsx    Shared buyer/supplier workspace shell
  contexts/BidveilContext.tsx       Phase 1 in-memory workflow state
  pages/Home.tsx                    Landing page
  pages/Dashboard.tsx               Workspace overview
  pages/CreateTender.tsx            Buyer tender setup
  pages/TenderDetails.tsx           Sealed bid room, reveal, award
  pages/SupplierBid.tsx              Supplier invitation and receipt
  index.css                         Design system and responsive rules
server/
  _core/                            Runtime and platform helpers
  routers.ts                        Server API boundary
  db.ts, storage.ts                 Persistence boundary
shared/                              Shared types and constants
dizzle/                              Database migrations and relations
```

## Route architecture

Wouter currently maps the public landing page and the Phase 1 workflow routes. The route manifest at `client/public/manus-routes.json` declares the same page set for the managed Webdev runtime. APIs, assets, and platform endpoints are not included in that manifest.

The dashboard shell is shared by workflow pages. It owns navigation and workspace chrome but does not own tender state. `BidveilContext` owns the Phase 1 role, tenders, bids, and activity actions.

## Phase 1 data flow

1. `App` mounts `BidveilProvider` around the router.
2. `BidveilProvider` seeds demo tenders and activity events.
3. Buyer and supplier pages read and mutate that context.
4. Actions update tender status and prepend an activity event.
5. Wouter changes the route without a full page reload for in-session flows.
6. A full browser reload resets state to the seeded prototype data.

This is a deliberate seam. Pages should depend on action names and domain concepts rather than knowing whether the state came from React memory, a server endpoint, or a Compact transaction.

## Target protocol boundary

The protocol layer should own facts that must be private, verifiable, or resistant to unilateral application changes:

- Tender publication and immutable rules hash.
- Supplier eligibility claims or proof references.
- Sealed bid commitments or private bid state.
- Reveal authorization and revealed field set.
- Award decision and relevant commitment references.

The web application should own presentation-oriented metadata and orchestration: names, descriptions, navigation, invitation delivery, indexing, user preferences, and human-readable activity projections. It should not duplicate private bid values in a public database or server log.

## Compact contract direction

The next contract design should model a tender lifecycle with explicit transitions:

```text
DRAFT -> COLLECTING -> REVIEW -> AWARDED
```

The contract should reject submissions after the configured deadline, reject unauthorized reveal or award actions, and prevent an award unless the selected bid satisfies the reveal and eligibility rules. The exact Compact syntax and privacy primitives must be validated against the chosen Midnight toolchain before implementation; this document does not claim that a contract already exists.

## Server boundary

Use the managed server for authenticated application operations, organization-level authorization, durable metadata, notification orchestration, and indexing. Keep wallet signing and private proof material in the appropriate client or wallet boundary. Server endpoints should return explicit state and error codes rather than leaking private fields as incidental JSON properties.

## Production deployment

The project is configured as a server-capable Webdev project with a managed database capability. Preview uses the configured runtime port. Production builds compile the Vite client and server entrypoint. Published routing must preserve server API paths and static frontend behavior. Sensitive HTML responses should not be shared or cached across users.

## Evolution rules

- Preserve the user-facing state vocabulary while changing the underlying state source.
- Introduce an adapter rather than rewriting every page when replacing the Phase 1 context.
- Keep protocol transaction IDs and application records linked but not conflated.
- Treat contract upgrades, schema changes, and proof format changes as explicit migrations.
- Never make a demo-only fallback look like verified protocol state.
