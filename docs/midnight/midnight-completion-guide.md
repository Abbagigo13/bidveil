# Bidveil on Midnight: what's left and how to deploy

Checked against docs.midnight.network on 14 Nov 2026. The hackathon program ends 27 Nov 2026, so this is a 13-day plan.

## What exists today

- Bidveil prototype (cloned into `bidveil/`): buyer and supplier UI, in-memory state, no Midnight connection.
- Design doc: `contracts/Tender-design.md` (state, circuits, privacy model, tests, roadmap).

## What's left

| # | Work | Output | Days |
| --- | --- | --- | --- |
| 1 | Set up toolchain and clone the examples repo | Compiling Hello World | 0.5 |
| 2 | Write `Tender.compact` (start with the smallest vertical slice) | Compiles with `compact compile` | 2-3 |
| 3 | Simulator tests | Green `vitest` suite | 2 |
| 4 | TypeScript API class (deploy and call) and witnesses | Node script that runs a full tender | 2 |
| 5 | Deploy to Preview, record tx hashes | Deployment evidence file | 0.5 |
| 6 | Wire the Bidveil UI to the API (Lace wallet) | Working demo | 2-3 |
| 7 | README, architecture diagram, pitch deck, demo video | Submission pack | 2 |

### Build in slices (so you always have something to submit)

1. Slice A (must ship): constructor (create tender), `registerSupplier`, `submitBid`, `openReview`, `revealBid`, `awardTender`. Use a plain buyer-secret check. Compile and test.
2. Slice B: credential attestation check (issuer signature) and bid nullifier.
3. Slice C: reveal mask, `rejectBid`, onchain ciphertext.
4. Slice D: Lace browser flow. If time runs out, ship a CLI demo script instead.

Never cut: a compiling contract, the invalid-proof, duplicate-bid and unauthorized-reveal tests, and one live-network deployment.

## Deploy guide

Requirements: Linux or Mac (on Windows use WSL), Docker Desktop, Node.js 22, Chrome with the Lace Midnight wallet.

### 1. Install the compiler
```
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
source ~/.bashrc        # or ~/.zshrc
compact update 0.36.0
compact compile --version
```
Pin 0.36.0 (language 0.28). A bare `compact update` can install a version the networks don't run yet.

### 2. Start from the official examples
```
git clone https://github.com/midnightntwrk/midnight-examples.git
cd midnight-examples
npm install && npm run compile
```
Copy the `examples/leaderboard` or `examples/zk-loan` layout for your project. The zk-loan example shows the issuer-signature pattern you need for supplier credentials.

### 3. Put your contract in the Bidveil repo
Create `contract/Tender.compact` with `pragma language_version 0.28;` and `import CompactStandardLibrary;`. Compile:
```
compact compile contract/Tender.compact contract/managed/tender
```
(Check the exact arguments in the compiler usage page; they can differ by version.) Compiling produces the TypeScript bindings and the circuit keys the API needs.

### 4. Run a proof server
```
docker run -p 6300:6300 -e MIDNIGHT_PROOF_SERVER_VERBOSE=true midnightntwrk/proof-server:9.0.0
```
In Lace, open Settings, Midnight, and choose Local (`http://localhost:6300`).

### 5. Create and fund a wallet
The docs say the local devnet doesn't run ledger 9 yet, so test on Preview. In midnight-examples, `npm run wallets:new` creates test wallets and prints addresses. Fund them at the Preview faucet linked in the Leaderboard tutorial: https://midnight-tmnight-preview.nethermind.dev/

### 6. Deploy from TypeScript
Follow the Leaderboard tutorial's API layer. The pattern is:
- Build providers: private state (LevelDB), indexer, proof server (`httpClientProofProvider`), wallet.
- Call `deployContract(providers, {...})` with your compiled contract, initial private state, and constructor arguments (issuer key, deadlines, weights, mask).
- Save the printed contract address. Later calls use `findDeployedContract`.

### 7. Run the tests against the network
```
npm run proof:up
npm run test:preview
```
Keep the output as test evidence.

### 8. Preprod
Preprod moved to ledger 9 on 9 Nov 2026. Deploy there with the Leaderboard tutorial's production steps (Blockfrost project id for the indexer; use one you're willing to expose, since Vite bakes it into the bundle).

### 9. Record deployment evidence
Contract address, deploy tx hash, one tx hash per circuit, explorer links, compiler version (0.36.0), proof server version (9.0.0), the test log, and the demo video link.

## Things to watch

- Every `disclose()` is a privacy decision. Review each one.
- Witness values are untrusted. Constrain every one inside the circuit (the zk-loan page shows a real forgery bug of this kind).
- Keep secrets (buyer, supplier, issuer keys) out of the repo and out of `.env` files you commit.
- Don't claim mainnet. Say Preview or Preprod in the submission.
