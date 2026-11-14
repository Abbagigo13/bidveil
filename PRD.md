# Bidveil Product Requirements Document

## 1. Product summary

Bidveil is a privacy-preserving procurement workspace that lets organizations run sealed-bid tenders without forcing suppliers to expose every sensitive commercial detail. Buyers define the process and disclosure policy before bids arrive. Suppliers prove eligibility and submit a sealed bid. Buyers reveal only what the decision requires, then record the outcome.

The product will eventually use Midnight Compact contracts and private state. The first product slice is intentionally application-led so the team can validate the workflow, language, and interaction model before protocol integration.

## 2. Problem

Traditional procurement tools tend to fail in one of two directions. They expose too much information, allowing commercial data and supplier evidence to circulate more widely than necessary, or they hide process state so completely that suppliers cannot understand how a decision was made. Buyers need confidentiality without losing auditability. Suppliers need a fair process without revealing their price or sensitive qualifications to competitors.

Bidveil addresses the tension with explicit rules, sealed submissions, private eligibility proofs, selective disclosure, and an integrity trail.

## 3. Users

### Buyer

A procurement owner, operations lead, or committee member who publishes a tender, defines the rules, verifies supplier eligibility, reviews revealed information, and records an award.

### Supplier

A company invited to a tender that needs to understand the brief, prove it meets the requirements, submit a commercial proposal, and retain control over what competitors can see.

### Auditor or reviewer

A person who needs to inspect the sequence of tender publication, proofs, reveal events, and award decisions without receiving unrelated private bid data.

## 4. Goals

- Make a sealed-bid procurement process understandable without specialist protocol knowledge.
- Give buyers control over requirements, bid rules, deadlines, and reveal policies.
- Give suppliers a clear receipt and privacy state after submission.
- Make eligibility and integrity states legible without exposing underlying evidence unnecessarily.
- Create a clean path from local prototype to Compact contract and wallet-backed execution.

## 5. Non-goals for the first release

- Full ERP, invoicing, purchase-order, or payment settlement functionality.
- Automated legal compliance advice.
- Anonymous supplier identity with no accountable organization behind it.
- A general-purpose document management system.
- A public marketplace of all tenders.
- Claiming that a UI state is a cryptographic proof before the proof system is connected.

## 6. User journeys

### Buyer journey

1. Create a tender.
2. Add a concise brief and requirements.
3. Choose a bid rule and deadline.
4. Choose the reveal policy before publishing.
5. Monitor sealed bid and eligibility states.
6. Open the reveal window.
7. Reveal only the authorized bid fields.
8. Award a supplier.
9. Review the integrity activity trail.

### Supplier journey

1. Open an invitation.
2. Read the brief, deadline, bid rule, and reveal policy.
3. Complete eligibility requirements.
4. Enter a bid value and proposal summary.
5. Submit a sealed bid.
6. Receive a submission receipt.
7. Observe whether the bid is still sealed, revealed, or awarded.

## 7. Functional requirements

### Tender setup

A buyer must be able to provide a tender name, description, category, requirements, submission deadline, bid rule, and reveal policy. The tender must be assigned a stable ID and appear in the buyer workspace after publication.

### Sealed bid submission

A supplier must be able to provide a bid value and proposal summary. The application must display the bid as sealed after submission and must not display the bid value to an unrelated supplier or to the buyer before the reveal policy allows it.

### Eligibility

Each requirement must have a visible state such as pending, verified, or failed. The user interface should show the verification result without making the underlying evidence public by default.

### Controlled reveal

A buyer must be able to open a reveal window and select authorized fields or bids for review. Each reveal must create an integrity activity event. A reveal policy must be set before publication and must be visible on the tender detail page.

### Award

A buyer must be able to award a revealed bid. The winner, non-selected bids, and award event must be represented as distinct states. The product must not imply that an unopened or unrevealed bid was evaluated on visible price data.

### Activity

The integrity log must show at least tender publication, sealed bid submission, reveal, and award events with a human-readable detail and time.

## 8. Phase plan

### Phase 1 — Delivered

A responsive React prototype with local workspace state, seeded buyer and supplier paths, tender creation, sealed bid submission, reveal, award, and activity log.

### Phase 2 — Protocol integration

Add Compact contracts, wallet connection, private state, proof generation, transaction receipts, and a test network environment. Preserve the same product language while changing the state source.

### Phase 3 — Persistent application data

Add authenticated organizations, durable tender metadata, notification records, audit indexing, supplier profiles, and encrypted or reference-based document storage.

### Phase 4 — Production hardening

Add operational monitoring, stronger authorization, retention controls, contract upgrades or migration strategy, external security review, and an incident response playbook.

## 9. Success criteria

The product is successful when a new user can understand what is private, what is verified, and what will be revealed; a buyer can complete a tender lifecycle without ambiguity; a supplier can submit without exposing its commercial position; and an auditor can explain how the award followed the published rules.

## 10. Product language

Use “sealed,” “verified,” “controlled reveal,” and “integrity record” consistently. Avoid claiming that privacy is cryptographic until the protocol integration is live. Prefer “preview,” “prototype,” or “local workspace” when describing Phase 1 behavior.
