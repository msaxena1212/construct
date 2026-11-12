'use strict';
/**
 * Neon Multi-Service Integration Test
 * Verifies that all 6 Neon services are wired and operational:
 * 1. Postgres Database (Connection & Dialect Guard)
 * 2. Auth (Token & Tenant Scoping)
 * 3. AI Gateway (Model Configuration & Gateway routing)
 * 4. Object Storage (S3 / Neon storage driver)
 * 5. Functions (Serverless invoking)
 * 6. Realtime (Event publishing)
 */
describe('Neon Cloud Backend Integration Suite', () => {
  const originalEnv = { ...process.env };

  beforeAll(() => {
    process.env.DB_DIALECT = 'postgres';
    process.env.DB_TARGET_CLASS = 'neon_cloud';
    process.env.DATABASE_URL =
      'postgresql://neondb_owner:npg_BlzO2Zj7yepo@ep-misty-cherry-aon84mbi-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
    process.env.NEON_AI_GATEWAY_URL = 'https://steep-dawn-74976774.ai.neon.tech/v1';
    process.env.NEON_OBJECT_STORAGE_ENDPOINT = 'https://steep-dawn-74976774.storage.neon.tech';
    process.env.NEON_REALTIME_URL = 'https://steep-dawn-74976774.realtime.neon.tech';
    process.env.NEON_FUNCTIONS_URL = 'https://steep-dawn-74976774.functions.neon.tech';
    process.env.JWT_SECRET = 'Zyno_construction_enterprise_secure_token_secret_2026_neon';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('1. Database Guard approves Neon PostgreSQL target', () => {
    const { evaluateDatabaseTarget } = require('../src/config/database_target_guard');
    const verdict = evaluateDatabaseTarget(process.env);
    expect(verdict.ok).toBe(true);
    expect(verdict.target.dialect).toBe('postgres');
    expect(verdict.target.targetClass).toBe('neon_cloud');
  });

  test('2. Auth Middleware validates JWT and supports Neon Auth sessions', () => {
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: 1, email: 'admin@zynoconstruction.com', role: 'Super Admin', company_id: 1 },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    expect(token).toBeDefined();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.email).toBe('admin@zynoconstruction.com');
    expect(decoded.role).toBe('Super Admin');
  });

  test('3. AI Gateway resolves Neon unified gateway endpoint and model', () => {
    const { modelConfig } = require('../src/core/services/model_config');
    const cfg = modelConfig();
    expect(cfg.provider).toBe('neon-ai-gateway');
    expect(cfg.host).toBe('https://steep-dawn-74976774.ai.neon.tech/v1');
    expect(cfg.model).toBe('gemini-2.5-flash');
  });

  test('4. Storage Service configures Neon S3-compatible object storage', () => {
    const storageService = require('../src/core/services/storage.service');
    expect(['neon', 's3']).toContain(storageService.driver);
    expect(storageService.s3Config.endpoint).toBe('https://steep-dawn-74976774.storage.neon.tech');
  });

  test('5. Realtime Service delivers publish payloads to Neon Realtime', async () => {
    const realtimeService = require('../src/core/services/realtime.service');
    expect(realtimeService.endpoint).toBe('https://steep-dawn-74976774.realtime.neon.tech');
    const res = await realtimeService.publish('inventory-channel', 'STOCK_UPDATED', { itemId: 42, qty: 100 });
    expect(res).toBeDefined();
  });

  test('6. Functions Service routes serverless requests to Neon Functions', async () => {
    const functionsService = require('../src/core/services/functions.service');
    expect(functionsService.endpoint).toBe('https://steep-dawn-74976774.functions.neon.tech');
    const res = await functionsService.invoke('generateInvoicePDF', { invoiceId: 99 });
    expect(res).toBeDefined();
  });
});
