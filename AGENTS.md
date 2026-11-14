# Bidveil Agent Guide

## Mission

Continue building Bidveil as a privacy-preserving procurement workspace. The product helps buyers and suppliers run sealed-bid tenders with private eligibility proofs, controlled reveal, and a clear integrity record. Do not drift into a generic marketplace, a glossy admin template, or a blockchain demo that exposes sensitive data in the name of convenience.

## Read first

Before implementing a feature, read:

1. `README.md` for current product scope and demo boundaries.
2. `PRD.md` for requirements and phase sequencing.
3. `DESIGN_SYSTEM.md` for visual and interaction rules.
4. `ARCHITECTURE.md` for state boundaries and the Midnight integration seam.
5. `SECURITY.md` for privacy and threat assumptions.
6. `TESTING.md` for acceptance and verification expectations.

Read `DATABASE.md` when changing persistence or schema. Read `CODE_STYLE.md` when adding or refactoring source.

## Current project state

Phase 1 is delivered. The current workflow is a local prototype built around `BidveilProvider` in `client/src/contexts/BidveilContext.tsx`. It seeds demo tenders and exposes actions for create, submit, reveal, and award. A browser reload resets state. Do not claim that the current state is durable, cryptographic, or production-authorized.

The next major phase is Midnight integration. Before editing protocol code, confirm the current Compact toolchain, network target, wallet integration approach, proof model, and contract test workflow. Keep the existing UI state vocabulary while replacing the context actions with a real adapter.

## Implementation rules

- Preserve the confidential editorial design direction.
- Use the existing route manifest and update it whenever page routes change.
- Use relative browser-facing URLs inside the app.
- Keep private values out of logs and public payloads.
- Prefer explicit status types and action names.
- Keep buyer and supplier permissions distinct even in a prototype.
- Do not add auth, database, wallet, or contract claims without implementing and testing the boundary.
- Avoid full-file rewrites when a user or concurrent session may have changed the file; inspect first and preserve unrelated work.

## Before delivery

Run `pnpm check`, relevant tests, `pnpm build`, and verify the route manifest. For meaningful UI work, capture the relevant desktop and mobile screens and exercise the important interaction path. Update the appropriate root documentation when a requirement, architecture boundary, schema, security assumption, or testing contract changes.

Save changes as a focused commit on the canonical project repository. Never force-push, expose credentials, or delete a user's external repository. If the canonical repository is being transferred, follow the Webdev Git canonical workflow and do not substitute a raw GitHub remote operation.
