'use strict';
/**
 * SQLite-only database policy. Every connection passes through src/config/db.js, so these tests prove that
 * anything other than an approved SQLite file inside the approved root is refused before a connection is
 * opened, both for the function itself and for real entry points run as child processes.
 */
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { evaluateDatabaseTarget, assertDatabaseTarget } = require('../src/config/database_target_guard');
const { APPROVED_ROOT } = require('../src/config/sqlite_policy');
const { sqliteWorkDir } = require('../scripts/schema/sqlite-work-dir');

const ROOT_DIR = path.resolve(__dirname, '..');
const PROD = '13.233.140.9';
const DISPOSABLE_FILE = path.join(sqliteWorkDir(), 'zyno-guard-check.disposable.sqlite');
const DEMO_FILE = path.join(sqliteWorkDir(), 'zyno-guard-check.sqlite');

const sqlite = (over = {}) => ({
  NODE_ENV: 'test',
  DB_TARGET_CLASS: 'isolated_test',
  DB_DIALECT: 'sqlite',
  DB_STORAGE: DISPOSABLE_FILE,
  ...over,
});

// Child processes load the full application when a guard is missing, which is slow on this machine.
jest.setTimeout(300000);

describe('approved root', () => {
  test('is the E: drive folder reserved for SQLite work', () => {
    expect(APPROVED_ROOT.toLowerCase()).toBe('e:\\port\\construction\\_sqlite_work');
  });
});

describe('evaluateDatabaseTarget: SQLite inside the approved root is the only permitted target', () => {
  test('accepts a disposable test file inside the approved root', () => {
    expect(evaluateDatabaseTarget(sqlite()).ok).toBe(true);
  });

  test('accepts in-memory SQLite for isolated_test only', () => {
    expect(evaluateDatabaseTarget(sqlite({ DB_STORAGE: ':memory:' })).ok).toBe(true);
    expect(evaluateDatabaseTarget(sqlite({ DB_TARGET_CLASS: 'local_demo', DB_STORAGE: ':memory:' })).ok).toBe(false);
  });

  test('accepts a local_demo .sqlite file inside the approved root', () => {
    expect(evaluateDatabaseTarget(sqlite({ DB_TARGET_CLASS: 'local_demo', DB_STORAGE: DEMO_FILE })).ok).toBe(true);
  });

  test('isolated_test files must be named disposable', () => {
    expect(evaluateDatabaseTarget(sqlite({ DB_STORAGE: DEMO_FILE })).ok).toBe(false);
  });

  test('refuses the existing demo database on the system drive (outside the approved root)', () => {
    const verdict = evaluateDatabaseTarget(sqlite({ DB_TARGET_CLASS: 'local_demo', DB_STORAGE: 'C:\\Users\\mindz\\demo3.sqlite' }));
    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toMatch(/drive E|inside/);
  });

  test('refuses a file on another drive even when named correctly', () => {
    expect(evaluateDatabaseTarget(sqlite({ DB_STORAGE: 'D:\\data\\x.disposable.sqlite' })).ok).toBe(false);
  });

  test('refuses a relative path', () => {
    expect(evaluateDatabaseTarget(sqlite({ DB_STORAGE: 'x.disposable.sqlite' })).ok).toBe(false);
  });

  test('refuses a path that escapes the root with ".."', () => {
    const escaped = path.join(APPROVED_ROOT, '..', 'x.disposable.sqlite');
    expect(evaluateDatabaseTarget(sqlite({ DB_STORAGE: escaped })).ok).toBe(false);
  });

  test('refuses a URL and a network share', () => {
    expect(evaluateDatabaseTarget(sqlite({ DB_STORAGE: 'https://example.com/x.disposable.sqlite' })).ok).toBe(false);
    expect(evaluateDatabaseTarget(sqlite({ DB_STORAGE: '\\\\server\\share\\x.disposable.sqlite' })).ok).toBe(false);
  });

  test('refuses a missing storage setting', () => {
    expect(evaluateDatabaseTarget({ NODE_ENV: 'test', DB_TARGET_CLASS: 'isolated_test', DB_DIALECT: 'sqlite' }).ok).toBe(false);
  });
});

describe('evaluateDatabaseTarget: every other database is refused', () => {
  test.each([
    ['mysql with disposable-looking settings', { DB_DIALECT: 'mysql', DB_HOST: 'localhost', DB_NAME: 'zyno_disposable', DB_USER: 'u', DB_PASSWORD: 'p', DB_TEST_CONFIRMED: 'true' }],
    ['mariadb', { DB_DIALECT: 'mariadb' }],
    ['postgres', { DB_DIALECT: 'postgres' }],
    ['no dialect', { DB_DIALECT: undefined }],
  ])('refuses %s', (_label, over) => {
    expect(evaluateDatabaseTarget(sqlite(over)).ok).toBe(false);
  });

  test('refuses MySQL with the reason that SQLite is the only permitted database', () => {
    const verdict = evaluateDatabaseTarget(sqlite({ DB_DIALECT: 'mysql', DB_HOST: 'localhost', DB_NAME: 'zyno_disposable', DB_USER: 'u', DB_PASSWORD: 'x' }));
    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toMatch(/SQLite is the only permitted/);
  });

  test('refuses the production host in any setting', () => {
    expect(evaluateDatabaseTarget(sqlite({ DB_HOST: PROD })).ok).toBe(false);
    expect(evaluateDatabaseTarget(sqlite({ MAIL_HOST: PROD })).ok).toBe(false);
  });

  test('refuses production runtime', () => {
    expect(evaluateDatabaseTarget(sqlite({ NODE_ENV: 'production' })).ok).toBe(false);
  });

  test('refuses an undeclared or unapproved class', () => {
    expect(evaluateDatabaseTarget({ DB_DIALECT: 'sqlite', DB_STORAGE: DISPOSABLE_FILE }).ok).toBe(false);
    expect(evaluateDatabaseTarget(sqlite({ DB_TARGET_CLASS: 'shared' })).ok).toBe(false);
  });

  test('the verdict summary never includes a credential', () => {
    const verdict = evaluateDatabaseTarget(sqlite({ DB_DIALECT: 'mysql', DB_PASSWORD: 'super-secret-value' }));
    expect(JSON.stringify(verdict)).not.toContain('super-secret-value');
  });

  test('assertDatabaseTarget throws a coded error before anything can connect', () => {
    let caught;
    try {
      assertDatabaseTarget({ DB_HOST: PROD });
    } catch (e) {
      caught = e;
    }
    expect(caught && caught.code).toBe('DB_TARGET_REFUSED');
  });
});

describe('real entry points refuse the production configuration before connecting', () => {
  // Child processes run from the approved folder, so no .env file is loaded. The settings are exactly the
  // production address with MySQL and no declaration.
  const productionSettings = {
    PATH: process.env.PATH,
    SystemRoot: process.env.SystemRoot,
    NODE_ENV: 'development',
    DB_HOST: PROD,
    DB_NAME: 'Zyno_construction',
    DB_USER: 'u',
    DB_PASSWORD: 'p',
    DB_DIALECT: 'mysql',
    JWT_SECRET: 'x'.repeat(40),
  };

  test('server startup exits before listening', () => {
    const result = spawnSync(process.execPath, [path.join(ROOT_DIR, 'server.js')], {
      cwd: sqliteWorkDir(),
      env: productionSettings,
      encoding: 'utf8',
      timeout: 240000,
    });
    const output = `${result.stdout}${result.stderr}`;
    expect(result.status).not.toBe(0);
    expect(output).toMatch(/DB_TARGET_REFUSED/);
    expect(output).not.toMatch(/Server is running/);
  });

  test('the migration tool refuses before connecting', () => {
    const result = spawnSync(process.execPath, [path.join(ROOT_DIR, 'scripts/migrate.js'), 'status'], {
      cwd: sqliteWorkDir(),
      env: productionSettings,
      encoding: 'utf8',
      timeout: 240000,
    });
    expect(result.status).not.toBe(0);
    expect(`${result.stdout}${result.stderr}`).toMatch(/DB_TARGET_REFUSED|REFUSED/);
  });

  test('the adoption report refuses the production configuration', () => {
    const result = spawnSync(process.execPath, [path.join(ROOT_DIR, 'scripts/schema/adopt-report.js')], {
      cwd: sqliteWorkDir(),
      env: productionSettings,
      encoding: 'utf8',
      timeout: 240000,
    });
    expect(result.status).not.toBe(0);
    expect(`${result.stdout}${result.stderr}`).toMatch(/DB_TARGET_REFUSED/);
  });

  test('the retired MySQL CI script refuses to run', () => {
    const result = spawnSync(process.execPath, [path.join(ROOT_DIR, 'scripts/test-mysql-ci.js')], {
      cwd: os.tmpdir(),
      env: { PATH: process.env.PATH, SystemRoot: process.env.SystemRoot },
      encoding: 'utf8',
      timeout: 60000,
    });
    expect(result.status).not.toBe(0);
    expect(`${result.stdout}${result.stderr}`).toMatch(/REFUSED/);
  });
});
