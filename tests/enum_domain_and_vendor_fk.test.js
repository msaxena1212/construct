'use strict';
/**
 * D-2 and D-5 (docs/CONSTRUCTION_ERP_IMPLEMENTATION_LOG.md, section 6).
 *   - D-2: the eleven enum-backed columns are TEXT with a CHECK over the model's value list, and the database rejects
 *     any other value.
 *   - D-5: MEASUREMENT_BOOKS.vendor_id is a foreign key to VENDORS.id with ON DELETE SET NULL.
 * The migrations are the real ones, run on an in-memory fixture. Rollback of both migrations is covered too.
 */
const path = require('path');
const { Sequelize } = require('sequelize');
const MigrationRunner = require('../src/core/utils/migrator');
const { ENUM_DOMAINS } = require('../migrations/20261102000002-enforce-enum-domains');

const MIGRATIONS = path.resolve(__dirname, '../migrations');
const ENUM_MIGRATION = '20261102000002-enforce-enum-domains.js';
const VENDOR_MIGRATION = '20261102000003-add-measurement-book-vendor-foreign-key.js';
const DPR_IMAGES_MIGRATION = '20261103000001-create-dpr-images.js';
const MSP_UID_MIGRATION = '20261104000001-add-project-task-msp-uid.js';
const PHASE_A_MIGRATION = '20261109000001-phase-a-controls.js';

function rejectionText(promise) {
  return promise.then(
    () => {
      throw new Error('expected the statement to be rejected');
    },
    (e) => [e.message, e.original && e.original.message, ...((e.errors || []).map((x) => x.message))].filter(Boolean).join(' | ')
  );
}

/**
 * A NOT NULL placeholder for a column without a default, so that only the column under test can fail. Another
 * enum-backed column of the same table gets its first listed value, because its CHECK would reject a placeholder.
 */
function placeholderFor(table, column) {
  const domain = ENUM_DOMAINS.find((d) => d.table === table && d.column === column.name);
  if (domain) return domain.values[0];
  const type = String(column.type || '').toUpperCase();
  if (/INT/.test(type)) return 1;
  if (/DATE|TIME/.test(type)) return '2026-11-02 00:00:00';
  return 'x';
}

describe('D-2: enum-backed columns are enforced by the database', () => {
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

  test('every enum-backed column is declared TEXT with a CHECK over the model value list', async () => {
    for (const d of ENUM_DOMAINS) {
      const [row] = await seq.query("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = :t", {
        replacements: { t: d.table },
        type: seq.QueryTypes.SELECT,
      });
      expect(row.sql).toMatch(new RegExp(`[\`"]${d.column}[\`"] TEXT CHECK \\(`));
      for (const value of d.values) expect(row.sql).toContain(`'${value}'`);
    }
  });

  test('the database rejects a value outside the list and accepts a listed value', async () => {
    await seq.query('PRAGMA foreign_keys = OFF');
    try {
      for (const d of ENUM_DOMAINS) {
        const columns = await seq.query(`PRAGMA table_info('${d.table}')`, { type: seq.QueryTypes.SELECT });
        // Every column the insert must supply: NOT NULL without a default, plus the column under test.
        const required = columns.filter((c) => c.pk === 0 && ((c.notnull === 1 && c.dflt_value === null) || c.name === d.column));
        const rowFor = (value) =>
          Object.fromEntries(required.map((c) => [c.name, c.name === d.column ? value : placeholderFor(d.table, c)]));
        const insertSql = (data) =>
          `INSERT INTO "${d.table}" (${Object.keys(data).map((c) => `"${c}"`).join(', ')}) VALUES (${Object.keys(data).map(() => '?').join(', ')})`;

        const rejected = await rejectionText(
          seq.query(insertSql(rowFor('not_a_listed_value')), { replacements: Object.values(rowFor('not_a_listed_value')) })
        );
        expect(`${d.table}.${d.column}: ${rejected}`).toMatch(/CHECK constraint failed/i);

        const accepted = rowFor(d.values[0]);
        const t = await seq.transaction();
        try {
          await seq.query(insertSql(accepted), { replacements: Object.values(accepted), transaction: t });
        } finally {
          await t.rollback();
        }
      }
    } finally {
      await seq.query('PRAGMA foreign_keys = ON');
    }
  });
});

describe('D-5: MEASUREMENT_BOOKS.vendor_id foreign key', () => {
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

  test('the foreign key exists with ON DELETE SET NULL', async () => {
    const fks = await seq.query("PRAGMA foreign_key_list('MEASUREMENT_BOOKS')", { type: seq.QueryTypes.SELECT });
    expect(fks).toEqual(
      expect.arrayContaining([expect.objectContaining({ from: 'vendor_id', table: 'VENDORS', to: 'id', on_delete: 'SET NULL' })])
    );
  });

  test('rolling back both migrations restores the previous declarations; applying again restores the new ones', async () => {
    // The Phase A controls (20261109), the MS Project task key (20261104) and DPR_IMAGES (20261103) sort after both, so
    // they are the first rollback steps.
    const undone = await runner.down(5);
    expect(undone.map((m) => m.name)).toEqual([PHASE_A_MIGRATION, MSP_UID_MIGRATION, DPR_IMAGES_MIGRATION, VENDOR_MIGRATION, ENUM_MIGRATION]);

    const fks = await seq.query("PRAGMA foreign_key_list('MEASUREMENT_BOOKS')", { type: seq.QueryTypes.SELECT });
    expect(fks.some((f) => f.from === 'vendor_id')).toBe(false);

    const [row] = await seq.query("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'PURCHASE_ORDER'", {
      type: seq.QueryTypes.SELECT,
    });
    expect(row.sql).toMatch(/`status` VARCHAR\(50\)/);
    expect(row.sql).not.toMatch(/CHECK/);

    const again = await runner.up();
    expect(again.map((m) => m.name)).toEqual([ENUM_MIGRATION, VENDOR_MIGRATION, DPR_IMAGES_MIGRATION, MSP_UID_MIGRATION, PHASE_A_MIGRATION]);
    const restored = await seq.query("PRAGMA foreign_key_list('MEASUREMENT_BOOKS')", { type: seq.QueryTypes.SELECT });
    expect(restored.some((f) => f.from === 'vendor_id' && f.on_delete === 'SET NULL')).toBe(true);
  });
});
