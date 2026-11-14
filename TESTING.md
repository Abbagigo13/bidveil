# Bidveil Testing

## Testing principles

Test the privacy transition, not only the happy-path pixels. Every test should make clear whether it verifies presentation, local application state, server authorization, database persistence, or Compact contract behavior. Never describe a mock state test as proof that the production privacy model works.

## Current checks

Run these commands from the project root:

```bash
pnpm check
pnpm test
pnpm build
```

Use the managed Preview screenshots for visual layout checks and browser interaction validation for form flows. The current Phase 1 acceptance path is:

1. Open `/dashboard`.
2. Create a tender through all three steps.
3. Confirm the new tender opens at its detail route.
4. Open the reveal window.
5. Open `/dashboard/invitations/BV—2041` as a supplier.
6. Submit a bid and confirm the sealed receipt.
7. Return to the tender and confirm the reveal and award actions are represented.
8. Confirm activity events are visible.

## Unit tests

Unit-test pure helpers and domain transitions where possible:

- Tender ID and status transitions.
- Requirement addition/removal.
- Bid submission validation.
- Reveal authorization rules.
- Award eligibility rules.
- Status label and tone mapping.
- Route parameter decoding.

## Component and interaction tests

Test accessible controls and visible state changes:

- Create-tender step progression and disabled publish state.
- Requirement add/remove behavior.
- Role switcher behavior.
- Supplier bid validation and receipt state.
- Reveal button visibility before and after the reveal window opens.
- Award button visibility only for revealed bids.
- FAQ accordion keyboard interaction.
- Mobile navigation and focus visibility.

## Server and database tests

When persistence is added, cover:

- Organization isolation.
- Buyer and supplier role permissions.
- Tender ownership and invitation access.
- Rejection of duplicate or late submissions.
- Safe projection of sealed bids.
- Audit event creation for each mutation.
- Migration correctness and rollback assumptions.
- Upload size, type, and access controls.

## Contract tests

When Compact contracts are introduced, test both valid and invalid transitions:

- Publish only from draft.
- Submit only before the deadline and only once per supplier/tender.
- Reject bids with invalid or missing eligibility proofs.
- Reject reveal before the review window.
- Reject reveals outside the published policy.
- Reject reveal and award actions from unauthorized actors.
- Reject award of a bid that was not authorized for review.
- Preserve commitments and audit references across transitions.

## Security and privacy tests

Add tests that assert sensitive values do not appear in public API payloads, server logs, activity events, analytics events, or initial HTML before reveal. Verify that a supplier cannot access another supplier's invitation or bid. Verify that browser role switches do not grant authorization. Exercise expired sessions, replayed requests, malformed proofs, and upload abuse.

## Visual QA

Review desktop and mobile for landing, dashboard, create tender, tender detail, supplier submission, and receipt screens. Look for text overflow, status contrast, focus visibility, clipped tables, overly dense metadata, and any accidental glossy treatment. Use `prefers-reduced-motion` during accessibility review.

## Definition of done

A feature is done when types pass, relevant tests pass, the production build passes, the route manifest matches source routes, interaction behavior is verified, privacy boundaries are documented, and the change is saved as an intentional checkpoint.
