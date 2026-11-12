# Construction ERP — Test Strategy

Status: Batch 0, updated 2026-11-02. Final regression (run 5): 31 of 31 suites, 354 of 354 tests, exit 0 (section 8).

## 1. Test layers in use

| Layer | Tool | Location | Database | What it proves |
| --- | --- | --- | --- | --- |
| API and business-rule tests | Jest 30.5.2 (`npx jest`) + Supertest 7.3.1 | `tests/*.test.js` (31 files in total) | In-memory SQLite (`:memory:`), set by `tests/setup/database-env.js` | Routes, validation, permissions, tenant scope, workflows, ledgers |
| Schema and migration tests | Jest + Sequelize migrator | `tests/schema_baseline.test.js`, `tests/migration.test.js`, `tests/migration_status.test.js`, `tests/sqlite_policy.test.js`, `tests/schema_introspection.test.js`, `tests/redundant_index_migration.test.js` | Disposable SQLite files under `E:\Port\Construction\_sqlite_work`; in-memory fixtures for the introspection and D-1 suites | Fresh install, comparison with models (ratchet), rollback, foreign keys, unique constraints, adoption refusal, read-only migration status, path policy, introspection rules, D-1 index |
| Safety guard tests | Jest, child processes | `tests/database_target_guard.test.js`, `tests/db_test_guard.test.js`, `tests/dev_sync_guard.test.js` | No connection to any real database | Refusal of production and undeclared targets; startup refusal |
| Frontend production build | Angular CLI (`ng build --configuration production`) | Frontend repository | None | Compilation, template and type checks |
| Frontend unit tests | Angular unit-test builder (`@angular/build:unit-test`, `ng test`) | `src/**/*.spec.ts` (65 files) | None | Mostly generated stubs; not a quality gate. Not run in this phase. |
| Browser acceptance | Built-in browser pane (manual or scripted) | Not automated | Demo | Earlier stock-transfer walkthrough only |
| MySQL/MariaDB integration | `scripts/test-mysql-ci.js`, `scripts/schema/mariadb-verify.js` | Not run | Not available | Not verified |

## 2. Environments

- **Test runs** use `NODE_ENV=test` and `tests/setup/database-env.js`, which sets the isolated target and blanks the database settings. This stops `.env` from supplying a production host.
- **Schema verification** uses SQLite files on drive E under `E:\Port\Construction\_sqlite_work` (helper `scripts/schema/sqlite-work-dir.js`). The helper refuses any location that is not on E:. Files are named `*.disposable.sqlite` and removed by the tests.
- **Demo** uses a separate SQLite file (not created in this phase except as described in the implementation log).
- **Production MySQL** (configured in `.env`) is never used for tests, migrations or demos.

## 3. Commands

Run from the backend repository root. Use Node v22 for the Angular build; Jest runs on the Node in use.

```
npx jest --runInBand --forceExit --testTimeout=900000                 # full backend regression
npx jest tests/schema_baseline.test.js --runInBand --forceExit        # schema and migration
npx jest tests/project_setup.test.js --runInBand --forceExit          # project setup
node scripts/schema/generate-baseline.js --check                      # baseline is current
node scripts/schema/build-canonical-snapshot.js                       # rebuild snapshot (E:)
node scripts/schema/adopt-report.js --out <file>                      # read-only, requires DB_TARGET_CLASS and a file on E:
```

Use `--runInBand` for suites that share a database file or spawn child processes. Measured on the development machine: 215 s to 1,240 s for the full suite across the Batch 0 runs (run 5, the final gate, took 215.3 s; see section 8).

## 4. Gates

A change is accepted only when:

1. The full backend regression passes with exact counts recorded (suites, tests, exit code).
2. The schema tests pass. The model-to-migration comparison shows no difference that is not listed in `KNOWN_MODEL_GAPS`, and every listed difference is classified in the implementation log (D-2, D-3, D-4). Zero differences is the target, not the current state.
3. `generate-baseline.js --check` exits 0.
4. The frontend production build exits 0 when frontend code changed.
5. No test uses a production host or writes outside `E:\Port\Construction\_sqlite_work` (except test temporary files in the repository's own folders, where the existing tests already write).

Failures are classified before any fix:
- regression (behaviour changed by this change),
- pre-existing defect (failed before the change),
- environment issue (timeouts, missing tools),
- incorrect expectation (the test is wrong).

Assertions are not weakened to make a test pass. A corrected expectation is recorded with its reason.

## 5. Coverage by area (automated)

| Area | Test files | Notes |
| --- | --- | --- |
| Security: IDOR, tenant isolation, SoD, file access, read-only roles | `security.test.js`, `stock_transfer_override.test.js`, `project_setup.test.js` | Partial coverage of the security requirements |
| Project master data and setup | `project_setup.test.js` | Header, structure rows, masters, validation, permissions, history |
| Budgets, WBS, CBS, commitments, cost ledger | `budget_heads.test.js`, `budget_wbs.test.js`, `budget_reconciliation_fix.test.js`, `commitment_reconciliation.test.js`, `project_cost_ledger.test.js` | |
| Procurement | `procurement.test.js`, `cumulative_matching.test.js` | |
| Inventory and stock transfers | `inventory_ledger.test.js`, `inventory_assignment.test.js`, `inventory_demo.test.js`, `stock_transfer.test.js`, `stock_transfer_location_uom.test.js`, `stock_transfer_override.test.js` | |
| Reallocation gate and equipment reassignment | `project_reallocation_gate.test.js`, `project_reallocation.test.js` | |
| Measurement, RA billing, variations | `measurement_billing.test.js`, `variation_orders.test.js` | |
| Menus, RBAC, concurrency, hardening | `menu_management_enterprise.test.js`, `concurrency_hardening.test.js` | |
| Copilot and snag | `copilot_snag.test.js` | |
| Schema, migrations, guards | `schema_baseline.test.js`, `migration.test.js`, `migration_status.test.js`, `sqlite_policy.test.js`, `database_target_guard.test.js`, `db_test_guard.test.js`, `dev_sync_guard.test.js` | `migration_status.test.js` (4 tests): read-only `getStatus()`, missing metadata table, out-of-root refusal, non-SQLite refusal |

Not covered by automated tests: HSE, QA/QC, RFI, documents beyond file access, equipment maintenance, payroll, GL/AR, handover and DLP, notifications, AI copilot behaviour beyond snags, frontend behaviour (apart from the build).

## 6. Known test gaps

1. Frontend behaviour is not tested. The 65 Angular spec files are mostly generated stubs.
2. MySQL/MariaDB has never been run against the test suite.
3. Concurrency tests run sequentially on SQLite because SQLite cannot run parallel transactions. The concurrent stock-checkout race remains unverified.
4. No performance or load tests.
5. No end-to-end tests (browser or API journeys across modules). The earlier stock-transfer walkthrough was manual.
6. Test counts differ from `it`/`test` line counts because `describe.each` expands cases.
7. Model-to-migration differences are open: 11 declared types (D-2), 13 defaults (D-3) and 8 foreign-key ON DELETE pairs (D-4). They are the 40 entries of `KNOWN_MODEL_GAPS`.
8. Declared types are compared as text, so a length difference that SQLite does not enforce is still reported (D-2).

## 8. Batch 0 evidence (2026-11-02)

| Run | Code state | Result | Duration | Log |
| --- | --- | --- | --- | --- |
| Final regression (run 5) | 31 files, final code | Exit 0; 31/31 suites; 354/354 tests; 0 failed; 0 skipped | 215.3 s | `scratchpad\final5\full5.log` |
| `tests/schema_introspection.test.js` | 9 tests | 9/9 passed | — | focused run |
| `tests/redundant_index_migration.test.js` | 5 tests | 5/5 passed | — | focused run |
| `tests/schema_baseline.test.js` | 14 tests (includes the committed baseline check and the ratchet) | 14/14 passed | — | focused run |
| Final regression (run 4) | 29 files | Exit 0; 29/29 suites; 340/340 tests | 1,004.5 s | `scratchpad\final4\full.log` |
| `tests/migration_status.test.js` | 4 tests | 4/4 passed; exit 0 | 38.6 s | run before run 4 |
| `tests/migration.test.js` | 2 tests | 2/2 passed; exit 0 | 13.4 s | `scratchpad\final4\migration.log` |
| `tests/sqlite_policy.test.js` | 10 tests | 10/10 passed; exit 0 | 8.3 s | `scratchpad\final4\sqlite_policy.log` |

Earlier full runs on the code before the final changes (28 files, 336 tests each) are in the implementation log, section 2. They are superseded by run 4.

Test files written in this phase: `tests/migration_status.test.js`, `tests/schema_introspection.test.js`, `tests/redundant_index_migration.test.js`. Disposable files created by the tests are named with a unique suffix under `_sqlite_work\tests\` and removed by the test.

## 7. Defect and regression handling

- A defect found by a test is fixed in the code, not by weakening the test.
- Each fix to a previously failing behaviour gains a regression test in the same suite.
- The regression suite is run after every significant change. The results are recorded in the implementation log with the exact command.
