#!/usr/bin/env node
'use strict';
/**
 * Generates the canonical core schema baseline migration from the Sequelize model definitions.
 *
 * The generator runs only against an in-memory SQLite connection and never opens a database file.
 * It emits a static migration with explicit column, index and foreign-key definitions, so the
 * committed migration is reviewable and does not depend on the models at runtime.
 *
 * Scope rule: tables and columns that an existing migration creates or adds are excluded from the
 * baseline, because those migrations already own them. The baseline therefore covers the
 * foundation tables that the migration history never created.
 *
 * Usage:  node scripts/schema/generate-baseline.js            (writes the migration)
 *         node scripts/schema/generate-baseline.js --check    (fails if the file is stale)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const MIGRATIONS_DIR = path.join(ROOT, 'migrations');
const OUTPUT = path.join(MIGRATIONS_DIR, '20261001000000-canonical-core-schema-baseline.js');
const BASELINE_PREFIX = '20261001000000';

function assertInMemory() {
  // Fail closed: the generator must never point the models at a file or a remote host.
  if (process.env.DB_STORAGE && process.env.DB_STORAGE !== ':memory:') {
    throw new Error('generate-baseline refuses to run with DB_STORAGE set to a file path.');
  }
  process.env.DB_TARGET_CLASS = 'isolated_test';
  process.env.DB_DIALECT = 'sqlite';
  process.env.DB_STORAGE = ':memory:';
}

/** Scans the existing migrations (not the models) for ownership of tables, columns and indexes. */
function scanMigrations() {
  const owned = new Set();
  const addedColumns = new Set();
  const addedIndexes = new Map(); // table -> Set of joined field lists
  for (const file of fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith('.js')).sort()) {
    if (file.startsWith(BASELINE_PREFIX)) continue;
    const src = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
    // Migrations may hold the table name in a constant (const t = 'STOCK_REQUESTS'); resolve those too.
    const constants = new Map();
    for (const m of src.matchAll(/const\s+([A-Za-z_]+)\s*=\s*'([A-Za-z_]+)'/g)) constants.set(m[1], m[2]);
    const resolve = (token) => {
      const bare = token.replace(/['"]/g, '').trim();
      return /^['"]/.test(token) ? bare : constants.get(bare);
    };
    for (const m of src.matchAll(/createTable\(\s*['"]([A-Za-z_]+)['"]/g)) owned.add(m[1]);
    for (const m of src.matchAll(/addColumn\(\s*('[A-Za-z_]+'|"[A-Za-z_]+"|[A-Za-z_]+),\s*['"]([A-Za-z_]+)['"]/g)) {
      const table = resolve(m[1]);
      if (!table) throw new Error(`Cannot resolve addColumn table in ${file}: ${m[1]}`);
      addedColumns.add(`${table}.${m[2]}`);
    }
    for (const m of src.matchAll(/addIndex\(\s*('[A-Za-z_]+'|"[A-Za-z_]+"|[A-Za-z_]+),\s*\[([^\]]*)\]/g)) {
      const table = resolve(m[1]);
      if (!table) throw new Error(`Cannot resolve addIndex table in ${file}: ${m[1]}`);
      const fields = m[2].split(',').map((s) => s.trim().replace(/['"]/g, '')).join(',');
      if (!addedIndexes.has(table)) addedIndexes.set(table, new Set());
      addedIndexes.get(table).add(fields);
    }
  }
  return { owned, addedColumns, addedIndexes };
}

function describeType(t) {
  const key = t.key;
  const opts = t.options || {};
  switch (key) {
    case 'STRING':
      return opts.length ? { type: 'STRING', length: opts.length } : { type: 'STRING', length: 255 };
    case 'TEXT':
      return { type: 'TEXT' };
    case 'INTEGER':
      return t._unsigned ? { type: 'INTEGER', unsigned: true } : { type: 'INTEGER' };
    case 'TINYINT':
      return { type: 'TINYINT' };
    case 'BIGINT':
      return { type: 'BIGINT' };
    case 'FLOAT':
      return { type: 'FLOAT' };
    case 'DECIMAL':
      return { type: 'DECIMAL', precision: opts.precision || 10, scale: opts.scale || 0 };
    case 'BOOLEAN':
      return { type: 'BOOLEAN' };
    case 'DATE':
      return { type: 'DATE' };
    case 'DATEONLY':
      return { type: 'DATEONLY' };
    case 'JSON':
      return { type: 'JSON' };
    case 'ENUM':
      return { type: 'ENUM', values: [...t.values] };
    default:
      throw new Error(`Unsupported attribute type ${key} in baseline generation.`);
  }
}

function tableNameOf(modelOrName) {
  return typeof modelOrName === 'string' ? modelOrName : modelOrName.getTableName();
}

function describeDefault(value, skipped, where) {
  if (value === undefined) return undefined;
  if (value && typeof value === 'object' && value.constructor && value.constructor.name === 'NOW') return { now: true };
  if (value && typeof value === 'object' && value.constructor && value.constructor.name === 'Utils') {
    // Sequelize.NOW is a Utils.NOW instance in some versions
    if (String(value.key || value.constructor.key) === 'NOW') return { now: true };
  }
  if (value === null || typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') return value;
  // Object and array defaults are application-level only. MariaDB and MySQL reject defaults on JSON
  // and TEXT columns, so these are not written to the schema.
  skipped.push(where);
  return undefined;
}

function indexName(table, fields, unique) {
  const base = `${unique ? 'ux' : 'idx'}_${table}_${fields.join('_')}`.toLowerCase();
  if (base.length <= 60) return base;
  const crypto = require('crypto');
  const hash = crypto.createHash('sha1').update(base).digest('hex').slice(0, 8);
  return `${base.slice(0, 51)}_${hash}`;
}

function buildSpec() {
  assertInMemory();
  const db = require(path.join(ROOT, 'src/models'));
  const scan = scanMigrations();
  const skippedDefaults = [];
  const tables = {};

  for (const [, M] of Object.entries(db)) {
    if (!M || !M.rawAttributes || !M.getTableName) continue;
    const table = M.getTableName();
    if (scan.owned.has(table)) continue;

    const columns = {};
    const indexes = [];
    const uniqueGroups = new Map();

    for (const [key, attr] of Object.entries(M.rawAttributes)) {
      const col = attr.field || key;
      if (scan.addedColumns.has(`${table}.${col}`)) continue;
      const def = { ...describeType(attr.type) };
      def.allowNull = attr.allowNull !== false;
      if (attr.primaryKey) { def.primaryKey = true; def.allowNull = false; }
      if (attr.autoIncrement) def.autoIncrement = true;
      const dv = describeDefault(attr.defaultValue, skippedDefaults, `${table}.${col}`);
      if (dv !== undefined) def.defaultValue = dv;
      if (attr.references) {
        def.references = {
          table: tableNameOf(attr.references.model),
          key: attr.references.key || 'id',
          onDelete: attr.onDelete || 'SET NULL',
          onUpdate: attr.onUpdate || 'CASCADE',
        };
      }
      if (attr.unique === true) indexes.push({ name: indexName(table, [col], true), fields: [col], unique: true });
      else if (typeof attr.unique === 'string') {
        if (!uniqueGroups.has(attr.unique)) uniqueGroups.set(attr.unique, []);
        uniqueGroups.get(attr.unique).push(col);
      }
      columns[col] = def;
    }

    for (const [name, fields] of uniqueGroups) {
      indexes.push({ name, fields, unique: true });
    }
    for (const idx of M.options.indexes || []) {
      const fields = idx.fields.map((f) => (typeof f === 'string' ? f : f.name));
      if (scan.addedIndexes.has(table) && scan.addedIndexes.get(table).has(fields.join(','))) continue;
      indexes.push({
        name: idx.name && !idx.name.startsWith('idx_') ? idx.name : indexName(table, fields, !!idx.unique),
        fields,
        unique: !!idx.unique,
      });
    }

    tables[table] = { columns, indexes };
  }
  return { tables, skippedDefaults };
}

/** Orders tables so that every referenced table is created before the table that references it. */
function orderTables(tables) {
  const order = [];
  const state = {};
  const visit = (t, stack) => {
    if (state[t] === 'done') return;
    if (state[t] === 'active') throw new Error(`Foreign-key cycle involving ${stack.concat(t).join(' -> ')}`);
    state[t] = 'active';
    for (const def of Object.values(tables[t].columns)) {
      if (def.references && def.references.table !== t) {
        if (!tables[def.references.table]) {
          throw new Error(`${t}.${Object.keys(tables[t].columns).find((c) => tables[t].columns[c] === def)} references ${def.references.table}, which is not in the baseline.`);
        }
        visit(def.references.table, stack.concat(t));
      }
    }
    state[t] = 'done';
    order.push(t);
  };
  for (const t of Object.keys(tables).sort()) visit(t, []);
  return order;
}

function render(spec) {
  const order = orderTables(spec.tables);
  const body = JSON.stringify({ order, tables: spec.tables }, null, 2);
  return `'use strict';
/**
 * GENERATED FILE. Do not edit by hand.
 * Source: scripts/schema/generate-baseline.js (run it to regenerate; it is checked with --check).
 *
 * Canonical core schema baseline for FRESH installations. It creates the foundation tables that the
 * migration history never created. Tables and columns already created or added by later migrations
 * are excluded here, so those migrations apply unchanged.
 *
 * Existing databases must NOT run this file blindly. Use scripts/schema/adopt-report.js first.
 * The migrator refuses to apply this baseline when any of its tables already exists.
 */

// Plain descriptor data, readable without Sequelize. up() translates it to query-interface calls.
const SPEC = ${body};

function toSequelizeType(Sequelize, d) {
  switch (d.type) {
    case 'STRING': return Sequelize.STRING(d.length);
    case 'TEXT': return Sequelize.TEXT;
    case 'INTEGER': return d.unsigned ? Sequelize.INTEGER.UNSIGNED : Sequelize.INTEGER;
    case 'TINYINT': return Sequelize.TINYINT;
    case 'BIGINT': return Sequelize.BIGINT;
    case 'FLOAT': return Sequelize.FLOAT;
    case 'DECIMAL': return Sequelize.DECIMAL(d.precision, d.scale);
    case 'BOOLEAN': return Sequelize.BOOLEAN;
    case 'DATE': return Sequelize.DATE;
    case 'DATEONLY': return Sequelize.DATEONLY;
    case 'JSON': return Sequelize.JSON;
    case 'ENUM': return Sequelize.ENUM(...d.values);
    default: throw new Error('Unknown baseline type ' + d.type);
  }
}

function toColumn(Sequelize, d) {
  const col = { type: toSequelizeType(Sequelize, d), allowNull: d.allowNull };
  if (d.primaryKey) col.primaryKey = true;
  if (d.autoIncrement) col.autoIncrement = true;
  if (d.defaultValue !== undefined) {
    col.defaultValue = d.defaultValue && d.defaultValue.now ? Sequelize.literal('CURRENT_TIMESTAMP') : d.defaultValue;
  }
  if (d.references) {
    col.references = { model: d.references.table, key: d.references.key };
    col.onDelete = d.references.onDelete;
    col.onUpdate = d.references.onUpdate;
  }
  return col;
}

module.exports = {
  SPEC,
  tableOrder: SPEC.order,

  async up(queryInterface, Sequelize, transaction) {
    for (const table of SPEC.order) {
      const { columns, indexes } = SPEC.tables[table];
      const attributes = {};
      for (const [name, d] of Object.entries(columns)) attributes[name] = toColumn(Sequelize, d);
      await queryInterface.createTable(table, attributes, { transaction });
      for (const idx of indexes) {
        await queryInterface.addIndex(table, idx.fields, { name: idx.name, unique: idx.unique, transaction });
      }
    }
  },

  async down(queryInterface, Sequelize, transaction) {
    for (const table of [...SPEC.order].reverse()) {
      await queryInterface.dropTable(table, { transaction });
    }
  },
};
`;
}

function main() {
  const spec = buildSpec();
  const text = render(spec);
  if (process.argv.includes('--check')) {
    const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf8') : '';
    if (current !== text) {
      console.error('Baseline migration is stale. Run: node scripts/schema/generate-baseline.js');
      process.exit(1);
    }
    console.log(`Baseline migration is current (${Object.keys(spec.tables).length} tables).`);
    return;
  }
  fs.writeFileSync(OUTPUT, text, 'utf8');
  console.log(`Wrote ${path.relative(ROOT, OUTPUT)}: ${Object.keys(spec.tables).length} tables.`);
  if (spec.skippedDefaults.length) console.log(`Object/array defaults left to the application: ${spec.skippedDefaults.join(', ')}`);
}

if (require.main === module) main();

module.exports.buildSpec = buildSpec;
module.exports.scanMigrations = scanMigrations;
module.exports.orderTables = orderTables;
