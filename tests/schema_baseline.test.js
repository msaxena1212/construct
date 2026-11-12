'use strict';
/**
 * Core schema baseline and migration-chain verification on an isolated, disposable SQLite file.
 * Covers: fresh installation, comparison with the Sequelize models (oracle), rollback, foreign-key
 * enforcement, unique constraints, transaction rollback, duplicate idempotency keys, adoption refusal
 * and read-only adoption reporting. MariaDB verification is a separate, blocked step (see the audit).
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { sqliteWorkDir } = require('../scripts/schema/sqlite-work-dir');
const { spawnSync } = require('child_process');
const { Sequelize } = require('sequelize');
const MigrationRunner = require('../src/core/utils/migrator');
const { introspectTable, listTables } = require('../scripts/schema/introspect');
const { diffTable, run: adoptionRun } = require('../scripts/schema/adopt-report');
const { listIndexes } = require('../scripts/schema/introspect');
const CORRECTIVE = '20261031000001-reconcile-migration-owned-constraints.js';
const PROJECT_MASTER = '20261101000001-project-master-data.js';
const REDUNDANT_INDEX = '20261102000001-drop-redundant-project-task-assignee-index.js';
const ENUM_DOMAIN = '20261102000002-enforce-enum-domains.js';
const VENDOR_FK = '20261102000003-add-measurement-book-vendor-foreign-key.js';
const DPR_IMAGES = '20261103000001-create-dpr-images.js';
const MSP_TASK_KEY = '20261104000001-add-project-task-msp-uid.js';
const PHASE_A = '20261109000001-phase-a-controls.js';

/**
 * Model-to-migration differences (docs/CONSTRUCTION_ERP_IMPLEMENTATION_LOG.md, section 6). Two lists:
 *
 * OPEN_MODEL_GAPS: discrepancies that must be closed. The test fails if this list is not empty when the oracle runs
 *   against the current migrations. Closed by migrations 20261102000002 (D-2 CHECK constraints) and 20261102000003
 *   (D-5 foreign key), which change the database to match the decided design.
 *
 * ACCEPTED_MODEL_DIFFERENCES: differences the owner accepted in writing on 2026-11-02, or that are application-level
 *   by design. Recorded so they stay visible; the test fails if one of them disappears or a new one appears.
 *   - D-3, eleven CURRENT_TIMESTAMP defaults that the migrations create and the models do not declare. Accepted: the
 *     database default is a safety net; Sequelize sets these timestamps itself.
 *   - D-3, two JSON-array defaults on MEETING. Application-level by design: generate-baseline.js writes no object or
 *     array defaults to the schema.
 *   - D-4 is closed: the eight stock associations now declare RESTRICT in src/models/index.js.
 */
const OPEN_MODEL_GAPS = [];

const ACCEPTED_MODEL_DIFFERENCES = [
  'MEETING: DEFAULT_MISMATCH attendees: expected \'[]\', found null',
  'MEETING: DEFAULT_MISMATCH vendor_ids: expected \'[]\', found null',
  'QUOTATION: DEFAULT_MISMATCH last_updated: expected null, found CURRENT_TIMESTAMP',
  'QUOTATION_HISTORY: DEFAULT_MISMATCH last_updated: expected null, found CURRENT_TIMESTAMP',
  'STOCK_TRANSFER: DEFAULT_MISMATCH createdAt: expected null, found CURRENT_TIMESTAMP',
  'STOCK_TRANSFER: DEFAULT_MISMATCH updatedAt: expected null, found CURRENT_TIMESTAMP',
  'STOCK_TRANSFER_DISCREPANCY: DEFAULT_MISMATCH createdAt: expected null, found CURRENT_TIMESTAMP',
  'STOCK_TRANSFER_DISCREPANCY: DEFAULT_MISMATCH updatedAt: expected null, found CURRENT_TIMESTAMP',
  'STOCK_TRANSFER_EVENT: DEFAULT_MISMATCH createdAt: expected null, found CURRENT_TIMESTAMP',
  'STOCK_TRANSFER_LINE: DEFAULT_MISMATCH createdAt: expected null, found CURRENT_TIMESTAMP',
  'STOCK_TRANSFER_LINE: DEFAULT_MISMATCH updatedAt: expected null, found CURRENT_TIMESTAMP',
  'STORE_LOCATION: DEFAULT_MISMATCH createdAt: expected null, found CURRENT_TIMESTAMP',
  'STORE_LOCATION: DEFAULT_MISMATCH updatedAt: expected null, found CURRENT_TIMESTAMP',
];

const ROOT = path.resolve(__dirname, '..');
const MIGRATIONS = path.join(ROOT, 'migrations');
const CANONICAL = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/schema/canonical-schema.json'), 'utf8'));
const BASELINE = '20261001000000-canonical-core-schema-baseline.js';

function tempDb(label) {
  return path.join(sqliteWorkDir(), `zyno-schema-${label}-${crypto.randomBytes(4).toString('hex')}.disposable.sqlite`);
}

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

/** Full text of a Sequelize error, including the driver message that names the violated constraint. */
function errText(e) {
  const items = (e && e.errors) || [];
  return [e && e.message, e && e.original && e.original.message, e && e.parent && e.parent.message, ...items.map((i) => i.message), e && e.name]
    .filter(Boolean)
    .join(" | ");
}

/** Asserts that the promise rejects and that the error text matches the pattern. */
async function expectRejects(promise, pattern) {
  let caught;
  try {
    await promise;
  } catch (e) {
    caught = e;
  }
  expect(caught).toBeDefined();
  expect(errText(caught)).toMatch(pattern);
}

function openDb(file) {
  return new Sequelize({ dialect: 'sqlite', storage: file, logging: false });
}

describe('Canonical core schema baseline (SQLite, disposable)', () => {
  jest.setTimeout(600000);

  let file;
  let seq;
  let runner;

  beforeAll(async () => {
    file = tempDb('fresh');
    seq = openDb(file);
    runner = new MigrationRunner(seq, MIGRATIONS);
  });

  afterAll(async () => {
    await seq.close();
    if (fs.existsSync(file)) fs.unlinkSync(file);
  });

  test('the committed baseline is current with the generator', () => {
    const result = spawnSync(process.execPath, [path.join(ROOT, 'scripts/schema/generate-baseline.js'), '--check'], {
      cwd: ROOT,
      encoding: 'utf8',
      env: { ...process.env, DB_STORAGE: ':memory:', DB_DIALECT: 'sqlite' },
    });
    expect(result.status).toBe(0);
  });

  test('fresh installation applies every migration in order, baseline first', async () => {
    const results = await runner.up();
    expect(results).toHaveLength(CANONICAL.migrations.length);
    expect(results[0].name).toBe(BASELINE);
    const status = await runner.getStatus();
    expect(status.every((m) => m.applied)).toBe(true);
  });

  test('the migrated schema matches the canonical snapshot exactly', async () => {
    const qi = seq.getQueryInterface();
    const tables = await listTables(qi);
    expect(tables).toEqual(Object.keys(CANONICAL.tables).sort());
    const problems = [];
    for (const t of tables) {
      const issues = diffTable(CANONICAL.tables[t], await introspectTable(qi, t), { names: true });
      for (const i of issues) problems.push(`${t}: ${i.kind} ${i.detail}`);
    }
    expect(problems).toEqual([]);
  });

  test('the migrated schema matches the Sequelize model definitions (in-memory oracle)', async () => {
    // Test-only oracle: the models are synchronized into a separate in-memory database and compared.
    // Production and fresh installs never use synchronization; this only proves the models and migrations agree.
    const models = require('../src/models');
    const oracle = models.sequelize;
    expect(oracle.getDialect()).toBe('sqlite');
    expect(oracle.options.storage).toBe(':memory:');
    await oracle.sync();
    try {
      const oqi = oracle.getQueryInterface();
      const problems = [];
      const oracleTables = await listTables(oqi);
      const migratedTables = await listTables(seq.getQueryInterface());
      expect(migratedTables).toEqual(oracleTables);
      for (const t of oracleTables) {
        const expected = await introspectTable(oqi, t);
        const actual = await introspectTable(seq.getQueryInterface(), t);
        for (const i of diffTable(expected, actual)) problems.push(`${t}: ${i.kind} ${i.detail}`);
      }
      // Every difference must be listed, either as open (must be closed) or as accepted in writing. Any new difference
      // fails the test, and so does a listed difference that has disappeared, so the lists cannot go stale.
      expect([...problems].sort()).toEqual([...OPEN_MODEL_GAPS, ...ACCEPTED_MODEL_DIFFERENCES].sort());
    } finally {
      // leave the in-memory oracle untouched for other suites in this worker
    }
  });

  test('foreign keys are enforced on the migrated database', async () => {
    await seq.query('PRAGMA foreign_keys = ON');
    const [row] = await seq.query('PRAGMA foreign_keys', { type: seq.QueryTypes.SELECT });
    expect(row.foreign_keys).toBe(1);
    // Only the foreign key is violated: every NOT NULL column is supplied and the parent row does not exist.
    await expectRejects(
      seq.query(
        "INSERT INTO STOCK_TRANSFER_EVENT (company_id, transfer_id, event_type, createdAt) VALUES (999999, 999999, 'orphan', :s)",
        { replacements: { s: new Date().toISOString() } }
      ),
      /FOREIGN KEY/i
    );
  });

  test('unique constraints are enforced on the migrated database', async () => {
    const stamp = new Date().toISOString();
    await seq.query(
      "INSERT INTO STORE_LOCATION (company_id, project_id, code, name, location_type, status, createdAt, updatedAt) VALUES (1, 1, 'DUP-1', 'A', 'store', 'active', :s, :s)",
      { replacements: { s: stamp } }
    ).catch((e) => { throw new Error(`setup insert failed: ${e.message}`); });
    await expectRejects(
      seq.query(
        "INSERT INTO STORE_LOCATION (company_id, project_id, code, name, location_type, status, createdAt, updatedAt) VALUES (1, 1, 'DUP-1', 'B', 'store', 'active', :s, :s)",
        { replacements: { s: stamp } }
      )
    , /UNIQUE/i);
  });

  test('duplicate idempotency keys are rejected by the database', async () => {
    await seq.query('PRAGMA foreign_keys = OFF');
    try {
      const stamp = new Date().toISOString();
      const base = "INSERT INTO STOCK_TRANSFER_EVENT (company_id, transfer_id, event_type, idempotency_key, createdAt) VALUES (1, 1, 'submit', 'key-1', :s)";
      await seq.query(base, { replacements: { s: stamp } });
      await expectRejects(seq.query(base, { replacements: { s: stamp } }), /UNIQUE/i);
    } finally {
      await seq.query('PRAGMA foreign_keys = ON');
    }
  });

  test('a failed transaction leaves no partial rows behind', async () => {
    const stamp = new Date().toISOString();
    const t = await seq.transaction();
    try {
      await seq.query(
        "INSERT INTO STORE_LOCATION (company_id, project_id, code, name, location_type, status, createdAt, updatedAt) VALUES (2, 2, 'TX-1', 'first', 'store', 'active', :s, :s)",
        { replacements: { s: stamp }, transaction: t }
      );
      await seq.query(
        "INSERT INTO STORE_LOCATION (company_id, project_id, code, name, location_type, status, createdAt, updatedAt) VALUES (2, 2, 'TX-1', 'dup', 'store', 'active', :s, :s)",
        { replacements: { s: stamp }, transaction: t }
      );
      await t.commit();
      throw new Error('second insert should have failed');
    } catch (err) {
      await t.rollback();
      expect(errText(err)).toMatch(/UNIQUE/i);
    }
    const [rows] = await seq.query("SELECT COUNT(*) AS n FROM STORE_LOCATION WHERE company_id = 2 AND code = 'TX-1'", {
      type: seq.QueryTypes.SELECT,
    }).then((r) => [r[0] || r]);
    expect(Number(rows.n)).toBe(0);
  });

  test('rollback removes every table the baseline created, in reverse dependency order', async () => {
    const rollbackFile = tempDb('rollback');
    const rb = openDb(rollbackFile);
    try {
      const rbRunner = new MigrationRunner(rb, MIGRATIONS);
      await rbRunner.up();
      const undone = await rbRunner.down(CANONICAL.migrations.length);
      expect(undone).toHaveLength(CANONICAL.migrations.length);
      expect(await listTables(rb.getQueryInterface())).toEqual([]);
    } finally {
      await rb.close();
      if (fs.existsSync(rollbackFile)) fs.unlinkSync(rollbackFile);
    }
  });
});

describe('Existing-database adoption safety (SQLite, disposable)', () => {
  jest.setTimeout(300000);

  test('the migrator refuses to run the baseline over existing tables and creates nothing', async () => {
    const file = tempDb('existing');
    const existing = openDb(file);
    try {
      await existing.getQueryInterface().createTable('RBAC_USER', { id: { type: Sequelize.INTEGER, primaryKey: true } });
      const before = sha256(file);
      const runnerExisting = new MigrationRunner(existing, MIGRATIONS);
      await expect(runnerExisting.up()).rejects.toThrow(/ADOPTION_REQUIRED|ADOPTION_REQUIRED/);
      await existing.close();
      expect(sha256(file)).toBe(before);
    } finally {
      if (fs.existsSync(file)) fs.unlinkSync(file);
    }
  });

  test('the adoption report is read-only and reports the existing state without stamping', async () => {
    const file = tempDb('adopt');
    const existing = openDb(file);
    await existing.getQueryInterface().createTable('RBAC_USER', { id: { type: Sequelize.INTEGER, primaryKey: true } });
    await existing.close();
    const before = sha256(file);
    const report = await adoptionRun({ DB_TARGET_CLASS: 'isolated_test', DB_DIALECT: 'sqlite', DB_STORAGE: file }, {});
    expect(report.verdict).toMatch(/^ADOPTION_REQUIRED/);
    expect(report.migrations.recorded).toBeNull();
    expect(sha256(file)).toBe(before);
    fs.unlinkSync(file);
  });
});

describe('Migration chain behaviour on SQLite (disposable)', () => {
  jest.setTimeout(900000);

  test('reapplying the migrator is a no-op and creates no duplicate schema objects', async () => {
    const file = tempDb('reapply');
    const seq2 = openDb(file);
    try {
      const r = new MigrationRunner(seq2, MIGRATIONS);
      await r.up();
      const tablesBefore = await listTables(seq2.getQueryInterface());
      const indexesBefore = (await listIndexes(seq2.getQueryInterface(), 'PROJECT_WBS')).length;
      const second = await r.up();
      expect(second).toEqual([]);
      expect(await listTables(seq2.getQueryInterface())).toEqual(tablesBefore);
      expect((await listIndexes(seq2.getQueryInterface(), 'PROJECT_WBS')).length).toBe(indexesBefore);
    } finally {
      await seq2.close();
      if (fs.existsSync(file)) fs.unlinkSync(file);
    }
  });

  test('rolling back the constraint migration restores every pre-existing index and removes its foreign keys', async () => {
    const file = tempDb('rollback-constraints');
    const seq3 = openDb(file);
    try {
      const r = new MigrationRunner(seq3, MIGRATIONS);
      // The runner rolls back the last applied migration by name. The project master migration sorts after the
      // constraint migration, so it is held back here: the constraint migration must be the last one applied.
      await r.up({ exclude: [CORRECTIVE, PROJECT_MASTER, REDUNDANT_INDEX, ENUM_DOMAIN, VENDOR_FK, DPR_IMAGES, MSP_TASK_KEY, PHASE_A] });
      const qi = seq3.getQueryInterface();
      const tablesBefore = {};
      for (const t of CANONICAL.baselineTables.concat(Object.keys(CANONICAL.tables))) {
        if (CANONICAL.tables[t]) tablesBefore[t] = (await listIndexes(qi, t)).map((i) => `${i.name}:${i.fields.join(',')}:${i.unique}`).sort();
      }
      await r.up({ exclude: [PROJECT_MASTER, REDUNDANT_INDEX, ENUM_DOMAIN, VENDOR_FK, DPR_IMAGES, MSP_TASK_KEY, PHASE_A] });
      const afterUp = await listIndexes(qi, 'PROJECT_WBS');
      expect(afterUp.length).toBeGreaterThan(0);
      await r.down(1);
      for (const [t, expected] of Object.entries(tablesBefore)) {
        const now = (await listIndexes(qi, t)).map((i) => `${i.name}:${i.fields.join(',')}:${i.unique}`).sort();
        expect({ table: t, indexes: now }).toEqual({ table: t, indexes: expected });
      }
      const fks = await seq3.query("PRAGMA foreign_key_list('PROJECT_WBS')", { type: seq3.QueryTypes.SELECT });
      expect(fks).toEqual([]);
    } finally {
      await seq3.close();
      if (fs.existsSync(file)) fs.unlinkSync(file);
    }
  });

  test('the adoption report reports constraint differences on a database without the constraint migration, read-only', async () => {
    const file = tempDb('report-diff');
    const seq4 = openDb(file);
    try {
      await new MigrationRunner(seq4, MIGRATIONS).up({ exclude: [CORRECTIVE] });
      await seq4.close();
      const before = sha256(file);
      const report = await adoptionRun({ DB_TARGET_CLASS: 'isolated_test', DB_DIALECT: 'sqlite', DB_STORAGE: file }, {});
      expect(sha256(file)).toBe(before);
      expect(report.migrations.notRecorded).toEqual([CORRECTIVE]);
      const kinds = Object.values(report.issues).flat().map((i) => i.kind);
      expect(kinds).toContain('MISSING_FOREIGN_KEY');
      expect(kinds).toContain('MISSING_INDEX');
      expect(report.verdict).toMatch(/^DIFFERENCES_FOUND/);
    } finally {
      if (fs.existsSync(file)) fs.unlinkSync(file);
    }
  });
});
