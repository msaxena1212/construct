# Construction ERP — Implementation Log

Status (updated 2026-11-04): Batch 0 gates are met. D-1 is resolved (migration 16), D-2 and D-5 are closed by migrations 17 and 18, D-3 is accepted in writing, and the canonical development database exists and is verified at 20 migrations (section 12). Feature work after Batch 0 (DPR images, item-wise budget, MS Project import and export) is recorded in section 12. Sections 1 to 11 describe the earlier state and are kept as evidence.

Policy in force: SQLite is the only permitted database. Every persistent SQLite file is under `E:\Port\Construction\_sqlite_work\`. No production connection was made. The repository `.env` was not edited. The C: `demo3.sqlite` was not moved, modified or migrated. Nothing has been committed.

## 1. Batch 0 status at 2026-11-02

| Item | Result | Evidence |
| --- | --- | --- |
| Final backend regression (regression #5, 31 files, final code) | PASSED: exit 0; 31/31 suites; 354/354 tests; 0 failed; 0 skipped | Section 2 |
| `MigrationRunner.getStatus()` | Read-only; path checked first; 4 focused tests | Section 3 |
| D-1: redundant unique index on `PROJECT_TASK_ASSIGNEE` | **Resolved** by a recorded forward migration; primary key intact | Section 4 |
| Introspection and comparison rules | Corrected; explicit indexes, defaults and declared types are now captured and compared | Section 5 |
| Model-to-migration differences | **Open**: D-2 (11 declared types), D-3 (13 defaults), D-4 (8 foreign-key actions), recorded as known gaps | Section 6 |
| Fresh install, 17 migrations, disposable file | PASSED; integrity `ok`; 0 foreign-key violations; duplicate primary key rejected; adoption report `MATCHES_CANONICAL` | Section 7 |
| Canonical development database | **Not created.** Gate open (D-2, D-3, D-4). | Section 8 |
| `mysql2` dependency | Kept, pending a separate approval | Section 9 |
| Live-MySQL scripts | Untouched, unexecuted | Section 9 |

## 2. Regression history

All runs used `npx jest --runInBand --forceExit --testTimeout=900000` in the backend root.

| Run | Code state | Start | End | Exit | Suites | Tests | Duration | Log |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 28 files; before the `server.js`, `migrate.js` and `seed` fixes | 12:07:28 | 12:28:26 | 0 | 28/28 | 336/336 | 1,239.9 s | `scratchpad\final\full.log` |
| 2 | 28 files; after those fixes; before the `getStatus()` change | 12:30:35 | 12:42:18 | 0 | 28/28 | 336/336 | 562.5 s | `scratchpad\final2\full.log` |
| 3 | 28 files; after the `getStatus()` change | 12:42:58 | 12:53:43 | 0 | 28/28 | 336/336 | 594.5 s | `scratchpad\final3\full.log` |
| 4 | 29 files; adds `tests/migration_status.test.js` | 15:31:01 | 15:49:11 | 0 | 29/29 | 340/340 | 1,004.5 s | `scratchpad\final4\full.log` |
| 5 | **31 files (final code)**; adds `tests/schema_introspection.test.js` and `tests/redundant_index_migration.test.js`; ratchet in `schema_baseline.test.js` | 16:36:47 (IST) | 16:40:36 (IST) | 0 | **31/31** | **354/354** | 215.3 s | `scratchpad\final5\full5.log` |

Run 5 took 215 s, against 560 to 1,240 s for earlier runs. The cause was not investigated; the figure is reported as measured. Run 5 is the gate for the current code.

Focused runs on the current code before run 5 (all exit 0 after correction):

| Suite | Result |
| --- | --- |
| `tests/schema_introspection.test.js` (new) | 9/9 |
| `tests/redundant_index_migration.test.js` (new) | 5/5 |
| `tests/schema_baseline.test.js` | 14/14 (includes the committed baseline check and the ratchet) |
| `tests/migration.test.js` | 2/2 |
| `tests/migration_status.test.js` | 4/4 |
| `tests/sqlite_policy.test.js` | 10/10 |

Two corrections were made during this phase, and their suites were re-run. (a) Two duplicate-key tests failed because Sequelize reports the SQLite error as "Validation error"; the tests now read the wrapped messages, and the assertions are unchanged. (b) The first run of `schema_baseline.test.js` stopped part-way through a migration (exit 127, log ends mid-run); it was re-run in full and passed.

## 3. Code and test changes in this phase (backend)

Earlier in the phase:
- `src/core/utils/migrator.js`: `getStatus()` runs `assertApprovedSqliteStorage()` before any database access and reads applied records with `readAppliedIfPresent()`. It no longer creates `sequelize_meta`. `getAppliedMigrations()` still creates the table; it is used by tests and write paths only.
- `server.js`: the startup environment check requires `JWT_SECRET` only. The MySQL-era checks for `DB_HOST`, `DB_NAME` and `DB_USER` were removed. The database guard still runs first.
- `scripts/migrate.js`: the preflight prints the migration class, dialect and storage path. It no longer prints host, port or database.
- `scripts/schema/sqlite-work-dir.js`: the comment describing an override was corrected. The root is fixed by policy.
- `package.json`: the `seed` script was removed. It pointed at a missing `seed.js`; nothing referred to it.
- `.env.example` and `README.md`: MySQL settings replaced by `DB_TARGET_CLASS`, `DB_DIALECT` and `DB_STORAGE` placeholders.
- `tests/migration_status.test.js` (new): four `getStatus()` tests (missing metadata table; file database with recorded rows; out-of-root path including `..`; non-SQLite instance).

In this phase's D-1 and introspection work:
- `scripts/schema/introspect.js`: rewritten. Explicit indexes (origin `c`) and constraint indexes (origin `u`) are always reported; only the primary-key index (origin `pk`) is excluded. Index name, uniqueness, partial condition, ordered key columns with sort order and collation are kept. Columns carry the raw declared type and default expression. New helper `indexSignature()`.
- `scripts/schema/adopt-report.js`: `diffTable()` is the single comparison rule. It compares column presence (both directions), family, declared type text, nullability, primary key and default; index definitions as a multiset (both directions), with names only when `names: true` is passed; foreign keys including the ON DELETE action (both directions).
- `migrations/20261102000001-drop-redundant-project-task-assignee-index.js` (new): forward migration; see section 4.
- `scripts/schema/canonical-schema.json`: regenerated from 17 migrations: 75 tables, 47 baseline tables, defaults, declared types and index columns included.
- `tests/schema_baseline.test.js`: the canonical comparison uses `names: true`. The model oracle is now a ratchet: `KNOWN_MODEL_GAPS` lists the 40 open differences with their classes; any new difference fails, and so does a listed difference that disappears. The constraint-rollback test holds the new migration back, like the other dependent migrations.
- `tests/migration.test.js`: the new migration is listed in `SKIP` (it needs the baseline tables). The expected count of 13 is unchanged.
- `tests/schema_introspection.test.js` (new, 9 tests): explicit index overlapping the primary key is reported; primary-key index is not; primary-key uniqueness still enforced; sort order, collation and partial conditions recorded; constraint index reported; declared types and defaults captured; comparison reports both directions and names only when asked; default and type differences reported.
- `tests/redundant_index_migration.test.js` (new, 5 tests): the migration is applied and the explicit index is gone; the primary key is intact; a duplicate `(task_id, user_id)` is rejected; `integrity_check` is `ok` and `foreign_key_check` is empty; rolling back restores the index exactly and applying again removes it.

## 4. D-1: redundant unique index on PROJECT_TASK_ASSIGNEE (resolved)

**Index definition** (from `sqlite_master`, `PRAGMA index_list` and `PRAGMA index_xinfo` on the fresh-install file, read-only):
- Name `PROJECT_TASK_ASSIGNEE_user_id_task_id_unique`; `CREATE UNIQUE INDEX ... ON PROJECT_TASK_ASSIGNEE (task_id, user_id)`.
- Origin `c` (explicit); unique; not partial; no expression columns.
- Key columns: `task_id` ascending, BINARY; `user_id` ascending, BINARY.
- The primary key is `(task_id, user_id)`, with the automatic index `sqlite_autoindex_PROJECT_TASK_ASSIGNEE_1` (origin `pk`), identical in columns, order, collation and sort.

**Source.** The model declares the same unique key: `src/models/index.js` line 271 (`db.user.belongsToMany(db.project_task, { through: db.project_task_assignee, ... })`). Sequelize derives the key `PROJECT_TASK_ASSIGNEE_user_id_task_id_unique` from it. In the in-memory model oracle, SQLite folds that key into the primary-key index, so the model's effective schema has no second index. The baseline migration created the second index explicitly.

**Decision: Case A (genuinely redundant).** The explicit index is removed by a forward migration. The primary key and the data are not touched. The baseline migration is not edited.

**Migration** `migrations/20261102000001-drop-redundant-project-task-assignee-index.js`:
- `up`: `DROP INDEX` on the named index.
- `down`: `CREATE UNIQUE INDEX` with the same name and columns, restoring the previous definition exactly.
- Both are SQLite-only raw SQL. The file avoids the `addIndex`, `addColumn` and `createTable` call patterns that the baseline generator scans for.

**Verification**:
- Fresh file with 17 migrations applied: the explicit index is absent; only the primary-key index remains.
- Primary key intact: `task_id` and `user_id`, both primary-key columns.
- Duplicate `(task_id, user_id)` insert on the disposable file: first insert accepted, second rejected with `SQLITE_CONSTRAINT: UNIQUE constraint failed: PROJECT_TASK_ASSIGNEE.task_id, PROJECT_TASK_ASSIGNEE.user_id`; the transaction was rolled back and 0 rows remain.
- `PRAGMA integrity_check`: `ok`. `PRAGMA foreign_key_check`: no rows.
- Rollback restores the index with the signature `UNIQUE(task_id, user_id)` and the baseline name; re-applying removes it (test).

**Risk to note.** `scripts/schema/generate-baseline.js` derives indexes from the model's unique keys. If the baseline were ever regenerated, the generator would re-emit this index, and this migration would drop it again. The committed baseline still passes `--check`. The generator should skip indexes that a later migration drops; that change is not made here.

## 5. Introspection and comparison rules (corrected)

Before this phase, the introspection removed every index whose columns equal the primary key, which hid this index from both the snapshot and the model oracle. It also compared defaults, declared types, ON DELETE actions and extra objects not at all. The corrected rules:
- Only the primary-key index is excluded. Every other index is reported.
- Each index keeps its name, uniqueness, partial condition, and ordered key columns with sort order and collation.
- Each column keeps its raw declared type and default expression (SQLite `PRAGMA table_info`).
- Foreign keys compare the ON DELETE action as well.
- `diffTable()` reports objects in both directions (MISSING and EXTRA). Index names are compared only for the canonical snapshot (`names: true`), because the migrations own the names; the model oracle compares definitions. This is the one deliberate difference in the rule, and it is recorded here.

Measured with these rules, the model oracle and the migrated database differ in 40 places (section 6). The earlier statement "zero differences across 75 tables" is therefore withdrawn. It was true only for the narrower rules that existed before.

## 6. Open model-to-migration differences (D-2, D-3, D-4)

These are recorded in `tests/schema_baseline.test.js` (`KNOWN_MODEL_GAPS`). They are discrepancies, not accepted equivalence. The migrations are the schema of record for the canonical database; the models are the application's view of it.

**D-2: declared type text (11).** The model says `TEXT`; the migrations say `VARCHAR(n)`. Tables and columns: `GOODS_RECEIPT_NOTE.status`, `PROJECT_BUDGET.status`, `PROJECT_BUDGET_HEAD.status`, `PROJECT_CBS.category`, `PROJECT_CBS.status`, `PROJECT_COMMITMENT_LEDGER.event_type`, `PROJECT_COST_LEDGER.cost_category`, `PROJECT_COST_LEDGER.event_type`, `PROJECT_WBS.status`, `PURCHASE_ORDER.status`, `STOCK_LEDGER.movement_type`. SQLite stores all of them with TEXT affinity and does not enforce the length, so there is no storage difference on SQLite. A different database engine would differ.

**D-3: defaults (13).**
- `MEETING.attendees` and `MEETING.vendor_ids`: the model's `[]` default is application-level by design; `generate-baseline.js` writes no object or array defaults to the schema. Accepted as a documented class, pending the owner's confirmation.
- Eleven `CURRENT_TIMESTAMP` defaults that the migrations create and the models do not declare: `QUOTATION.last_updated`, `QUOTATION_HISTORY.last_updated`, `STOCK_TRANSFER.createdAt` and `updatedAt`, `STOCK_TRANSFER_DISCREPANCY.createdAt` and `updatedAt`, `STOCK_TRANSFER_EVENT.createdAt`, `STOCK_TRANSFER_LINE.createdAt` and `updatedAt`, `STORE_LOCATION.createdAt` and `updatedAt`.

**D-4: ON DELETE actions (8 pairs).**
- Equivalent in SQLite: six pairs where the models say `NO ACTION` and the migrations say `RESTRICT` (`STOCK_TRANSFER` source and destination locations, `STOCK_TRANSFER_DISCREPANCY` both keys, `STOCK_TRANSFER_EVENT.transfer_id`, `STOCK_TRANSFER_LINE.transfer_id`). Both reject the parent delete.
- **Materially different:** `STOCK_LEDGER.transfer_id` and `STOCK_LEDGER.location_id`. The models say `SET NULL`; the migrations say `RESTRICT`. Deleting a transfer or location that has ledger rows would null the link under the model, and is refused by the database. The database is the stricter behaviour.

**Recommendation.** Treat the migrations as the schema of record, because the database enforces them. Align the models to the database for D-2 and D-3. For D-4, align the `STOCK_LEDGER` associations to `RESTRICT`, unless the owner wants SET NULL behaviour; that is a business decision and needs an explicit migration if it is chosen.

## 7. Fresh-install verification

Disposable file: `E:\Port\Construction\_sqlite_work\migrations\fresh-install-d1-1.disposable.sqlite` (`isolated_test`; process-scoped environment; the repository `.env` was not edited).

| Step | Result |
| --- | --- |
| `migrate.js status` before any migration | 17 pending |
| `migrate.js up` | `Applied 17 migration(s).` exit 0 |
| Explicit index on `PROJECT_TASK_ASSIGNEE` | Absent |
| Duplicate primary-key insert | Rejected; rolled back |
| `PRAGMA integrity_check` | `ok` |
| `PRAGMA foreign_key_check` | no rows |
| Reconciliation (`scratchpad\final4\reconcile.js`, read-only) | 75 canonical tables; 17 migrations recorded in canonical order; the only item is `sequelize_meta`, which is expected |
| Adoption report (`scripts/schema/adopt-report.js`, read-only, names compared) | `MATCHES_CANONICAL: no differences found` |

Reports:
- `E:\Port\Construction\_sqlite_work\reports\fresh-install-d1-1-reconcile.json`
- `E:\Port\Construction\_sqlite_work\reports\fresh-install-d1-1-adopt.md` and `.json`

The earlier fresh-install file `migrations\fresh-install-20261102-1550.disposable.sqlite` (16 migrations, before D-1) is kept as evidence of the previous state. Its reports are listed in the manifest.

Schema-tooling evidence: the fresh file matches the canonical snapshot exactly, including defaults, declared types and index names. The model oracle still differs in the 40 places in section 6.

## 8. Canonical development database

- Path: `E:\Port\Construction\_sqlite_work\dev\construction_erp_dev.sqlite`
- Status: **not created.** The file is absent. The `dev\` folder exists; it also contains the owner-approved demonstration file described below, which is not the canonical database.
- Reason: D-2, D-3 and D-4 are open. The gate requires model-to-migration comparison with no open discrepancies.
- When created it must be by migrations only, with `DB_TARGET_CLASS=local_demo`, no seed, no force sync, no alter mode, and no copy of any existing database.

**Owner-approved demonstration database.** The manifest records, on 2026-11-02, the owner's approval for `dev\construction_erp_demo.sqlite` for demonstration use only. It is a copy of the earlier demo SQLite file, created through application APIs, not migrations. It is not the canonical database and is outside the schema tooling's checks. It was not created, modified or verified by this phase.

## 9. Dependencies and untracked scripts

- `mysql2` is listed in `package.json` and `package-lock.json` and is referenced by `retired/test-mysql-ci.js`. No file under `src/` requires it. The active database layer is SQLite-only. Retained pending a separate dependency-cleanup decision; the lockfile was not changed.
- Three untracked live-MySQL scripts remain in `scripts/`: `inspect-live-inventory.js`, `execute-inventory-adjustments.js`, `prepare-inventory-changeset.js`. They were not executed, moved, deleted or edited. They import the SQLite-only `src/config/db.js`. `execute-inventory-adjustments.js` performs writes and must not be run.

## 10. Outstanding limitations and risks

1. D-2, D-3 and D-4 (section 6) are open. The canonical database is not created.
2. Column defaults and declared types are verified against the canonical snapshot (exact match) and against the models (the 13 and 11 differences above).
3. The baseline generator re-derives the redundant index from the model; see section 4.
4. Repository `.env` points at a production host. The guard refuses it. Its owner must correct it. The file was not edited.
5. SQLite concurrent-transaction behaviour is not proven. The regression suite tests functional correctness, not production concurrency. A dedicated concurrency batch is needed before high-volume inventory and finance operations.
6. 22 test files use in-memory `sync({ force: true })` as unit fixtures. Allowed by policy; not migration-based.
7. Reservations, picking and damaged-stock status are not modelled (`docs\CONSTRUCTION_ERP_DATABASE_DESIGN.md`, section 6).
8. Frontend behaviour is not tested. No frontend files were changed in this phase.
9. 3D / BIM work is not authorized in Batch 0. No 3D dependency was installed.

## 11. Git state (no commits)

- Backend (`zyno_construction_backend`): branch `main`, HEAD `f82dab7` (unchanged). `git status` lists 32 tracked files modified or deleted and 66 untracked entries; directories such as `scripts/`, `migrations/` and `tests/` appear as single entries. Full list: `scratchpad\final5\be-status-final5.txt`.
- Frontend (`zyno_construction_frontend\zyno_construction_frontend`): branch `main`, HEAD `548d363` (unchanged). 89 tracked files modified or deleted and 61 untracked entries. No frontend file was changed in this phase. Full list: `scratchpad\final5\fe-status-final5.txt`.
- Nothing has been committed, reset, stashed or reverted.

## 12. Feature work after Batch 0 (2026-11-03 and 2026-11-04)

Batch 0 gates: D-2 closed by migration 20261102000002 (CHECK constraints on eleven enum-backed columns, via table rebuild, see `src/core/utils/sqlite-rebuild.js`); D-5 closed by migration 20261102000003 (`MEASUREMENT_BOOKS.vendor_id` foreign key, ON DELETE SET NULL); D-3 accepted in writing (eleven CURRENT_TIMESTAMP defaults; two JSON application defaults by design). Regression #7 on that code: 32 suites, 358 tests, exit 0. Canonical database created through the migration runner on 2026-11-02 with 19 migrations and verified (integrity ok, 0 foreign-key violations, MATCHES_CANONICAL).

Feature 2, DPR images: migration `20261103000001-create-dpr-images.js` (table `DPR_IMAGES`, matching model `dpr_image.model.js`). Endpoints `POST /api/v1/dpr/:id/images`, `GET /api/v1/dpr/:id/images`, `GET /api/v1/dpr/images/:imageId/file` (streams a local file to a user of the owning company). Limits: 10 images per report, 10 MB each, JPG/PNG/WEBP, real bytes checked. Frontend: DPR creation dialog with picker and client-side checks; photos on the report detail view. Tests: `tests/dpr_images.test.js`, 9 of 9.

Feature 1, item-wise budget allocation by budget heads: `POST /api/v1/projects/budget/item-allocations` (`budget_items.controller.js`). Creates heads (reused by code), a draft budget revision, and one allocation per item in one transaction; items must equal the budget total in paise. Frontend: item list in the project wizard allocation dialog; saved after the project is created. Tests: `tests/budget_item_allocation.test.js`, 7 of 7.

Feature 3, MS Project MSPDI XML: `src/core/utils/xml-lite.js` (strict XML reader; DOCTYPE refused; depth and element limits), `services/mspdi.service.js` (mapping), `controllers/msp.controller.js`, `routes/msp.routes.js`. Summary tasks become WBS nodes; detail tasks become project tasks. Import reuses WBS codes that exist. Imported tasks sit under one milestone, `MS Project: <project name>`, created on the first import and reused for the same schedule, so they show in the Tasks tab; milestone and project progress are synced. A re-import replaces the earlier import: tasks are matched by `PROJECT_TASK.msp_uid` (migration `20261104000001-add-project-task-msp-uid.js`) and updated, new ones are created, and earlier tasks the file no longer contains are removed. An earlier task with comments, attachments, activity, assignees, sub-tasks or dependencies is kept and counted as `tasks_kept`. Tasks created by hand are never matched or removed. A file with only summary rows creates no milestone. Not carried over: start dates, durations, predecessors, resources, calendars (no columns in the database). Project tasks have no WBS link, so they export at the top level. Frontend: Export and Import buttons on the Tasks tab. Tests: `tests/msp_mspdi.test.js`, 12 of 12; `tests/msp_task_key_migration.test.js`, 1 of 1; fixture `tests/fixtures/msp-sample.xml`. Canonical snapshot (`scripts/schema/canonical-schema.json`) regenerated: 76 tables, 21 migrations. The canonical development file is not yet migrated: it still has 20 applied, because `migrate.js` refuses it while the repository `.env` holds a `DB_HOST` that the target guard flags as a production host. A verified backup of that file is in `backups\construction_erp_dev.pre-msp-uid-20261104.sqlite`.

Regression #8 (before the frontend-only fix): 35 suites, 384 tests, exit 0, 591 s. Frontend production build: 0 errors and 0 warnings after the last fix (one null check). Canonical database: DPR migration applied through `migrate.js up` (20 applied); verified integrity ok, 0 foreign-key violations, adoption verdict MATCHES_CANONICAL with 20 migrations.

Known limits and risks: an MS Project schedule is identified by its milestone name, so renaming that milestone makes the next import a new schedule; imports made before migration 20261104000001 have no task key, so their tasks stay and the first re-import adds keyed copies (delete the old ones by hand once); the table-rebuild helper deletes ON DELETE CASCADE child rows when it drops the rebuilt table (warning in `src/core/utils/sqlite-rebuild.js`), and the two earlier rebuild migrations were applied to the canonical file while it held no data; DPR images and the storage service write under the backend `uploads\` folder, outside `_sqlite_work` (permitted for files, not for databases); frontend behaviour is not automated-tested beyond the build; the DPR creation form and budget item UI were checked by build only, not in a browser.

Git state at the end of this phase: backend branch `main`, HEAD `f82dab7`, 33 tracked files modified or deleted, 67 untracked entries (`scratchpad\final9\be-status-final9.txt`). Frontend branch `main`, HEAD `548d363`, 91 modified or deleted, 61 untracked (`scratchpad\final9\fe-status-final9.txt`). Nothing has been committed.

Phase A controls (benchmark items 2, 4 and 5; see `docs/CONSTRUCTION_ERP_FARVISION_BENCHMARK.md`). Migration `20261109000001-phase-a-controls.js` adds `PROJECT.handover_date`, `PROJECT.dlp_months` (default 12), `RBAC_COMPANY_MASTER.budget_gate_mode` (default `warn`) and the tables `RETENTION_RELEASES` and `BANK_GUARANTEES`. Services: `src/modules/vendors/services/three_way_match.service.js` (the rules, now shared by payment approval and the new report), `src/core/services/budget_gate.service.js`, `src/modules/projects/services/project_controls.service.js`. Endpoints: `GET /api/v1/vendors/:vendorId/invoices/:invoiceId/three-way-match` (report, read only); `GET|POST /api/v1/project-controls/:projectId/retention`, `POST .../retention/releases`, `PUT .../handover`, `GET|POST .../guarantees`, `PUT /api/v1/project-controls/guarantees/:id/status`.

Behaviour changes. A payment approval that overrides the match now needs `exception_reason` of at least 10 characters, and writes a `MATCH_EXCEPTION_APPROVED` project history row. An RA bill approval whose cost would exceed its budget head's headroom is refused with `409 BUDGET_GATE_BLOCKED` in `block` mode, and in `warn` mode (the default) returns the bill with `budget_gate` set to the excess. Retention can be released only after the DLP has ended, and never above the subcontractor's outstanding retention. A guarantee can be released or invoked once.

Limits. The gate uses the latest approved budget and the net recognized cost on the head. Purchase orders carry no budget head, so open PO commitments are not deducted and the gate does not apply to POs. A bill posts its whole cost to its first measurement item's head (existing behaviour). A budget that is still draft or submitted does not gate anything. Calendar months for the DLP follow JavaScript `setMonth`. The three-way match still has no total-value check and no GRN QC gate.

Tests: `tests/phase_a_controls.test.js`, 28 tests (three-way rules as pure functions, DLP and retention over HTTP, guarantee register, budget gate in both modes through the real approval). With `tests/cumulative_matching.test.js`: 34 of 34 after the fix. Not browser-verified. The canonical development database has not been migrated (see the MS Project entry).

Phase B and agent slice (benchmark items 6 and 9, partly; see `docs/CONSTRUCTION_ERP_FARVISION_BENCHMARK.md`). No new tables or migrations. In `src/modules/projects/services/project_controls.service.js`: `approvalAgeing` lists payment requests in `pending_approval` and RA bills in `submitted` or `certified`, with age in hours and an `escalate` flag at 48 hours by default; `earnedValue` gives BAC, PV, EV, AC, CV, SV, CPI, SPI and EAC at a status date, with the method stated in the response. Endpoints: `GET /api/v1/project-controls/:projectId/approvals/ageing`, `GET /api/v1/project-controls/:projectId/evm`.

Briefing agent (first AI-enabled slice): `src/modules/projects/services/control_agent.service.js`. It reads the control figures, turns them into findings with a severity, the figures used and a proposed next step, and sorts them high first. The summary carries the three most urgent. It can add a short narrative from the local model (`OLLAMA_HOST`, `OLLAMA_MODEL`, eight-second timeout). If the model fails, `narrative_source` is `unavailable` and the findings remain. It changes no record and approves nothing. Endpoint: `GET /api/v1/project-controls/:projectId/briefing?narrative=1`.

Limits. Earned value weights milestones equally, because the schema holds no value per milestone, so it is an approximation; it is per project, not per WBS node. Ageing covers payment requests and RA bills only, has no value brackets, and sends no notifications. The briefing narrative depends on a local model that may be down; the findings do not.

Tests: `tests/phase_b_controls.test.js`, 8 tests (earned value worked by hand, ageing and escalation, tenant isolation); `tests/control_agent.test.js`, 7 tests (findings and their order, the narrative fallback, the HTTP briefing). Not browser-verified, and no screens have been built for these endpoints.

Demo, India coverage and agents (2026-11-09). Demo database: `_sqlite_work\tests\demo-india.disposable.sqlite`, all 22 migrations applied, then `scripts/demo/seed-india-demo.js` (254 steps, 0 failures). The seed refuses any target other than a disposable file under `_sqlite_work\tests`, and it does not touch the canonical or the owner-approved demo file. Data: one company, three logins (role grants to every menu module), two projects in Pune and Nagpur, WBS, BOQ, an approved budget with heads and allocations, milestones with dates and progress, tasks, vendors with GSTIN and PAN (one unregistered), two RA bills (one awaiting approval for 60 hours), two invoices, two payment requests, a purchase order and a goods receipt, a quotation, two bank guarantees, cost ledger entries, labour attendance, a DPR with a work item, snags, drawings, a variation order, a meeting, a document, material and equipment stock, and a stock receipt. Modules without seed data: purchase requisitions, subcontract work orders, equipment logs, quality inspections, RFIs, handover, client billing, dashboards by role, the vendor portal (none of these has a model or screen yet).

Agents (`src/modules/projects/services/control_agents.service.js`). They act on the workflow: each creates a follow-up task in the project's "Agent follow-ups" milestone, with a priority and a due date, and writes a history entry. They approve nothing, release no money, change no guarantee, and send no message outside the ERP. A draft reminder is written into the task description and marked as not sent. Each action has a key, so a repeat run creates nothing new. Agents: approval chaser, retention watcher, guarantee watcher, cost watcher (CPI and SPI below 0.9), India compliance, and a briefing. The scheduler runs every project when `AGENTS_AUTORUN_MINUTES` is positive (off by default). `POST /api/v1/agents/run-all` runs only the caller's company. Endpoints: `GET /api/v1/agents/status`, `POST /api/v1/agents/:projectId/run`, `GET /api/v1/agents/:projectId/log`, `GET /api/v1/agents/:projectId/india-compliance`.

India (`src/modules/projects/services/india_compliance.service.js`). Flags for review only: GSTIN and PAN format; missing GSTIN (reverse charge may apply); missing PAN; TDS under section 194C (1% for an individual or HUF, 2% otherwise; a 1% or 2% rate is accepted, since the legal form is not stored); GST at 18% shown per RA bill, not stored; cash of ₹2,00,000 or more under section 269ST; contract labour at 50 or more workers (OSH Code, 2020). Amounts use Indian grouping (₹8,50,000); the financial year runs April to March. Not built: e-invoicing, GST and TDS returns, PF, ESI, labour registers, GCC rules.

Model. The narrative uses the Ollama cloud when `OLLAMA_API_KEY` is set (`OLLAMA_CLOUD_HOST`, default https://ollama.com; `OLLAMA_CLOUD_MODEL`, default gemma4:31b). Without a key it uses the local server (`OLLAMA_HOST`, `OLLAMA_MODEL`, default gemma4:31b-cloud). At the time of the demo neither was reachable from this machine: no key was set, and the cloud API answers 401 without one. Agents work without the model; the narrative then reads `unavailable`.

Backend for the demo ran on port 3000 with `DB_HOST` set empty in the process environment only. The repository `.env` was not changed. Tests: `tests/india_agents.test.js`, 12 tests; `tests/control_agent.test.js`, 7 tests.

Model connection verified (2026-11-09). With `OLLAMA_API_KEY` set in the backend process environment, the Ollama cloud answers: `GET /api/v1/agents/status` reports `ollama-cloud`, model `gemma4:31b`, reachable. The briefing narrative and the agent runs then return `narrative_source: model`. The narrative is written from the checked findings only, with Indian rupee grouping. The key is not stored in the repository, the `.env` file, the code or any log. Because it was pasted into a chat transcript, it should be rotated after the demo, and the new key set in the same way.
