'use strict';
/**
 * D-1: the explicit index that duplicates the primary key of PROJECT_TASK_ASSIGNEE is dropped by a forward migration.
 * The primary key stays, uniqueness is still enforced, and rolling back restores the index exactly.
 * The migrator and the migrations are the real ones; the database is an in-memory fixture.
 */
const path = require('path');
const { Sequelize } = require('sequelize');
const MigrationRunner = require('../src/core/utils/migrator');
const { introspectTable, listIndexes, indexSignature } = require('../scripts/schema/introspect');

/** Sequelize wraps driver errors; the constraint name is in the wrapped messages. Returns all of them joined. */
async function rejectionText(promise) {
  try {
    await promise;
  } catch (e) {
    return [e.message, e.original && e.original.message, ...((e.errors || []).map((x) => x.message))].filter(Boolean).join(' | ');
  }
  throw new Error('expected the statement to be rejected');
}

const MIGRATIONS = path.resolve(__dirname, '../migrations');
const REDUNDANT = '20261102000001-drop-redundant-project-task-assignee-index.js';
const TABLE = 'PROJECT_TASK_ASSIGNEE';
const INDEX = 'PROJECT_TASK_ASSIGNEE_user_id_task_id_unique';

describe('D-1: redundant unique index on PROJECT_TASK_ASSIGNEE', () => {
  jest.setTimeout(600000);

  let seq;
  let runner;

  beforeAll(async () => {
    seq = new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false });
    runner = new MigrationRunner(seq, MIGRATIONS);
    await runner.up();
  });

  afterAll(async () => {
    await seq.close();
  });

  test('the migration is applied and the explicit index is gone', async () => {
    const status = await runner.getStatus();
    expect(status.find((m) => m.name === REDUNDANT).applied).toBe(true);
    expect(await listIndexes(seq.getQueryInterface(), TABLE)).toEqual([]);
  });

  test('the composite primary key is intact', async () => {
    const t = await introspectTable(seq.getQueryInterface(), TABLE);
    const pk = Object.keys(t.columns).filter((c) => t.columns[c].primaryKey).sort();
    expect(pk).toEqual(['task_id', 'user_id']);
  });

  test('a duplicate (task_id, user_id) is still rejected by the primary key', async () => {
    await seq.query('PRAGMA foreign_keys = OFF');
    try {
      await seq.query(`INSERT INTO ${TABLE} (task_id, user_id) VALUES (1, 1)`);
      expect(await rejectionText(seq.query(`INSERT INTO ${TABLE} (task_id, user_id) VALUES (1, 1)`))).toMatch(/UNIQUE|PRIMARY KEY/i);
    } finally {
      await seq.query(`DELETE FROM ${TABLE} WHERE task_id = 1 AND user_id = 1`);
      await seq.query('PRAGMA foreign_keys = ON');
    }
  });

  test('integrity_check reports ok and foreign_key_check reports no violations', async () => {
    const [ic] = await seq.query('PRAGMA integrity_check', { type: seq.QueryTypes.SELECT });
    expect(Object.values(ic)[0]).toBe('ok');
    expect(await seq.query('PRAGMA foreign_key_check', { type: seq.QueryTypes.SELECT })).toEqual([]);
  });

  test('rolling back restores the index with the baseline definition; applying again removes it', async () => {
    // Six migrations follow this one by name (D-2, D-5, the DPR images table, the MS Project task key and the Phase A
    // controls were added after it), so rolling back to before it takes six steps.
    const undone = await runner.down(6);
    expect(undone.map((m) => m.name)).toEqual([
      '20261109000001-phase-a-controls.js',
      '20261104000001-add-project-task-msp-uid.js',
      '20261103000001-create-dpr-images.js',
      '20261102000003-add-measurement-book-vendor-foreign-key.js',
      '20261102000002-enforce-enum-domains.js',
      REDUNDANT,
    ]);
    const restored = await listIndexes(seq.getQueryInterface(), TABLE);
    expect(restored.map((i) => i.name)).toEqual([INDEX]);
    expect(restored.map((i) => indexSignature(i))).toEqual(['UNIQUE(task_id, user_id)']);

    const again = await runner.up();
    expect(again.map((m) => m.name)).toEqual([
      REDUNDANT,
      '20261102000002-enforce-enum-domains.js',
      '20261102000003-add-measurement-book-vendor-foreign-key.js',
      '20261103000001-create-dpr-images.js',
      '20261104000001-add-project-task-msp-uid.js',
      '20261109000001-phase-a-controls.js',
    ]);
    expect(await listIndexes(seq.getQueryInterface(), TABLE)).toEqual([]);
  });
});
