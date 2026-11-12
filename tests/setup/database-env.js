'use strict';
/**
 * Jest setup: explicit isolated database configuration for every test file.
 *
 * src/app.js loads .env through dotenv, which never overrides a key that already exists. The database
 * keys are therefore set here first, to the isolated in-memory SQLite target or to empty strings. A
 * production DB_HOST in .env can then never reach a test, and the database guard sees only the
 * isolated declaration.
 */
process.env.NODE_ENV = 'test';
process.env.DB_TARGET_CLASS = 'isolated_test';
process.env.DB_DIALECT = 'sqlite';
process.env.DB_STORAGE = ':memory:';
for (const key of ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_PORT', 'DB_TEST_CONFIRMED', 'DB_TEST_HOST_ALLOWLIST']) {
  process.env[key] = '';
}
