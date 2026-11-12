#!/usr/bin/env node
'use strict';
require('dotenv').config();
const { spawnSync } = require('child_process');
const mysql = require('mysql2/promise');

/**
 * CI/Test script to execute integration tests against a real MySQL 8.0 instance.
 * Requirements:
 * - Isolated test database and dedicated credentials
 * - Pre-flight connection & readiness checks
 * - Environment safety guard (fail closed if targeting production or missing MySQL params)
 * - Migration execution up and down
 * - Test execution under DB_DIALECT=mysql
 */
async function run() {
  console.log('=== MySQL Integration CI Pre-flight Verification ===');

  const {
    DB_HOST = 'localhost',
    DB_PORT = 3306,
    DB_NAME = 'zyno_test_db',
    DB_USER = 'test_user',
    DB_PASSWORD = 'test_password',
    NODE_ENV,
  } = process.env;

  // Safety Guard: fail closed unless the target is explicitly confirmed as an isolated test database.
  // Same rule as src/config/db.js, so the CI runner and the Jest suite cannot disagree.
  const { evaluateTestTarget } = require('../src/config/db_target_guard');
  // Application-level guard: declared isolated_test target, disposable name, explicit confirmation.
  require('../src/config/database_target_guard').assertDatabaseTarget(process.env);
  const verdict = evaluateTestTarget({ host: DB_HOST, database: DB_NAME, confirmed: process.env.DB_TEST_CONFIRMED });
  if (!verdict.ok) {
    console.error(`FATAL: Test execution safety guard blocked this target (host: ${DB_HOST}, database: ${DB_NAME}).`);
    console.error(`Reason: ${verdict.reason}`);
    console.error('Set DB_TEST_CONFIRMED=true, DB_TEST_HOST_ALLOWLIST for remote CI hosts, and a test database name (e.g., zyno_test_db).');
    process.exit(1);
  }

  console.log(`Connecting to MySQL host: ${DB_HOST}:${DB_PORT}, Database: ${DB_NAME}, User: ${DB_USER}`);

  let connection;
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      connectTimeout: 5000,
    });
    console.log('Database readiness check PASSED: Successfully connected to MySQL.');
    await connection.end();
  } catch (err) {
    console.error('Database readiness check FAILED: Unable to establish connection to MySQL daemon.');
    console.error(`Error details: ${err.message}`);
    console.error('MySQL integration testing remains BLOCKED [B] until a real MySQL 8.0 service is available.');
    process.exit(1);
  }

  // Set explicit MySQL test dialect
  process.env.DB_DIALECT = 'mysql';
  process.env.NODE_ENV = 'test';

  console.log('\nRunning database migrations on MySQL...');
  const migResult = spawnSync('node', ['scripts/migrate.js', 'up'], {
    stdio: 'inherit',
    env: { ...process.env, DB_DIALECT: 'mysql' },
  });
  if (migResult.status !== 0) {
    console.error('MySQL migration execution FAILED.');
    process.exit(migResult.status || 1);
  }

  console.log('\nRunning Jest test suite against MySQL...');
  const testResult = spawnSync('npx', ['jest', '--runInBand', '--forceExit'], {
    stdio: 'inherit',
    env: { ...process.env, DB_DIALECT: 'mysql' },
  });

  process.exit(testResult.status || 0);
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal CI runner error:', err);
    process.exit(1);
  });
}
