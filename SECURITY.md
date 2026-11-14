# Bidveil Security

## Scope and status

This document defines the security model for Bidveil and distinguishes current prototype behavior from the controls required for production. Phase 1 is a local in-memory demonstration. It is not suitable for real tenders, real supplier documents, or real financial decisions.

The most important security principle is that a UI label is not a security boundary. “Sealed,” “verified,” and “revealed” become trustworthy production states only when enforced by the protocol, authenticated application authorization, protected storage, and auditable transitions.

## Security goals

- Keep sealed bid values hidden from unauthorized users before reveal.
- Let suppliers prove eligibility without broadly exposing underlying evidence.
- Prevent unauthorized reveal and award actions.
- Make lifecycle transitions auditable and resistant to silent rewriting.
- Keep credentials, signing keys, and service secrets out of browser bundles and repositories.
- Reduce the amount of sensitive data retained by the application.

## Threat model

Assume that an attacker may be an unauthenticated visitor, an authenticated but unauthorized organization member, a competing supplier, a compromised browser session, a malicious or misconfigured server operator, or an observer of public chain and application metadata. Also assume that supplier-submitted documents may contain personal, financial, or commercially sensitive data.

The application must not rely on obscurity of route URLs, CSS hiding, client-side role switches, or a status label as protection. Authorization must be checked at the server and/or contract boundary.

## Current Phase 1 boundary

- State is in browser memory and resets on refresh.
- There is no production organization authorization model in the workflow pages.
- No actual wallet, proof, contract, or private transaction is connected.
- Demo values are not real secrets, but the UI must not be repurposed with real supplier data.
- The prototype banner explicitly tells users that the workflow is local and demonstrable.

## Target controls

### Identity and authorization

Authenticate users through the project-approved authentication capability. Scope every tender, invitation, bid, proof, reveal, and award to an organization. Enforce least privilege for buyer admins, reviewers, supplier members, and auditors. Re-check authorization on every mutation; do not trust a role stored only in the browser.

### Sealed bids

Use Compact private state or a commitment/encryption design that prevents the application server and competing suppliers from reading a bid before the reveal rule permits it. Do not send plaintext bid values in initial page payloads, logs, analytics events, or broad database queries.

### Proofs and evidence

Prefer proof metadata, commitments, and verification results over raw evidence. If raw evidence must be uploaded, encrypt it, limit access by tender and organization, set an explicit retention period, and avoid putting it in application logs or URLs.

### Reveal and award

Require an authenticated actor and contract/application authorization for reveal and award. Record the actor, authorized field set, transaction or commitment reference, and time. The UI should update only after a verifiable success response rather than optimistically claiming a reveal happened.

### Secrets

Use managed project secrets or platform capabilities. Never commit API keys, private keys, wallet seed phrases, database passwords, signed URLs, or raw credentials. Public runtime configuration may contain only values that are intentionally safe for browser delivery.

### Web security

Use secure session cookies for cross-site Preview when cookie-based authentication is introduced. Apply CSRF protection where relevant, validate request bodies, limit upload types and sizes, escape user-generated content, and set safe response headers without blocking the embedded Preview environment.

### Logging

Logs must not contain plaintext bid amounts before authorized reveal, raw supplier evidence, proof payloads, session cookies, authorization headers, or wallet secrets. Use stable non-sensitive references for debugging. Review browser and server debug collectors before enabling them in production.

## Privacy by design checklist

- What is the minimum data needed for this screen?
- Is the field private, verifiable, selectively revealable, or public?
- Can the UI show a proof result instead of the underlying document?
- Does this event need to be indexed, or only represented on the chain?
- What is the retention period?
- Who can decrypt, reveal, or delete it?

## Incident response

When a privacy incident is suspected, stop further disclosure, preserve relevant non-sensitive logs, identify affected tenders and organizations, rotate compromised credentials, and disable the affected route or integration if necessary. Do not delete evidence before the incident owner has captured the timeline. Record whether the issue affected UI display, application storage, contract state, or an external integration.

## Security gates before production

Before real use, complete authenticated authorization tests, contract transition tests, proof validation tests, secret scanning, dependency review, upload abuse tests, privacy-focused logging review, retention review, and an external security assessment appropriate to the Compact and wallet integration.
