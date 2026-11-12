'use strict';
/**
 * Read-only schema introspection shared by the adoption report, the snapshot builder and the migration tests.
 * Every call here is a read (PRAGMA, describeTable, showIndex, foreign-key lookup). Nothing is written.
 *
 * Index rules (corrected 2026-11-02, see docs/CONSTRUCTION_ERP_IMPLEMENTATION_LOG.md, D-1):
 *  - The only index that is not reported is the automatic index that SQLite creates for the PRIMARY KEY (origin 'pk').
 *    The primary key is compared through the primaryKey flags of the columns instead.
 *  - Explicit indexes (origin 'c', CREATE INDEX) and UNIQUE-constraint indexes (origin 'u') are always reported,
 *    including when their columns equal the primary key. A column list is never used to hide an index.
 *  - Each reported index keeps its name, uniqueness, partial condition and ordered key columns with sort order
 *    and collation. Expression columns are reported as name null.
 */

// Collapses dialect-specific type names into comparable families.
function typeFamily(raw) {
  const t = String(raw || '').toUpperCase();
  if (/^TINYINT\(1\)|^BOOLEAN|^TINYINT\(1\)/.test(t)) return 'bool';
  if (/INT/.test(t)) return 'int';
  if (/CHAR|TEXT|CLOB/.test(t)) return 'text';
  if (/^ENUM/.test(t)) return 'enum';
  if (/DECIMAL|NUMERIC|FLOAT|DOUBLE|REAL/.test(t)) return 'num';
  if (/DATETIME|TIMESTAMP|DATE/.test(t)) return 'datetime';
  if (/JSON/.test(t)) return 'json';
  return t;
}

/** Lists indexes on a table, with the primary-key index excluded (see the rules above). */
async function listIndexes(queryInterface, table, options = {}) {
  const sequelize = queryInterface.sequelize;
  const q = (sql) => sequelize.query(sql, { type: sequelize.QueryTypes.SELECT, transaction: options.transaction });
  if (sequelize.getDialect() === 'sqlite') {
    const safe = table.replace(/'/g, "''");
    const list = await q(`PRAGMA index_list('${safe}')`);
    const out = [];
    for (const idx of list) {
      const name = idx.name.replace(/'/g, "''");
      const xinfo = await q(`PRAGMA index_xinfo('${name}')`);
      const columns = xinfo
        .filter((c) => c.key === 1)
        .sort((a, b) => a.seqno - b.seqno)
        .map((c) => ({ name: c.name === null ? null : c.name, desc: c.desc === 1, collation: c.coll || 'BINARY' }));
      let where = null;
      if (idx.partial === 1) {
        const [row] = await q(`SELECT sql FROM sqlite_master WHERE type = 'index' AND name = '${name}'`);
        const m = row && row.sql ? row.sql.match(/\bWHERE\s+([\s\S]+)$/i) : null;
        where = m ? m[1].trim() : null;
      }
      out.push({
        name: idx.name,
        unique: idx.unique === 1,
        origin: idx.origin,
        partial: idx.partial === 1,
        where,
        fields: columns.map((c) => c.name),
        columns,
      });
    }
    return out.filter((i) => i.origin !== 'pk');
  }
  const rows = await queryInterface.showIndex(table, { transaction: options.transaction });
  const byName = new Map();
  for (const idx of rows) {
    if (idx.primary || idx.name === 'PRIMARY') continue;
    if (!byName.has(idx.name)) byName.set(idx.name, { name: idx.name, unique: !!idx.unique, origin: null, partial: false, where: null, fields: [], columns: [] });
    for (const f of idx.fields || []) {
      byName.get(idx.name).fields.push(f.attribute);
      byName.get(idx.name).columns.push({ name: f.attribute, desc: false, collation: 'BINARY' });
    }
  }
  return [...byName.values()];
}

/**
 * The comparable definition of an index: uniqueness, partial condition, and ordered key columns with sort order and
 * collation. The name is not part of the definition; compare names separately where the rule requires it.
 */
function indexSignature(index) {
  const cols = index.columns.map((c) => {
    const name = c.name === null || c.name === undefined ? '(expression)' : c.name;
    const coll = c.collation && c.collation !== 'BINARY' ? ` COLLATE ${c.collation}` : '';
    return `${name}${c.desc ? ' DESC' : ''}${coll}`;
  });
  return `${index.unique ? 'UNIQUE' : 'INDEX'}(${cols.join(', ')})${index.partial ? ` WHERE ${index.where}` : ''}`;
}

async function introspectTable(queryInterface, table) {
  const sequelize = queryInterface.sequelize;
  const isSqlite = sequelize.getDialect() === 'sqlite';
  const described = await queryInterface.describeTable(table);

  // SQLite: the raw declaration text and default expression, exactly as stored in the schema.
  const raw = {};
  if (isSqlite) {
    const rows = await sequelize.query(`PRAGMA table_info('${table.replace(/'/g, "''")}')`, { type: sequelize.QueryTypes.SELECT });
    for (const r of rows) raw[r.name] = { declaredType: r.type, defaultValue: r.dflt_value };
  }

  const columns = {};
  for (const [name, c] of Object.entries(described)) {
    columns[name] = {
      family: typeFamily(c.type),
      declaredType: isSqlite ? raw[name].declaredType : String(c.type || ''),
      allowNull: !!c.allowNull,
      primaryKey: !!c.primaryKey,
      defaultValue: isSqlite ? raw[name].defaultValue ?? null : c.defaultValue ?? null,
    };
  }

  const indexes = await listIndexes(queryInterface, table);

  const fks = [];
  if (isSqlite) {
    const rows = await sequelize.query(`PRAGMA foreign_key_list('${table.replace(/'/g, "''")}')`, { type: sequelize.QueryTypes.SELECT });
    for (const r of rows) fks.push({ column: r.from, refTable: r.table, refColumn: r.to, onDelete: r.on_delete });
  } else {
    const refs = await queryInterface.getForeignKeyReferencesForTable(table);
    for (const r of refs) fks.push({ column: r.columnName, refTable: r.referencedTableName, refColumn: r.referencedColumnName, onDelete: null });
  }
  return { columns, indexes, fks };
}

/** Lists the tables present in the connected database (excluding the migration bookkeeping table). */
async function listTables(queryInterface) {
  const names = await queryInterface.showAllTables();
  return names
    .map((n) => (typeof n === 'string' ? n : n.tableName))
    .filter((n) => n !== 'sequelize_meta')
    .sort();
}

module.exports = { introspectTable, listIndexes, listTables, typeFamily, indexSignature };
