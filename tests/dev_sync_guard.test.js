'use strict';
/**
 * Proves the development-only synchronization guard fails closed. These tests pass explicit environment
 * objects, so they never read the real .env and never open a connection.
 */
const path = require('path');
const { spawnSync } = require('child_process');
const { evaluateDevSyncTarget, assertDevSyncTarget } = require('../scripts/schema/dev-sync-guard');

const ROOT = path.resolve(__dirname, '..');
const { sqliteWorkDir } = require('../scripts/schema/sqlite-work-dir');
const OK_FILE = path.join(sqliteWorkDir(), 'local-work.disposable.sqlite');
const base = { ZYNO_DEV_SYNC: '1', DB_DIALECT: 'sqlite', DB_STORAGE: OK_FILE };

describe('development synchronization guard (fail closed)', () => {
  test('accepts an explicitly opted-in, disposable local SQLite file', () => {
    expect(evaluateDevSyncTarget(base).ok).toBe(true);
  });

  test('accepts an in-memory SQLite database when opted in', () => {
    expect(evaluateDevSyncTarget({ ZYNO_DEV_SYNC: '1', DB_DIALECT: 'sqlite', DB_STORAGE: ':memory:' }).ok).toBe(true);
  });

  test('refuses when the opt-in flag is missing or not exactly 1', () => {
    const { ZYNO_DEV_SYNC, ...noFlag } = base;
    expect(evaluateDevSyncTarget(noFlag).ok).toBe(false);
    expect(evaluateDevSyncTarget({ ...base, ZYNO_DEV_SYNC: 'true' }).ok).toBe(false);
    expect(evaluateDevSyncTarget({ ...base, ZYNO_DEV_SYNC: '0' }).ok).toBe(false);
  });

  test('refuses production, even when opted in', () => {
    expect(evaluateDevSyncTarget({ ...base, NODE_ENV: 'production' }).ok).toBe(false);
  });

  test('refuses MySQL and MariaDB targets', () => {
    expect(evaluateDevSyncTarget({ ...base, DB_DIALECT: 'mysql', DB_HOST: 'localhost' }).ok).toBe(false);
    expect(evaluateDevSyncTarget({ ...base, DB_DIALECT: undefined })).toEqual(expect.objectContaining({ ok: false }));
  });

  test('refuses a remote database host', () => {
    expect(evaluateDevSyncTarget({ ...base, DB_HOST: 'db.example.internal' }).ok).toBe(false);
  });

  test('refuses the known production host in any setting', () => {
    expect(evaluateDevSyncTarget({ ...base, DB_HOST: '13.233.140.9' }).ok).toBe(false);
    expect(evaluateDevSyncTarget({ ...base, MIGRATION_TARGET: 'mysql://13.233.140.9:3306/x' }).ok).toBe(false);
  });

  test('refuses a file that is not named as disposable (for example the demo database)', () => {
    expect(evaluateDevSyncTarget({ ...base, DB_STORAGE: 'C:/work/demo3.sqlite' }).ok).toBe(false);
    expect(evaluateDevSyncTarget({ ...base, DB_STORAGE: 'C:/tmp/zyno-scratch/local-work.disposable.sqlite' }).ok).toBe(false);
  });

  test('refuses a remote URL used as the SQLite storage', () => {
    expect(evaluateDevSyncTarget({ ...base, DB_STORAGE: 'https://example.com/x.disposable.sqlite' }).ok).toBe(false);
  });

  test('refuses when the storage setting is missing', () => {
    const { DB_STORAGE, ...noStorage } = base;
    expect(evaluateDevSyncTarget(noStorage).ok).toBe(false);
  });

  test('assertDevSyncTarget throws a coded error for an unsafe target', () => {
    let caught;
    try {
      assertDevSyncTarget({ ...base, NODE_ENV: 'production' });
    } catch (e) {
      caught = e;
    }
    expect(caught && caught.code).toBe('DEV_SYNC_REFUSED');
  });

  test('sync-models.js exits non-zero and touches nothing without the opt-in', () => {
    const env = { ...process.env, ZYNO_DEV_SYNC: '', DB_DIALECT: 'mysql', DB_HOST: '13.233.140.9' };
    const result = spawnSync(process.execPath, [path.join(ROOT, 'scripts/sync-models.js')], { cwd: ROOT, env, encoding: 'utf8' });
    expect(result.status).not.toBe(0);
    expect(`${result.stderr}${result.stdout}`).toMatch(/DEV_SYNC_REFUSED/);
  });

  test('sync-procurement.js refuses a MySQL target even when the opt-in is set', () => {
    const env = { ...process.env, ZYNO_DEV_SYNC: '1', DB_DIALECT: 'mysql', DB_HOST: 'localhost' };
    const result = spawnSync(process.execPath, [path.join(ROOT, 'scripts/sync-procurement.js')], { cwd: ROOT, env, encoding: 'utf8' });
    expect(result.status).not.toBe(0);
    expect(`${result.stderr}${result.stdout}`).toMatch(/DEV_SYNC_REFUSED/);
  });

  test('no script or source file in the repository uses alter-mode synchronization', () => {
    const fs = require('fs');
    const offenders = [];
    const walk = (dir) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.name === 'node_modules' || e.name === '.git') continue;
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p);
        else if (p.endsWith('.js') && !p.endsWith('dev-sync-guard.js') && !p.includes(`${path.sep}tests${path.sep}`)) {
          const text = fs.readFileSync(p, 'utf8');
          // Only live code counts: commented-out lines are not executed.
          for (const line of text.split('\n')) {
            if (/^\s*\/\//.test(line)) continue;
            if (/sync\(\s*\{[^}]*alter\s*:\s*true/.test(line)) offenders.push(path.relative(ROOT, p));
          }
        }
      }
    };
    walk(ROOT);
    expect(offenders).toEqual([]);
  });
});
