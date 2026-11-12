# ZYNO Construction ERP — Enterprise Completion Plan

Last updated: 2026-11-02. Batch 0 is NOT closed: the canonical database gate is open on D-2, D-3 and D-4 (model-to-migration differences). D-1 is resolved. See `docs\CONSTRUCTION_ERP_IMPLEMENTATION_LOG.md`.
Authoritative module status: `docs/CONSTRUCTION_ERP_FEATURE_REGISTER.md`. This plan records the programme, the database policy and the evidence trail. Statuses use the prompt's five values: `NOT STARTED`, `PARTIAL`, `IMPLEMENTED`, `VERIFIED`, `BLOCKED`.

## 1. Database policy (in force)

- **SQLite is the only permitted database.** No MariaDB, MySQL, PostgreSQL, Neon, remote server, Docker database or cloud database.
- Approved root: `E:\Port\Construction\_sqlite_work\` (code: `src/config/sqlite_policy.js`, constant `APPROVED_ROOT`).
- Sub-folders created: `dev\`, `tests\`, `migrations\`, `backups\`, `reports\`.
- Every persistent SQLite file, journal, WAL/SHM file, snapshot and backup must resolve inside the approved root. Relative paths, `..` escapes, other drives, URLs, network shares and symbolic links that leave the root are refused.
- In-memory SQLite (`:memory:`) is permitted only for `isolated_test` unit fixtures.
- `src/config/db.js` opens SQLite only, after `assertDatabaseTarget()`; there is no default dialect.
- The repository `.env` points at a production host and is treated as unsafe legacy configuration. The guard refuses it. It has not been edited. Its owner should correct it.
- Retired: `scripts/test-mysql-ci.js` (now a refusing stub), `package.json` script `test:mysql` (removed). Originals kept under `retired/`.
- The database manifest is at `E:\Port\Construction\_sqlite_work\DATABASE_MANIFEST.md` (created with this plan).

## 2. Batch status

| Batch | Scope | Status | Evidence |
| --- | --- | --- | --- |
| 0 | Safety and baseline: SQLite-only guard, E: root, retirement of MySQL paths, inventories | NOT CLOSED | Final regression 2026-11-02 (run 5, 31 files, final code): exit 0, 31/31 suites, 354/354 tests (`scratchpad\final5\full5.log`). `getStatus()` read-only and tested. D-1 resolved by migration 16. Canonical database not created: D-2, D-3, D-4 open. |
| 1 | Canonical schema and migrations | PARTIAL | Fresh install of 17 migrations on a disposable file: `integrity_check` ok; 0 foreign-key violations; adoption report `MATCHES_CANONICAL` (names, declared types and defaults compared). Model comparison: 40 known differences (D-2 declared types 11; D-3 defaults 13; D-4 ON DELETE pairs 8), recorded in `KNOWN_MODEL_GAPS`. Baseline `--check` passes (47 foundation tables). |
| 2 | Security and shared infrastructure | PARTIAL | Permission middleware, company and project scoping, file access checks, IDOR tests, SoD tests exist. No lockout, no logout, no approval engine. See `docs/CONSTRUCTION_ERP_SECURITY.md`. |
| 3 | Inventory and equipment integrity | PARTIAL | Stock ledger and transfer lifecycle implemented and tested. Cross-project reallocation is BLOCKED by the 409 gate; ledger replacement not built. Reconciliation endpoint exists but has not been proven independent (see section 4). |
| 4–10 | Core project controls, procurement, finance, site operations, CRM, reporting, release | NOT STARTED or PARTIAL as recorded in the feature register | No verified end-to-end workflow yet. |

## 3. Module register (summary)

Status is the lowest honest status across backend, frontend, database, security, tests, integration and documentation. "API" means automated backend tests only. No frontend browser verification exists for the modules below except the earlier stock-transfer walkthrough.

| Module | Status | Basis |
| --- | --- | --- |
| Authentication, sign-in, token | PARTIAL | Works; lockout and logout missing |
| RBAC, users, roles | IMPLEMENTED | Tests in `security.test.js`, `project_setup.test.js` |
| Project header, structure, masters (backend) | IMPLEMENTED | `tests/project_setup.test.js` (27 tests, passed at the last full run); no frontend |
| Project frontend | PARTIAL | Existing wizard and detail pages; no setup screens |
| WBS, CBS, budgets, commitments, cost ledger | IMPLEMENTED | Budget, commitment and cost-ledger tests |
| Stock ledger and location balances | IMPLEMENTED | Inventory and ledger tests |
| Stock transfers (same project) | IMPLEMENTED | `stock_transfer*` tests; approval queue and in-transit board not browser-verified |
| Cross-project reallocation | BLOCKED | 409 gate; `tests/project_reallocation_gate.test.js` |
| Equipment reassignment | IMPLEMENTED | `tests/project_reallocation.test.js` (equipment cases) |
| Measurement book and contractor RA bills | IMPLEMENTED | `tests/measurement_billing.test.js` |
| Variation orders | IMPLEMENTED | `tests/variation_orders.test.js` |
| Procurement (quotations, POs, GRN, vendor invoices) | PARTIAL | `tests/procurement.test.js`, `tests/cumulative_matching.test.js`; no PR, no three-way match proof |
| Purchase requisitions | NOT STARTED | No model or route |
| Client billing and receivables | NOT STARTED | |
| CRM and tendering | NOT STARTED | |
| QA/QC, HSE, RFI, submittals | NOT STARTED | |
| Finance: GL, AR, payroll | NOT STARTED | Payroll sidebar group has no page |
| Handover and DLP | NOT STARTED | |
| Dashboards and reporting | PARTIAL | Basic dashboards; not role-based |
| Notifications and approval engine | PARTIAL / NOT STARTED | Per-module approvals only |

No module is `VERIFIED` yet. Verification needs the relevant browser or API workflow evidence, which does not exist for any module except the earlier stock-transfer walkthrough.

## 4. Inventory reconciliation: known defect (open)

The reconciliation audit described in the owner's brief says the endpoint can report `consistent` while comparing a value with itself. That has not yet been reproduced in this programme. Action: reproduce it against the current `/api/v1/inventory/reconciliation` code, then fix it and add an independent test before the reallocation gate is replaced. Status: `NOT-VERIFIED`. Owner: Batch 3.

## 5. Open items

1. Final regression on the final code (run 5, 31 files): done 2026-11-02, 354/354 tests, exit 0.
2. Canonical development database (`E:\Port\Construction\_sqlite_work\dev\construction_erp_dev.sqlite`): NOT created. Gate open on D-2, D-3 and D-4 (implementation log, section 6). The owner decides each class: align the models to the migrations (recommended, since the database enforces them) or accept the difference in writing. Then create by migrations only, with no seed.
3. Browser or API walkthrough of the project setup flow on the development database.
4. Replace `scripts/execute-inventory-adjustments.js` and related live-database scripts (untracked, unexecuted) with reviewed, SQLite-only tools or retire them.
5. The `seed` script in `package.json` pointed at a file that does not exist. Removed 2026-11-02; nothing referred to it. No seeding was added.
6. 22 test files use in-memory `sync({ force: true })` as fixtures. Acceptable under the policy (in-memory, unit fixtures). Migrating fixtures to migration-based setup is a later refactor.
7. Commit decision and checkpoints remain with the owner. No commits have been made in this programme.
8. Accounting, payroll and statutory rules are not implemented and must not be presented as compliant until requirements are validated.

## 6. Commands

Start the backend with the approved SQLite database (in the approved root only). The canonical file does not exist yet, so this example applies only after D-1 is closed and the file is created:

```
set DB_TARGET_CLASS=local_demo
set DB_DIALECT=sqlite
set DB_STORAGE=E:\Port\Construction\_sqlite_work\dev\construction_erp_dev.sqlite
set JWT_SECRET=<supply a value outside the repository>
node server.js
```

Do not use the repository `.env` as the source of database settings. Set them in the shell or a secret store, outside the repository.

Run the regression:

```
npx jest --runInBand --forceExit --testTimeout=900000
```

Fresh database and migrations: use a disposable `isolated_test` file, as in `ERP_SQLITE_ONLY_OPERATIONS.md`, section 4. Do not use `local_demo` for a disposable check.
