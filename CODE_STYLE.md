# Bidveil Code Style

## General principles

Prefer clear, domain-oriented code over clever abstractions. Keep privacy language and state transitions explicit. A future contributor should be able to trace an action from the button label to the state update, server boundary, or contract transaction.

Reuse the existing React, TypeScript, Vite, Wouter, Tailwind, Lucide, Drizzle, and Vitest setup. Do not add a new framework or state library for a small feature without explaining the boundary in `ARCHITECTURE.md`.

## TypeScript

Use strict types for domain records, action inputs, route parameters, and API responses. Prefer named types for shared concepts such as `Tender`, `Bid`, `TenderStatus`, and `BidStatus`. Avoid `any`; if an external payload is unknown, validate it at the boundary and narrow it.

Use `type` for data shapes and `interface` only when extension or declaration merging is useful. Keep functions small enough to read in one screen when possible. Use early returns for invalid state and give user-facing actions explicit success and failure results.

## React

Use function components and hooks. Keep page-level orchestration in pages and shared state in a context or service adapter. Do not duplicate the dashboard shell on every page. Keep labels and status semantics close to the control that owns them.

Use real links for navigation and real buttons for actions. Include accessible names for icon-only controls. Prefer controlled form fields when the value affects a preview or submission. Avoid putting protocol or persistence code directly into presentational components.

## Naming

- Components and page files: `PascalCase`, e.g. `TenderDetails.tsx`.
- Hooks and utility functions: `camelCase`, e.g. `useBidveilWorkspace`.
- Constants: `SCREAMING_SNAKE_CASE` only for true module constants; otherwise use descriptive camelCase.
- Status values: lowercase internal literals such as `sealed`, `review`, and `awarded`.
- User-facing labels: title case only when the design system calls for it; status metadata may be uppercase mono labels.

## CSS and design

Use the existing design tokens in `client/src/index.css`. Prefer semantic class names that describe the component or state, such as `.bid-room-row--winner`, rather than one-off visual names. Keep mobile rules near the relevant responsive section. Use the documented palette and state semantics in `DESIGN_SYSTEM.md`.

Do not introduce glossy cards, arbitrary gradients, unexplained shadows, or new fonts without a design-system update. Respect reduced motion and preserve keyboard focus styles.

## Data and privacy

Name fields according to their privacy meaning. Distinguish `amount` from `amountCommitment`, `proofStatus` from `proofPayload`, and `revealedAt` from `submittedAt`. Never log sensitive values merely to make debugging easier. Keep mock data visibly synthetic.

## Comments and documentation

Comment the reason behind a non-obvious privacy, security, or protocol decision. Do not comment obvious syntax. Update the relevant root document when changing architecture, schema, security assumptions, or workflow requirements.

## Git workflow

Use focused commits with imperative messages, such as `Build controlled reveal state` or `Add tender requirements schema`. Do not mix unrelated formatting, dependency upgrades, or generated files into a feature commit. Run `pnpm check`, relevant tests, and `pnpm build` before checkpointing. Never force-push or commit secrets.
