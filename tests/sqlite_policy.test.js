'use strict';
/**
 * Bypass cases for the SQLite-only policy: filesystem redirections, drive-relative and long-path forms,
 * and direct Sequelize instances that try to reach the migrator or the adoption report without the approved root.
 * Every case here must refuse before any database file is opened or created.
 *
 * Only paths on drive E: are used. The approved root is E:\Port\Construction\_sqlite_work; the escape target is a
 * folder on E: outside that root, so nothing is created on the system drive.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { Sequelize } = require('sequelize');
const { resolveApprovedSqlitePath, APPROVED_ROOT, isInside } = require('../src/config/sqlite_policy');
const { evaluateDatabaseTarget } = require('../src/config/database_target_guard');
const MigrationRunner = require('../src/core/utils/migrator');
const { sqliteWorkDir } = require('../scripts/schema/sqlite-work-dir');

const ESCAPE_TARGET = path.join(path.dirname(APPROVED_ROOT), '_sqlite_escape_target');
const LINK_NAME = path.join(sqliteWorkDir(), 'zyno-policy-junction-escape');

const sqlite = (storage) => ({
  NODE_ENV: 'test',
  DB_TARGET_CLASS: 'isolated_test',
  DB_DIALECT: 'sqlite',
  DB_STORAGE: storage,
});

jest.setTimeout(120000);

describe('filesystem redirection cannot leave the approved root', () => {
  let junctionCreated = false;

  beforeAll(() => {
    fs.mkdirSync(ESCAPE_TARGET, { recursive: true });
    try {
      fs.symlinkSync(ESCAPE_TARGET, LINK_NAME, 'junction');
      junctionCreated = true;
    } catch (err) {
      junctionCreated = false;
      process.stdout.write(`junction setup failed: ${err.code}\n`);
    }
  });

  afterAll(() => {
    if (junctionCreated && fs.existsSync(LINK_NAME)) fs.rmdirSync(LINK_NAME);
    if (fs.existsSync(ESCAPE_TARGET) && fs.readdirSync(ESCAPE_TARGET).length === 0) fs.rmdirSync(ESCAPE_TARGET);
  });

  test('a junction inside the root that points outside it is refused', () => {
    if (!junctionCreated) {
      throw new Error('Junction could not be created on this machine; the escape case is NOT VERIFIED.');
    }
    const escaped = path.join(LINK_NAME, 'zyno-escape.disposable.sqlite');
    expect(() => resolveApprovedSqlitePath(escaped)).toThrow(/link outside the approved root|inside/);
    expect(evaluateDatabaseTarget(sqlite(escaped)).ok).toBe(false);
    expect(fs.existsSync(path.join(ESCAPE_TARGET, 'zyno-escape.disposable.sqlite'))).toBe(false);
  });
});

describe('path forms that are not absolute, local or on drive E: are refused', () => {
  test('drive-relative form (E:file) is refused', () => {
    expect(() => resolveApprovedSqlitePath('E:zyno-relative.disposable.sqlite')).toThrow(/absolute/);
  });

  test('Windows long-path prefix is refused (fail closed)', () => {
    expect(() => resolveApprovedSqlitePath('\\\\?\\E:\\Port\\Construction\\_sqlite_work\\x.disposable.sqlite')).toThrow();
  });

  test('a file: URL is refused', () => {
    expect(evaluateDatabaseTarget(sqlite('file:///E:/Port/Construction/_sqlite_work/x.disposable.sqlite')).ok).toBe(false);
  });

  test('a drive-letter path with lower-case e: inside the root is accepted', () => {
    const lower = path.join(sqliteWorkDir(), 'zyno-case.disposable.sqlite').replace(/^E:/, 'e:');
    expect(() => resolveApprovedSqlitePath(lower)).not.toThrow();
  });

  test('isInside is case-insensitive and rejects the root folder itself', () => {
    expect(isInside(APPROVED_ROOT, path.join(APPROVED_ROOT, 'a.sqlite'))).toBe(true);
    expect(isInside(APPROVED_ROOT.toLowerCase(), path.join(APPROVED_ROOT, 'a.sqlite'))).toBe(true);
    expect(isInside(APPROVED_ROOT, APPROVED_ROOT)).toBe(false);
    expect(isInside(APPROVED_ROOT, path.join(APPROVED_ROOT, '..', 'x.sqlite'))).toBe(false);
  });
});

describe('direct Sequelize instances cannot reach the migrator outside the policy', () => {
  test('the migrator refuses an instance whose file is outside the approved root, before opening it', async () => {
    const outside = path.join(ESCAPE_TARGET, 'never-created.disposable.sqlite');
    const seq = new Sequelize({ dialect: 'sqlite', storage: outside, logging: false });
    try {
      await expect(new MigrationRunner(seq).up()).rejects.toThrow(/SQLITE_POLICY|inside/);
      await expect(new MigrationRunner(seq).down(1)).rejects.toThrow(/SQLITE_POLICY|inside/);
      expect(fs.existsSync(outside)).toBe(false);
    } finally {
      await seq.close();
    }
  });

  test('the migrator refuses a MySQL instance outright', async () => {
    const seq = new Sequelize('zyno_disposable', 'u', 'p', { dialect: 'mysql', host: 'localhost', logging: false });
    try {
      await expect(new MigrationRunner(seq).up()).rejects.toThrow(/SQLite is the only permitted/);
    } finally {
      await seq.close();
    }
  });

  test('the migrator accepts in-memory SQLite (unit fixtures only) without opening a file', async () => {
    const seq = new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false });
    try {
      await expect(new MigrationRunner(seq, path.resolve(__dirname, '../migrations')).getStatus()).resolves.toBeDefined();
    } finally {
      await seq.close();
    }
  });
});

describe('the approved root is the only location used by verification helpers', () => {
  test('the work-directory helper returns the approved root and creates no other folder', () => {
    expect(sqliteWorkDir()).toBe(APPROVED_ROOT);
    expect(os.tmpdir().toLowerCase().startsWith(APPROVED_ROOT.toLowerCase())).toBe(false);
  });
});
