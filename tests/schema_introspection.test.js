'use strict';
/**
 * Introspection and comparison rules (scripts/schema/introspect.js and adopt-report.js diffTable).
 * In-memory SQLite fixtures and pure comparison cases. No file is created.
 *
 * Regression for D-1: an explicitly created index is reported even when its columns equal the primary key.
 */
const { Sequelize } = require('sequelize');
const { introspectTable, listIndexes, indexSignature } = require('../scripts/schema/introspect');
const { diffTable } = require('../scripts/schema/adopt-report');

function memory() {
  return new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false });
}

/** Sequelize wraps driver errors; the constraint name is in the wrapped messages. Returns all of them joined. */
async function rejectionText(promise) {
  try {
    await promise;
  } catch (e) {
    return [e.message, e.original && e.original.message, ...((e.errors || []).map((x) => x.message))].filter(Boolean).join(' | ');
  }
  throw new Error('expected the statement to be rejected');
}

describe('introspection keeps explicit indexes, including one that duplicates the primary key', () => {
  test('an explicit unique index on the primary-key columns is reported with its definition', async () => {
    const seq = memory();
    try {
      await seq.query('CREATE TABLE PAIR (a INTEGER NOT NULL, b INTEGER NOT NULL, PRIMARY KEY (a, b))');
      await seq.query('CREATE UNIQUE INDEX PAIR_a_b_unique ON PAIR (a, b)');
      const t = await introspectTable(seq.getQueryInterface(), 'PAIR');
      expect(t.indexes).toHaveLength(1);
      expect(t.indexes[0]).toMatchObject({ name: 'PAIR_a_b_unique', unique: true, origin: 'c', partial: false, fields: ['a', 'b'] });
      expect(indexSignature(t.indexes[0])).toBe('UNIQUE(a, b)');
    } finally {
      await seq.close();
    }
  });

  test('the automatic primary-key index is not reported as an index', async () => {
    const seq = memory();
    try {
      await seq.query('CREATE TABLE PAIR (a INTEGER NOT NULL, b INTEGER NOT NULL, PRIMARY KEY (a, b))');
      const t = await introspectTable(seq.getQueryInterface(), 'PAIR');
      expect(t.indexes).toEqual([]);
      expect(t.columns.a.primaryKey).toBe(true);
      expect(t.columns.b.primaryKey).toBe(true);
    } finally {
      await seq.close();
    }
  });

  test('primary-key uniqueness is still enforced when an explicit index on the same columns exists', async () => {
    const seq = memory();
    try {
      await seq.query('CREATE TABLE PAIR (a INTEGER NOT NULL, b INTEGER NOT NULL, PRIMARY KEY (a, b))');
      await seq.query('CREATE UNIQUE INDEX PAIR_a_b_unique ON PAIR (a, b)');
      await seq.query('INSERT INTO PAIR (a, b) VALUES (1, 1)');
      expect(await rejectionText(seq.query('INSERT INTO PAIR (a, b) VALUES (1, 1)'))).toMatch(/UNIQUE|PRIMARY KEY/i);
    } finally {
      await seq.close();
    }
  });

  test('sort order, collation and partial conditions are recorded', async () => {
    const seq = memory();
    try {
      await seq.query('CREATE TABLE T (a TEXT NOT NULL, b INTEGER, c TEXT, PRIMARY KEY (a))');
      await seq.query('CREATE INDEX T_b_desc ON T (b DESC, c COLLATE NOCASE)');
      await seq.query('CREATE UNIQUE INDEX T_c_partial ON T (c) WHERE b > 0');
      const t = await introspectTable(seq.getQueryInterface(), 'T');
      const byName = Object.fromEntries(t.indexes.map((i) => [i.name, i]));
      expect(byName.T_b_desc.columns).toEqual([
        { name: 'b', desc: true, collation: 'BINARY' },
        { name: 'c', desc: false, collation: 'NOCASE' },
      ]);
      expect(indexSignature(byName.T_b_desc)).toBe('INDEX(b DESC, c COLLATE NOCASE)');
      expect(byName.T_c_partial).toMatchObject({ partial: true, where: 'b > 0', unique: true });
      expect(indexSignature(byName.T_c_partial)).toBe('UNIQUE(c) WHERE b > 0');
    } finally {
      await seq.close();
    }
  });

  test('a UNIQUE column constraint is reported as a constraint index', async () => {
    const seq = memory();
    try {
      await seq.query('CREATE TABLE U (id INTEGER PRIMARY KEY, code TEXT NOT NULL UNIQUE)');
      const indexes = await listIndexes(seq.getQueryInterface(), 'U');
      expect(indexes).toHaveLength(1);
      expect(indexes[0]).toMatchObject({ origin: 'u', unique: true, fields: ['code'] });
    } finally {
      await seq.close();
    }
  });

  test('declared types and default expressions are captured as stored', async () => {
    const seq = memory();
    try {
      await seq.query(
        "CREATE TABLE D (id INTEGER PRIMARY KEY, status VARCHAR(20) NOT NULL DEFAULT 'pending', stamp DATETIME DEFAULT CURRENT_TIMESTAMP)"
      );
      const t = await introspectTable(seq.getQueryInterface(), 'D');
      expect(t.columns.status).toMatchObject({ declaredType: 'VARCHAR(20)', defaultValue: "'pending'" });
      expect(t.columns.stamp).toMatchObject({ defaultValue: 'CURRENT_TIMESTAMP' });
      expect(t.columns.id.defaultValue).toBeNull();
    } finally {
      await seq.close();
    }
  });
});

describe('the comparison rule reports differences in both directions and compares names only when asked', () => {
  const column = (overrides = {}) => ({ family: 'int', declaredType: 'INTEGER', allowNull: false, primaryKey: false, defaultValue: null, ...overrides });
  const index = (name, overrides = {}) => ({ name, unique: true, origin: 'c', partial: false, where: null, fields: ['a', 'b'], columns: [{ name: 'a', desc: false, collation: 'BINARY' }, { name: 'b', desc: false, collation: 'BINARY' }], ...overrides });
  const table = (indexes = [], columns = { a: column(), b: column() }) => ({ columns, indexes, fks: [] });

  test('the same definition under a different name is equal unless names are compared', () => {
    const expected = table([index('expected_name')]);
    const actual = table([index('actual_name')]);
    expect(diffTable(expected, actual)).toEqual([]);
    const named = diffTable(expected, actual, { names: true });
    expect(named.map((i) => i.kind).sort()).toEqual(['EXTRA_INDEX', 'MISSING_INDEX']);
  });

  test('an index the expected schema lacks is reported as EXTRA_INDEX', () => {
    const issues = diffTable(table([]), table([index('explicit_on_pk')]));
    expect(issues).toEqual([{ kind: 'EXTRA_INDEX', detail: 'UNIQUE(a, b)' }]);
  });

  test('a default or declared-type difference is reported', () => {
    const issues = diffTable(
      table([], { a: column({ defaultValue: null }), b: column({ declaredType: 'TEXT' }) }),
      table([], { a: column({ defaultValue: 'CURRENT_TIMESTAMP' }), b: column({ declaredType: 'VARCHAR(50)' }) })
    );
    expect(issues.map((i) => i.kind).sort()).toEqual(['DEFAULT_MISMATCH', 'TYPE_DECLARATION_MISMATCH']);
  });
});
