# ZYNO Construction ERP — SQLite-Only Operations

Status: policy in force from 2026-11-01. Database manifest: `E:\Port\Construction\_sqlite_work\DATABASE_MANIFEST.md`.

## 1. Policy

- SQLite is the only permitted database for development, migrations, tests, demonstrations and acceptance testing.
- MariaDB, MySQL, PostgreSQL, Neon, remote servers, Docker databases and cloud databases are not permitted.
- Every persistent SQLite file resides under `E:\Port\Construction\_sqlite_work\`. The code constant is `APPROVED_ROOT` in `src/config/sqlite_policy.js`.

## 2. Enforcement in code

| Control | Location |
| --- | --- |
| Single approved root and containment checks (case-insensitive, drive E:, no URL, no network share, no relative path, no `..` escape, no link escape) | `src/config/sqlite_policy.js` |
| Declaration checks (`DB_TARGET_CLASS`, `DB_DIALECT`), production host refusal, production runtime refusal | `src/config/database_target_guard.js` |
| Application entry point that refuses before any connection | `src/config/db.js` (calls `assertDatabaseTarget` and `resolveApprovedSqlitePath` at require time) |
| Startup diagnostics (dialect, file name, inside-root flag, environment mode, pending migrations) — read only | `connectDB()` in `src/config/db.js` |
| Migration preflight | `scripts/migrate.js` → `evaluateMigrationTarget` |
| Migration status (read-only: path checked before any access, never creates `sequelize_meta`) | `MigrationRunner.getStatus()` in `src/core/utils/migrator.js`; tests in `tests/migration_status.test.js` |
| Development synchronization (opt-in, disposable, inside root) | `scripts/schema/dev-sync-guard.js` |
| Adoption report (read only, inside root) | `scripts/schema/adopt-report.js` |
| Retired MySQL and MariaDB tooling | `scripts/test-mysql-ci.js` (refuses), `retired/` (originals) |

## 3. Declaring a database

Declare the target in the shell or a secret store. Do not put production settings in the repository `.env`.

```
set DB_TARGET_CLASS=local_demo
set DB_DIALECT=sqlite
set DB_STORAGE=E:\Port\Construction\_sqlite_work\dev\construction_erp_dev.sqlite
```

`isolated_test` is used by the test suites and requires `*.disposable.sqlite` or `:memory:`.

## 4. Fresh database

The canonical development file is created by migrations only. Do not seed it through the application.

Disposable fresh-install check (use `isolated_test`, not `local_demo`). This is the form that was run on 2026-11-02, in Git Bash:

```bash
export DB_TARGET_CLASS=isolated_test
export DB_DIALECT=sqlite
export DB_STORAGE="E:/Port/Construction/_sqlite_work/migrations/fresh-install-<yyyymmdd-hhmm>.disposable.sqlite"
export DB_HOST= DB_NAME= DB_USER= DB_PASSWORD= DB_PORT=
node scripts/migrate.js status
node scripts/migrate.js up
```

- The empty `DB_HOST` and related values stop `dotenv` from loading the production host from the repository `.env`. `dotenv` does not overwrite a variable that already exists, even an empty one. SQLite does not use those values, and the guard still scans every value.
- Use a POSIX shell for this. In `cmd.exe`, `set NAME=` removes the variable, so `dotenv` would load the repository value and the guard would refuse the run.
- Use a new file name for every fresh check. Do not reuse a file that holds data you need.
- Do not run `migrate.js` with `local_demo` against a fresh check file.

`migrate.js status` creates an empty file on the first connection if the file does not exist. It then writes no table. `migrate.js up` applies the migrations in name order.

## 5. Recovery from a failed migration

1. Stop the process. Do not restart the application against the file.
2. Copy the file to `_sqlite_work\backups\` with a dated name and confirm the copy by reading its size and running `node scripts/migrate.js status` against the copy.
3. Run `node scripts/migrate.js status` against the original to see which migrations are recorded.
4. If the last migration is reversible, run `node scripts/migrate.js down` against a copy first, check the schema, then decide whether to apply to the original.
5. If it is not reversible, restore from the backup and rerun `up` on a fresh file.

Rollback is refused where the migration cannot be reversed safely (for example the project master rollback on SQLite when `PROJECT` rows exist).

## 6. Test runs

- Suites use `tests/setup/database-env.js` (in-memory SQLite for unit fixtures; disposable files under the approved root for schema checks).
- Full regression: `npx jest --runInBand --forceExit --testTimeout=900000`. Output is buffered until each file finishes, so a stalled file can hide progress; per-file runs are used to locate stalls.
- Last full regression (2026-11-02, final code, run 5): 31 of 31 suites, 354 of 354 tests, exit 0, 215.3 s. Log: `scratchpad\final5\full5.log`. Details: `docs\CONSTRUCTION_ERP_IMPLEMENTATION_LOG.md`, section 2.

## 7. Known limitations

- SQLite serialises writes. Concurrency tests run sequentially; true concurrent write behaviour is not proven.
- Foreign keys are enforced when the connection enables them; the schema suite checks this.
- SQLite cannot drop a named foreign key in place; the constraint migration's rollback rebuilds tables and restores indexes (tested).
- `demo3.sqlite` on the system drive is outside the approved root and is refused. It is not migrated or stamped.
- The canonical development file `dev\construction_erp_dev.sqlite` has not been created. Its gate is open on D-2, D-3 and D-4, the model-to-migration differences (implementation log, section 6). D-1 is resolved by migration 16.
- Column defaults and declared types match the canonical snapshot exactly. Against the models, 13 default differences (D-3) and 11 declared-type differences (D-2) remain open.
- The repository `.env` points at a production host. The guard refuses it. Its owner must correct it. It was not edited.
- `mysql2` remains in `package.json` and the lockfile, unused by the active application. Removal awaits a separate decision.
- Three untracked live-MySQL scripts in `scripts/` were not executed, moved or edited. Do not run them.
