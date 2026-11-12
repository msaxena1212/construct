'use strict';
/**
 * MigrationRunner.getStatus() is read-only and path-checked.
 *
 * These tests use the production runner, the production path policy and the production target guard. Nothing in the
 * policy is mocked. Persistent files are disposable, have unique names and live under the approved root. Each test
 * removes only the files it created. No test touches the canonical development database or any production setting.
 */
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const MigrationRunner = require('../src/core/utils/migrator');
const { APPROVED_ROOT } = require('../src/config/sqlite_policy');
const { assertDatabaseTarget } = require('../src/config/database_target_guard');

const MIGRATIONS_DIR = path.resolve(__dirname, '../migrations');
const TESTS_DIR = path.join(APPROVED_ROOT, 'tests');
const OUTSIDE_FOLDER = path.dirname(APPROVED_ROOT); // exists, and is outside the approved root
const created = new Set();

jest.setTimeout(120000);

const isolated = (storage) => ({
  NODE_ENV: 'test',
  DB_TARGET_CLASS: 'isolated_test',
  DB_DIALECT: 'sqlite',
  DB_STORAGE: storage,
});

const tableName = (n) => (typeof n === 'string' ? n : n.tableName);

/** A new, unique disposable file under the approved root. It must not exist yet. */
function disposableFile(label) {
  fs.mkdirSync(TESTS_DIR, { recursive: true });
  const file = path.join(TESTS_DIR, `status-${label}-${process.pid}-${Date.now()}.disposable.sqlite`);
  if (fs.existsSync(file)) throw new Error(`Refusing to reuse an existing file: ${file}`);
  created.add(file);
  return file;
}

function removeCreated() {
  for (const file of created) {
    for (const suffix of ['', '-journal', '-wal', '-shm']) {
      fs.rmSync(file + suffix, { force: true });
    }
  }
  created.clear();
}

afterAll(removeCreated);

describe('MigrationRunner.getStatus()', () => {
  test('1. missing sequelize_meta: status is returned and the metadata table is not created', async () => {
    const file = disposableFile('missing');
    expect(() => assertDatabaseTarget(isolated(file))).not.toThrow();

    const seq = new Sequelize({ dialect: 'sqlite', storage: file, logging: false });
    try {
      const qi = seq.getQueryInterface();
      await qi.createTable('PROBE_STATUS', { id: { type: Sequelize.INTEGER, primaryKey: true } });
      const before = (await qi.showAllTables()).map(tableName).sort();

      const status = await new MigrationRunner(seq, MIGRATIONS_DIR).getStatus();

      expect(status.length).toBeGreaterThan(0);
      expect(status.every((m) => m.applied === false)).toBe(true);
      expect(status.map((m) => m.name)).toEqual(new MigrationRunner(seq, MIGRATIONS_DIR).getAvailableMigrations());

      const after = (await qi.showAllTables()).map(tableName).sort();
      expect(after).toEqual(before);
      expect(after).not.toContain('sequelize_meta');
    } finally {
      await seq.close();
    }
  });

  test('2. existing metadata in a file-based database: applied and pending migrations are reported correctly', async () => {
    const file = disposableFile('recorded');
    expect(() => assertDatabaseTarget(isolated(file))).not.toThrow();

    const seq = new Sequelize({ dialect: 'sqlite', storage: file, logging: false });
    try {
      const runner = new MigrationRunner(seq, MIGRATIONS_DIR);
      const available = runner.getAvailableMigrations();
      const recorded = available.slice(0, 2);

      // Bookkeeping table with the same shape the runner creates; two names recorded as applied.
      await seq.query(
        'CREATE TABLE sequelize_meta (name VARCHAR(255) NOT NULL, applied_at DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (name))'
      );
      for (const name of recorded) {
        await seq.query('INSERT INTO sequelize_meta (name) VALUES (?)', { replacements: [name] });
      }

      const status = await runner.getStatus();

      expect(status.map((m) => m.name)).toEqual(available);
      expect(status.filter((m) => m.applied).map((m) => m.name)).toEqual(recorded);
      expect(status.slice(recorded.length).every((m) => m.applied === false)).toBe(true);

      // Reading the status must leave the recorded rows exactly as they were.
      const rows = await seq.query('SELECT name FROM sequelize_meta ORDER BY name', { type: seq.QueryTypes.SELECT });
      expect(rows.map((r) => r.name)).toEqual([...recorded].sort());
    } finally {
      await seq.close();
    }
  });

  test('3. a path outside the approved root is refused before the target is opened or created', async () => {
    // Two forms: a plain path on drive E: outside the root, and a path that climbs out of the root with "..".
    // The folder exists, so a policy failure would be visible as a created file. The check is that none appears.
    const outsideFile = path.join(OUTSIDE_FOLDER, `zyno-status-probe-${process.pid}-${Date.now()}.disposable.sqlite`);
    const traversalFile = `${TESTS_DIR}\\..\\..\\zyno-status-probe-traversal-${process.pid}-${Date.now()}.disposable.sqlite`;
    created.add(outsideFile);
    created.add(traversalFile);

    for (const storage of [outsideFile, traversalFile]) {
      expect(fs.existsSync(storage)).toBe(false);
      expect(() => assertDatabaseTarget(isolated(storage))).toThrow(/DB_TARGET_REFUSED/);

      const seq = new Sequelize({ dialect: 'sqlite', storage, logging: false });
      try {
        await expect(new MigrationRunner(seq, MIGRATIONS_DIR).getStatus()).rejects.toThrow(/SQLITE_POLICY/);
      } finally {
        await seq.close();
      }
      expect(fs.existsSync(storage)).toBe(false);
    }
  });

  test('4. a non-SQLite Sequelize instance is refused without attempting a database connection', async () => {
    expect(() =>
      assertDatabaseTarget({ NODE_ENV: 'test', DB_TARGET_CLASS: 'isolated_test', DB_DIALECT: 'mysql', DB_HOST: 'localhost' })
    ).toThrow(/DB_TARGET_REFUSED/);

    const seq = new Sequelize('zyno_disposable', 'u', 'p', { dialect: 'mysql', host: 'localhost', logging: false });
    const getConnection = jest.spyOn(seq.connectionManager, 'getConnection');
    const authenticate = jest.spyOn(seq, 'authenticate');
    try {
      await expect(new MigrationRunner(seq, MIGRATIONS_DIR).getStatus()).rejects.toThrow(/SQLite is the only permitted/);
      expect(getConnection).not.toHaveBeenCalled();
      expect(authenticate).not.toHaveBeenCalled();
    } finally {
      await seq.close();
    }
  });
});
