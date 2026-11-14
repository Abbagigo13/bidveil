# Bidveil Database

## Current state

The project was initialized with the managed server and database capabilities. The checked-in Drizzle schema currently contains the starter user/authentication records. Phase 1 does not persist tender or bid data to that database; `client/src/contexts/BidveilContext.tsx` seeds and manages the demonstration state in memory.

That means a browser refresh resets the workflow to the seeded demo state. This is acceptable for Phase 1 but must not be confused with production durability or confidentiality.

## Persistence principles

1. Store only what the application needs to operate and index.
2. Keep private bid values and supplier evidence out of broadly readable tables.
3. Treat the protocol as the source of truth for privacy-sensitive lifecycle facts once integrated.
4. Store transaction IDs, commitments, proof references, and hashes where they help indexing without reconstructing private content.
5. Define retention and deletion behavior before accepting real supplier documents.

## Target logical model

The following is the intended application-level model. It is a design target, not a migration that has already been applied.

### organizations

Represents a buyer or supplier organization.

- `id`
- `name`
- `slug`
- `created_at`
- `status`

### organization_members

Maps authenticated users to an organization and role.

- `id`
- `organization_id`
- `user_id`
- `role` (`buyer_admin`, `buyer_reviewer`, `supplier_admin`, `supplier_member`, `auditor`)
- `created_at`

### tenders

Stores human-readable tender metadata and the public/indexable portion of the lifecycle.

- `id`
- `organization_id`
- `chain_tender_id` or commitment reference
- `name`
- `description`
- `category`
- `deadline_at`
- `bid_rule`
- `reveal_policy`
- `status`
- `requirements_hash`
- `created_at`
- `published_at`
- `awarded_at`

Do not add a plaintext bid amount to this table.

### tender_requirements

Stores requirement labels and policy metadata. Private evidence belongs in a separate protected path or external encrypted storage.

- `id`
- `tender_id`
- `label`
- `proof_type`
- `position`
- `required`

### invitations

Represents a supplier invitation to a tender.

- `id`
- `tender_id`
- `supplier_organization_id`
- `status`
- `invited_at`
- `responded_at`

### bid_records

Stores the indexable shell of a bid, not necessarily the private value.

- `id`
- `tender_id`
- `supplier_organization_id`
- `chain_bid_id` or commitment reference
- `submission_receipt`
- `status`
- `proof_status`
- `submitted_at`
- `revealed_at`
- `awarded_at`

A plaintext amount may only be stored after an authorized reveal if the organization's retention policy permits it. Prefer encrypted or derived values where possible.

### proof_records

Stores proof metadata and result, not raw evidence by default.

- `id`
- `tender_id`
- `bid_id`
- `requirement_id`
- `proof_type`
- `result`
- `commitment_reference`
- `verified_at`
- `expires_at`

### reveal_events

Stores the authorized disclosure record.

- `id`
- `tender_id`
- `bid_id`
- `actor_user_id`
- `field_set_hash`
- `chain_transaction_id`
- `created_at`

### award_records

Stores the final award projection.

- `id`
- `tender_id`
- `winning_bid_id`
- `actor_user_id`
- `chain_transaction_id`
- `reason_note`
- `created_at`

### activity_events

A query-friendly projection of important lifecycle events.

- `id`
- `organization_id`
- `tender_id`
- `event_type`
- `subject_reference`
- `actor_reference`
- `chain_transaction_id`
- `created_at`

Do not put secrets, raw proof payloads, or full private bid content in an activity event.

## Migrations

Use Drizzle migrations for durable schema changes. Every migration should state whether it changes application metadata, an index, or a privacy-sensitive record. Schema changes that affect chain references or proof formats require a compatibility plan and a backfill strategy.

The managed development, testing, and production database may be shared by the platform. Never use destructive migration or test cleanup commands casually. Confirm the target environment and backup posture before changing live records.

## Retention

The future product should define separate retention periods for tender metadata, bid commitments, revealed fields, proof metadata, raw supplier evidence, and activity projections. Deleting a database projection must not falsely imply that a chain record or legal retention obligation has disappeared.
