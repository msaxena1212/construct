#!/usr/bin/env node
'use strict';
/**
 * READ-ONLY adoption report for an existing database.
 *
 * Compares a live database with the canonical schema (scripts/schema/canonical-schema.json, which is the
 * result of applying every migration to an empty database). It reports differences and an adoption plan.
 * It never creates, alters, stamps or deletes anything. Migration bookkeeping is read only if present;
 * the sequelize_meta table is not created.
 *
 * Usage:  node scripts/schema/adopt-report.js [--out <report.md>] [--json <report.json>]
 * Target: the same DB_DIALECT / DB_STORAGE / DB_HOST settings the application uses.
 */
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { introspectTable, listTables, indexSignature } = require('./introspect');
const { assertDatabaseTarget } = require('../../src/config/database_target_guard');
const { resolveApprovedSqlitePath } = require('../../src/config/sqlite_policy');

const CANONICAL = path.join(__dirname, 'canonical-schema.json');
const MIGRATIONS_DIR = path.join(__dirname, '../../migrations');
const BASELINE = '20261001000000-canonical-core-schema-baseline.js';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 2) out[argv[i].replace(/^--/, '')] = argv[i + 1];
  return out;
}

function connect(env) {
  // SQLite only. The storage path has already passed assertDatabaseTarget (approved root, drive E:).
  if (env.DB_DIALECT !== 'sqlite') throw new Error('SQLite is the only permitted database dialect.');
  return new Sequelize({ dialect: 'sqlite', storage: resolveApprovedSqlitePath(env.DB_STORAGE), logging: false });
}

/** Read-only check that the target's migration record exists. Never creates the table. */
async function appliedMigrations(sequelize) {
  const names = (await sequelize.getQueryInterface().showAllTables()).map((n) => (typeof n === 'string' ? n : n.tableName));
  if (!names.includes('sequelize_meta')) return null;
  const rows = await sequelize.query('SELECT name FROM sequelize_meta', { type: sequelize.QueryTypes.SELECT });
  return rows.map((r) => r.name).sort();
}

/** Counts rows in a child table that would violate a foreign key that is not yet present. */
async function orphanCount(sequelize, fk, table) {
  // The parent table or column may be absent in an older database; that is reported as a missing table, not counted here.

  const q = (sql) => sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
  const [row] = await q(
    `SELECT COUNT(*) AS n FROM \`${table}\` c WHERE c.\`${fk.column}\` IS NOT NULL ` +
      `AND NOT EXISTS (SELECT 1 FROM \`${fk.refTable}\` p WHERE p.\`${fk.refColumn}\` = c.\`${fk.column}\`)`
  );
  return Number(row.n);
}

/** Declared SQL types are compared without case or spacing differences. */
function normType(t) {
  return String(t || '').toUpperCase().replace(/\s+/g, '');
}

/** An absent default and a NULL default are the same. */
function normDefault(v) {
  return v === undefined || v === null ? null : String(v);
}

/**
 * The single comparison rule used by the adoption report, the canonical-snapshot test and the model oracle.
 *  - Columns: presence, family, declared type text, nullability, primary key and default expression.
 *  - Indexes: definitions (uniqueness, partial condition, ordered columns, sort order, collation) compared as a
 *    multiset. With options.names, the index name is compared too (used against the canonical snapshot, which
 *    the migrations produce; the model oracle compares definitions only).
 *  - Foreign keys: column, referenced table and column, and ON DELETE action.
 *  - Objects present in the database but not in the expected schema are reported as EXTRA_*, not ignored.
 */
function diffTable(expected, actual, options = {}) {
  const issues = [];
  for (const c of Object.keys(expected.columns)) {
    if (!actual.columns[c]) {
      issues.push({ kind: 'MISSING_COLUMN', detail: c });
      continue;
    }
    const e = expected.columns[c], a = actual.columns[c];
    if (e.family !== a.family) issues.push({ kind: 'TYPE_MISMATCH', detail: `${c}: expected ${e.family}, found ${a.family}` });
    if (e.declaredType !== undefined && normType(e.declaredType) !== normType(a.declaredType)) {
      issues.push({ kind: 'TYPE_DECLARATION_MISMATCH', detail: `${c}: expected ${e.declaredType}, found ${a.declaredType}` });
    }
    if (e.allowNull !== a.allowNull) issues.push({ kind: 'NULLABILITY_MISMATCH', detail: `${c}: expected allowNull=${e.allowNull}` });
    if (e.primaryKey !== a.primaryKey) issues.push({ kind: 'PRIMARY_KEY_MISMATCH', detail: c });
    if (e.defaultValue !== undefined && normDefault(e.defaultValue) !== normDefault(a.defaultValue)) {
      issues.push({ kind: 'DEFAULT_MISMATCH', detail: `${c}: expected ${normDefault(e.defaultValue)}, found ${normDefault(a.defaultValue)}` });
    }
  }
  for (const c of Object.keys(actual.columns)) if (!expected.columns[c]) issues.push({ kind: 'EXTRA_COLUMN', detail: c });

  const indexKey = options.names ? (i) => `${i.name}: ${indexSignature(i)}` : indexSignature;
  const countOf = (list) => list.reduce((m, i) => m.set(indexKey(i), (m.get(indexKey(i)) || 0) + 1), new Map());
  const want = countOf(expected.indexes);
  const have = countOf(actual.indexes);
  for (const [k, n] of want) if ((have.get(k) || 0) < n) issues.push({ kind: 'MISSING_INDEX', detail: k });
  for (const [k, n] of have) if ((want.get(k) || 0) < n) issues.push({ kind: 'EXTRA_INDEX', detail: k });

  const fkKey = (f) => `${f.column}->${f.refTable}.${f.refColumn} ON DELETE ${String(f.onDelete || 'NO ACTION').toUpperCase()}`;
  const haveFk = new Set(actual.fks.map(fkKey));
  const wantFk = new Set(expected.fks.map(fkKey));
  for (const f of expected.fks) if (!haveFk.has(fkKey(f))) issues.push({ kind: 'MISSING_FOREIGN_KEY', detail: fkKey(f), fk: f });
  for (const f of actual.fks) if (!wantFk.has(fkKey(f))) issues.push({ kind: 'EXTRA_FOREIGN_KEY', detail: fkKey(f) });
  return issues;
}

async function run(env, opts) {
  assertDatabaseTarget(env); // refuses undeclared or production targets before any connection
  const canonical = JSON.parse(fs.readFileSync(CANONICAL, 'utf8'));
  const sequelize = connect(env);
  const report = {
    target: { dialect: env.DB_DIALECT || 'sqlite', storage: env.DB_DIALECT === 'sqlite' ? path.basename(env.DB_STORAGE || ':memory:') : env.DB_NAME, host: env.DB_HOST ? '(set)' : null },
    verdict: null,
    migrations: {},
    tables: { missing: [], extra: [] },
    issues: {},
    orphans: [],
    plan: [],
  };
  try {
    const qi = sequelize.getQueryInterface();
    const actualTables = await listTables(qi);
    const expectedTables = Object.keys(canonical.tables).sort();
    report.tables.missing = expectedTables.filter((t) => !actualTables.includes(t));
    report.tables.extra = actualTables.filter((t) => !expectedTables.includes(t));

    const applied = await appliedMigrations(sequelize);
    const expectedMigrations = canonical.migrations;
    report.migrations = {
      recorded: applied,
      expected: expectedMigrations,
      notRecorded: applied ? expectedMigrations.filter((m) => !applied.includes(m)) : expectedMigrations,
    };

    const present = expectedTables.filter((t) => actualTables.includes(t));
    for (const table of present) {
      const actual = await introspectTable(qi, table);
      const issues = diffTable(canonical.tables[table], actual, { names: true });
      if (issues.length) report.issues[table] = issues;
      for (const issue of issues) {
        if (issue.kind === 'MISSING_FOREIGN_KEY' && actualTables.includes(issue.fk.refTable)) {
          const n = await orphanCount(sequelize, issue.fk, table);
          if (n > 0) report.orphans.push({ table, fk: issue.detail, orphanRows: n });
        }
      }
    }

    const baselineTables = canonical.baselineTables;
    const baselinePresent = baselineTables.filter((t) => actualTables.includes(t));
    if (actualTables.length === 0) report.verdict = 'EMPTY_DATABASE: run npm run migrate (fresh install).';
    else if (Object.keys(report.issues).length === 0 && report.tables.missing.length === 0 && report.migrations.notRecorded.length === 0) {
      report.verdict = 'MATCHES_CANONICAL: no differences found.';
    } else if (baselinePresent.length > 0 && !(applied || []).includes(BASELINE)) {
      report.verdict = 'ADOPTION_REQUIRED: baseline tables exist but the baseline is not recorded. Do not run migrations until the plan below is approved.';
    } else {
      report.verdict = 'DIFFERENCES_FOUND: review the issues before applying any migration.';
    }

    report.plan = [
      'Take and verify a backup of the target database. Record its checksum.',
      'Review every MISSING_TABLE, MISSING_COLUMN, TYPE_MISMATCH and NULLABILITY_MISMATCH entry. Each needs an owner decision.',
      report.orphans.length
        ? `Resolve ${report.orphans.length} foreign-key violation(s) listed under "Orphan rows" before the constraint migration can be applied.`
        : 'No foreign-key violations were found in existing rows.',
      'Get explicit written approval for each shared or production migration. No automatic stamping of migrations.',
      'Apply the approved migrations to a restored copy first and rerun this report there.',
      'Only then apply to the target, with the migration preflight and recorded approvals.',
    ];
  } finally {
    await sequelize.close();
  }
  return report;
}

function toMarkdown(r) {
  const lines = [];
  lines.push('# Existing database adoption report', '', `Read-only. Generated ${new Date().toISOString()}.`, '');
  lines.push(`- Target: ${r.target.dialect} (${r.target.storage || 'n/a'})`, `- Verdict: **${r.verdict}**`, '');
  lines.push('## Migrations', '', `- Recorded: ${r.migrations.recorded ? r.migrations.recorded.length : 'no sequelize_meta table'}`);
  lines.push(`- Not recorded (${r.migrations.notRecorded.length}): ${r.migrations.notRecorded.join(', ') || 'none'}`, '');
  lines.push('## Tables', '', `- Missing from target (${r.tables.missing.length}): ${r.tables.missing.join(', ') || 'none'}`);
  lines.push(`- Not in canonical schema (${r.tables.extra.length}, informational): ${r.tables.extra.join(', ') || 'none'}`, '');
  lines.push('## Differences by table', '');
  const entries = Object.entries(r.issues);
  if (!entries.length) lines.push('None.');
  for (const [t, issues] of entries) {
    lines.push(`### ${t}`);
    for (const i of issues) lines.push(`- ${i.kind}: ${i.detail}`);
    lines.push('');
  }
  lines.push('## Orphan rows (would block a foreign key)', '');
  lines.push(r.orphans.length ? r.orphans.map((o) => `- ${o.table}: ${o.fk} — ${o.orphanRows} row(s)`).join('\n') : 'None.');
  lines.push('', '## Adoption plan (requires approval)', '');
  r.plan.forEach((p, i) => lines.push(`${i + 1}. ${p}`));
  lines.push('');
  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const report = await run(process.env, args);
  const md = toMarkdown(report);
  if (args.out) fs.writeFileSync(args.out, md, 'utf8');
  if (args.json) fs.writeFileSync(args.json, JSON.stringify(report, null, 2), 'utf8');
  console.log(md);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('adopt-report failed:', err.message);
    process.exit(1);
  });
}

module.exports = { run, toMarkdown, diffTable };
