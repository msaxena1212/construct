'use strict';
/**
 * Migration preflight and application database entry point under the SQLite-only policy.
 * These checks use explicit environment objects, so they never read the real .env and never open a connection.
 */
const path = require('path');
const { evaluateMigrationTarget } = require('../src/config/database_target_guard');
const { PROHIBITED_HOSTS, DIALECTS, TARGET_CLASSES } = require('../src/config/database_target_guard');
const { sqliteWorkDir } = require('../scripts/schema/sqlite-work-dir');

const PROD_HOST = '13.233.140.9';
const FILE = path.join(sqliteWorkDir(), 'zyno-preflight-check.disposable.sqlite');

describe('policy constants', () => {
  test('the audited production address is on the prohibited list', () => {
    expect(PROHIBITED_HOSTS).toContain(PROD_HOST);
  });

  test('SQLite is the only permitted dialect and both declared classes are known', () => {
    expect(DIALECTS).toEqual(['sqlite']);
    expect(TARGET_CLASSES).toEqual(['isolated_test', 'local_demo']);
  });
});

describe('evaluateMigrationTarget (migrate.js preflight)', () => {
  test('allows an approved SQLite file inside the approved root', () => {
    const verdict = evaluateMigrationTarget({ NODE_ENV: 'test', DB_TARGET_CLASS: 'isolated_test', DB_DIALECT: 'sqlite', DB_STORAGE: FILE });
    expect(verdict.ok).toBe(true);
  });

  test('refuses MySQL even with the old approval variables set', () => {
    const verdict = evaluateMigrationTarget({
      NODE_ENV: 'development',
      DB_TARGET_CLASS: 'isolated_test',
      DB_DIALECT: 'mysql',
      DB_HOST: PROD_HOST,
      DB_NAME: 'Zyno_construction',
      MIGRATION_PRODUCTION_APPROVAL: 'ticket-1',
      MIGRATION_BACKUP_VERIFIED: 'backup-1',
    });
    expect(verdict.ok).toBe(false);
  });

  test('refuses a missing declaration instead of defaulting to a class', () => {
    const verdict = evaluateMigrationTarget({ NODE_ENV: 'development', DB_DIALECT: 'sqlite', DB_STORAGE: FILE });
    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toMatch(/DB_TARGET_CLASS/);
  });

  test('the verdict target summary never includes a password', () => {
    const verdict = evaluateMigrationTarget({ NODE_ENV: 'development', DB_DIALECT: 'mysql', DB_PASSWORD: 'secret-value' });
    expect(JSON.stringify(verdict)).not.toContain('secret-value');
  });
});

describe('src/config/db.js entry point', () => {
  const saved = { ...process.env };

  afterEach(() => {
    process.env = { ...saved };
  });

  test('refuses MySQL at require time', () => {
    process.env = { NODE_ENV: 'test', DB_TARGET_CLASS: 'isolated_test', DB_DIALECT: 'mysql', DB_HOST: 'localhost', DB_NAME: 'zyno_disposable', DB_USER: 'u', DB_PASSWORD: 'p', DB_TEST_CONFIRMED: 'true' };
    jest.isolateModules(() => {
      expect(() => require('../src/config/db')).toThrow(/DB_TARGET_REFUSED/);
    });
  });

  test('refuses an undeclared dialect rather than defaulting', () => {
    process.env = { NODE_ENV: 'test', DB_TARGET_CLASS: 'isolated_test', DB_STORAGE: ':memory:' };
    jest.isolateModules(() => {
      expect(() => require('../src/config/db')).toThrow(/DB_DIALECT/);
    });
  });

  test('opens an approved in-memory SQLite database for isolated tests', () => {
    process.env = { NODE_ENV: 'test', DB_TARGET_CLASS: 'isolated_test', DB_DIALECT: 'sqlite', DB_STORAGE: ':memory:' };
    jest.isolateModules(() => {
      const { sequelize } = require('../src/config/db');
      expect(sequelize.getDialect()).toBe('sqlite');
    });
  });
});
