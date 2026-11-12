# Construction ERP — Implementation Plan

Status: Phase 0 baseline, 2026-11-01.

## 1. Approval boundary

- Approved: Batch 0 (database foundation, safety guards, Git checkpoints, verification on SQLite on E:).
- Requested by the owner and carried out: project master data backend, and a demo project in a fresh SQLite file on E:.
- Not approved: project setup frontend, any further ERP module, production migrations, MariaDB work (outstanding requirement), paid services, credential changes, commits beyond the approved Batch 0 checkpoints.

Each later batch needs explicit approval before it starts.

## 2. Phase map (from the master implementation prompt)

| Phase | Content | State |
| --- | --- | --- |
| 0 — Baseline and discovery | Repository inspection, feature register, Phase 0 documents, baseline snapshot | IN PROGRESS. Snapshot and audit done (2026-10-31). Documents in `docs/`. Regression result pending. |
| 1 — Foundation and security | Strengthen authentication, RBAC, tenant isolation, audit logging, database integrity | NOT STARTED as a phase. Partial work already in place: database guard, migration safety, project-scoped access. |
| 2 — Master data and project foundation | Organization, project, clients, vendors, users, WBS/CBS, cost codes, BOQ, budgets, planning | PARTIAL. Backend project setup done; frontend not authorised. Branches and departments missing. |
| 3 — Contracts and commercial | Tender, estimation, contracts, variations, change orders | NOT STARTED (variation orders exist) |
| 4 — Procurement and inventory | PR, RFQ, quotation evaluation, PO, GRN, warehouse, stock ledger, issue and returns | PARTIAL. Stock ledger and transfers exist. PR missing. |
| 5 — Construction execution | Site management, DWR, subcontractors, labour, measurement book, RA billing, equipment, progress | PARTIAL. MB and contractor RA bills exist. |
| 6 — Finance and billing | GL, AP, AR, client billing, receipts, tax configuration, cost accounting | PARTIAL (cost ledger and commitments). GL and AR missing. |
| 7 — Quality, safety, documentation | QA/QC, NCR, HSE, permits, documents, RFI, submittals, transmittals | NOT STARTED (documents partial) |
| 8 — Workflow and automation | Approval engine, delegation, escalation, notifications, background jobs | NOT STARTED (per-module approvals only) |
| 9 — Dashboards and analytics | Role-based dashboards, reports, exports | NOT STARTED (basic dashboards exist) |
| 10 — Handover, DLP, integration | Handover, snags, final account, DLP, archive | NOT STARTED |
| 11 — Final QA and release readiness | Full regression, E2E, security review, performance, backup, deployment | NOT STARTED |

## 3. Immediate plan (Batch 0 completion)

1. Record the full backend regression result (exact counts, exit code). Classify any failure before fixing it.
2. Confirm the baseline generator and snapshot on E:. Confirm the exclusions are deliberate (`docs/CONSTRUCTION_ERP_DATABASE_DESIGN.md` section 3).
3. Create the demo project in a fresh SQLite file on E:, using placeholder values, through the project setup backend. Verify persistence after a restart and retrieval through the API.
4. Record the MariaDB 10.6 requirement as outstanding. Do not claim compatibility.
5. Produce the Batch 0 report and present the next batch for approval.

## 4. Proposed next batches (not authorised)

| Order | Batch | Dependencies | Notes |
| --- | --- | --- | --- |
| 1 | Project setup frontend | Batch 0 approval | Screen for header, structure and masters; reuse the existing projects module design |
| 2 | Approval engine (minimum) | Batch 0 | Configurable steps, sequential approvals, history. Needed before PR and PO. |
| 3 | Procurement chain: PR, RFQ evaluation, PO revisions, GRN inspection | Approval engine; project budget | Connects to commitments and stock ledger |
| 4 | Inventory: reservations, returns, damaged stock, ageing | Procurement, stock ledger | Replaces the blocked cross-project reallocation with a ledger design |
| 5 | Client billing and receivables | Contract model (new), measurement book | Client RA bill, certification, receipts |
| 6 | Quality and HSE | Documents, approval engine | NCR, inspections, incidents |
| 7 | Finance core (GL, AP/AR) | Billing and procurement | Subject to the owner's decision on the finance boundary (scope §06) |

Each batch: database migration and rollback, API, permissions, tests, documentation, and an explicit regression run.

## 5. Risks and blockers

| ID | Risk | Impact | Mitigation |
| --- | --- | --- | --- |
| R1 | MariaDB 10.6 not verified | Production readiness unknown | Requirement kept open; verification script prepared (`scripts/schema/mariadb-verify.js`, blocked without isolated settings) |
| R2 | Repository `.env` points at production host | Accidental production connection | Guard refuses it; owner should correct the file |
| R3 | Untracked scripts that write to a live database | Accidental data change | Not run; excluded from commits; owner decision required |
| R4 | Uncommitted work in both repositories | Loss or confusion of changes | Checkpoint commits only after approval |
| R5 | Project detail frontend component is very large | Change risk | Refactor only as part of an authorised frontend batch |
| R6 | No approval engine | Inconsistent workflows | Batch 2 |
| R7 | Low password hashing cost, no lockout, no logout | Security | Security batch (see the security document) |
| R8 | Finance boundary undecided (scope §06) | Scope change risk | Owner decision |
| R9 | C: drive free space | Build and test failures | Verification files on E:; C: still holds the scratchpad, demo copy and temporary files used by the tooling |
| R10 | Frontend tests are stubs | No behavioural regression coverage | Add tests in the frontend batch |

## 6. Decisions requested from the owner

1. Approve the project setup frontend as the next batch, or defer it.
2. Decide the finance boundary (integrate with an external accounting system or build a general ledger).
3. Decide whether the repositories' Batch 0 changes are committed as checkpoints, and when.
4. Provide an isolated MariaDB 10.6 environment with connection settings supplied outside chat, when available.
5. Decide whether to correct or remove the untracked live-database scripts.
