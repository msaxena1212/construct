'use strict';
/**
 * AI must not invent results. These tests prove that:
 *   - when the model cannot answer, no simulated or canned text reaches a response or a stored record;
 *   - the model is reached through one configuration (the Ollama cloud with a key, otherwise the local server);
 *   - the copilot's prompt carries the project's real records from the database, and says which records are missing.
 * The model itself is replaced by a test double (axios is spied on), so these tests need no network.
 * In-memory SQLite (tests/setup).
 */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models');
const aiService = require('../src/core/services/ai.service');
const { modelConfig } = require('../src/core/services/model_config');

const tok = (u) => `Bearer ${jwt.sign({ id: u.id }, process.env.JWT_SECRET)}`;
const SRC = path.resolve(__dirname, '../src');

// The describe blocks below share one database, built by the copilot block and used by the last block.
afterAll(async () => {
  await db.sequelize.close();
});
const ENV_KEYS = ['OLLAMA_API_KEY', 'OLLAMA_CLOUD_HOST', 'OLLAMA_CLOUD_MODEL', 'OLLAMA_HOST', 'OLLAMA_MODEL'];

/** Model answer as the Ollama API returns it. */
const modelAnswer = (text) => Promise.resolve({ data: { response: text } });
/** The model cannot be reached. */
const modelDown = () => Promise.reject(Object.assign(new Error('connect ECONNREFUSED 127.0.0.1:11434'), { code: 'ECONNREFUSED' }));

describe('the AI service never returns an invented answer', () => {
  let saved;
  beforeEach(() => {
    saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
    for (const k of ENV_KEYS) delete process.env[k];
    process.env.OLLAMA_HOST = 'http://127.0.0.1:9';
  });
  afterEach(() => {
    jest.restoreAllMocks();
    for (const k of ENV_KEYS) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
  });

  test('when the model cannot be reached, generateCompletion throws and returns no text', async () => {
    jest.spyOn(axios, 'post').mockImplementation(modelDown);
    const err = await aiService.generateCompletion({ prompt: 'Summarise.', responseFormat: 'text' }).catch((e) => e);
    expect(err).toBeInstanceOf(aiService.AIUnavailableError);
    expect(err.status).toBe(503);
    expect(err.message).toContain('Nothing was generated');
    expect(err.message).not.toMatch(/Analysis completed/);
  });

  test('an empty answer is an error, not a result', async () => {
    jest.spyOn(axios, 'post').mockImplementation(() => modelAnswer('   '));
    await expect(aiService.generateCompletion({ prompt: 'x', responseFormat: 'text' })).rejects.toMatchObject({ code: 'AI_EMPTY' });
  });

  test('a JSON request that returns something else is an error, so nothing is saved from it', async () => {
    jest.spyOn(axios, 'post').mockImplementation(() => modelAnswer('Sure, here is your answer.'));
    await expect(aiService.generateCompletion({ prompt: 'x', responseFormat: 'json' })).rejects.toMatchObject({ code: 'AI_INVALID_JSON' });
  });

  test('a valid JSON answer is returned as the model wrote it, including a fenced block', async () => {
    jest.spyOn(axios, 'post').mockImplementation(() => modelAnswer('```json\n{"title":"Honeycomb at C-4"}\n```'));
    await expect(aiService.generateCompletion({ prompt: 'x', responseFormat: 'json' })).resolves.toEqual({ title: 'Honeycomb at C-4' });
  });

  test('the simulator and its canned texts are gone from the source', () => {
    const files = [
      'core/services/ai.service.js',
      'modules/projects/controllers/copilot.controller.js',
      'modules/projects/controllers/snag.controller.js',
      'modules/projects/controllers/dpr.controller.js',
      'modules/projects/controllers/drawing.controller.js',
      'modules/projects/controllers/boq.controller.js',
    ];
    const banned = ['Analysis completed based on', '_fallbackResponse', 'generateRichFallback', 'pressure test line to 6 bar', 'Motor grader control handle', 'site-record'];
    for (const f of files) {
      const text = fs.readFileSync(path.join(SRC, f), 'utf8');
      for (const phrase of banned) {
        expect({ file: f, has: text.includes(phrase) }).toEqual({ file: f, has: false });
      }
    }
  });
});

describe('one model configuration for every AI feature', () => {
  let saved;
  beforeEach(() => {
    saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
    for (const k of ENV_KEYS) delete process.env[k];
  });
  afterEach(() => {
    jest.restoreAllMocks();
    for (const k of ENV_KEYS) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
  });

  test('with a key, requests go to the Ollama cloud with a bearer token', async () => {
    process.env.OLLAMA_API_KEY = 'test-key-not-real';
    const spy = jest.spyOn(axios, 'post').mockImplementation(() => modelAnswer('ok'));
    await aiService.generateCompletion({ prompt: 'x', responseFormat: 'text' });
    const [url, body, options] = spy.mock.calls[0];
    expect(url).toBe('https://ollama.com/api/generate');
    expect(body.model).toBe('gemma4:31b');
    expect(options.headers.Authorization).toBe('Bearer test-key-not-real');
    expect(modelConfig()).toMatchObject({ provider: 'ollama-cloud', model: 'gemma4:31b' });
  });

  test('without a key, requests go to the local server and carry no token', async () => {
    process.env.OLLAMA_HOST = 'http://127.0.0.1:11434';
    const spy = jest.spyOn(axios, 'post').mockImplementation(() => modelAnswer('ok'));
    await aiService.generateCompletion({ prompt: 'x', responseFormat: 'text' });
    const [url, , options] = spy.mock.calls[0];
    expect(url).toBe('http://127.0.0.1:11434/api/generate');
    expect(options.headers.Authorization).toBeUndefined();
    expect(modelConfig()).toMatchObject({ provider: 'local-ollama', model: 'gemma4:31b-cloud' });
  });
});

describe('the copilot answers from the database, through the model', () => {
  let company;
  let user;
  let project;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    const mod = await db.rbac_module.create({ name: 'projects', path: 'projects', title: 'Projects' });
    company = await db.company.create({ name: 'Kestrel Build', email: 'grounding@kestrel.test' });
    const role = await db.role.create({ name: 'Planner', type: 'custom', company_id: company.id });
    await db.role_permission.create({ role_id: role.id, module_id: mod.id, can_create: true, can_read: true, can_update: true, can_delete: true });
    user = await db.user.create({ firstname: 'Ira', lastname: 'Pawar', email: 'ira@kestrel.test', company_id: company.id, role_id: role.id });

    project = await db.project.create({ name: 'Hinjewadi Test Tower', type: 'residential', company_id: company.id, budget_total: 45000000, progress: 52 });
    const budget = await db.budget.create({ company_id: company.id, project_id: project.id, revision_number: 1, status: 'approved', total_budget_amount: 45000000 });
    const head = await db.budget_head.create({ company_id: company.id, project_id: project.id, head_code: 'STRUCT', head_name: 'Structure', status: 'active' });
    await db.budget_head_allocation.create({ company_id: company.id, project_id: project.id, budget_id: budget.id, budget_head_id: head.id, allocated_amount: 22500000 });
    await db.milestone.create({ project_id: project.id, name: 'Superstructure (G+14)', startDate: '2025-07-01', endDate: '2026-10-31', progress: 70 });
    await db.snag_item.create({ project_id: project.id, company_id: company.id, title: 'Honeycombing at column C-4', severity: 'high', status: 'open' });
    await db.cost_ledger.create({ company_id: company.id, project_id: project.id, cost_category: 'subcontractor', source_type: 'TEST', source_id: 1, recognition_date: '2026-10-31', amount: 2200000, budget_head_id: head.id, idempotency_key: 'GROUNDING-COST-1' });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('the prompt the model receives contains the project records read from the database', async () => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(() => modelAnswer('The superstructure is at 70 per cent.'));
    const res = await request(app)
      .post('/api/v1/copilot/query')
      .set('Authorization', tok(user))
      .send({ project_id: project.id, question: 'What is the superstructure progress and the open snags?' });
    expect(res.status).toBe(200);
    expect(res.body.data.answer).toBe('The superstructure is at 70 per cent.');

    const prompt = spy.mock.calls[0][1].prompt;
    expect(prompt).toContain('Project Records');
    expect(prompt).toContain('Hinjewadi Test Tower');
    expect(prompt).toContain('Superstructure (G+14)');
    expect(prompt).toContain('Honeycombing at column C-4');
    expect(prompt).toContain('"budget_total": 45000000');
    expect(prompt).toContain('"recognized_cost": 2200000');
    expect(prompt).toContain('"unavailable_sections"');
  });

  test('a record that cannot be read is named to the model, not left out', async () => {
    jest.spyOn(db.snag_item, 'findAll').mockRejectedValueOnce(new Error('snag table unreadable'));
    const spy = jest.spyOn(axios, 'post').mockImplementation(() => modelAnswer('The snag records are not available.'));
    const res = await request(app)
      .post('/api/v1/copilot/query')
      .set('Authorization', tok(user))
      .send({ project_id: project.id, question: 'How many open snags are there?' });
    expect(res.status).toBe(200);
    expect(res.body.data.records.unavailable_sections.map((s) => s.section)).toContain('snags');
    expect(spy.mock.calls[0][1].prompt).toContain('snag table unreadable');
  });

  test('when the model is down, the query answers 503 with no answer text, and nothing is invented', async () => {
    jest.spyOn(axios, 'post').mockImplementation(modelDown);
    const res = await request(app)
      .post('/api/v1/copilot/query')
      .set('Authorization', tok(user))
      .send({ project_id: project.id, question: 'What is the cost performance index?' });
    expect(res.status).toBe(503);
    expect(res.body.status).toBe('unavailable');
    expect(res.body.data.answer).toBeNull();
    expect(JSON.stringify(res.body)).not.toMatch(/Analysis completed/);
  });

  test('the stream ends with the reason when the model is down, never with a stock sentence', async () => {
    jest.spyOn(axios, 'post').mockImplementation(modelDown);
    const res = await request(app)
      .post('/api/v1/copilot/stream')
      .set('Authorization', tok(user))
      .send({ project_id: project.id, question: 'Give me the EVM summary' });
    expect(res.status).toBe(200);
    expect(res.text).toContain('"error"');
    expect(res.text).toContain('did not answer');
    expect(res.text).not.toMatch(/Analysis completed|designed to assist with construction project management/);
  });

  test('a question without a project is answered from every project of the company, through the model', async () => {
    await db.project.create({ name: 'Baner Office Park', type: 'commercial', company_id: company.id, budget_total: 12000000, progress: 20 });
    const spy = jest.spyOn(axios, 'post').mockImplementation(() => modelAnswer('Two projects are on the register.'));
    const res = await request(app).post('/api/v1/copilot/query').set('Authorization', tok(user)).send({ question: 'Give me the status of all my projects' });
    expect(res.status).toBe(200);
    expect(res.body.data.answer).toBe('Two projects are on the register.');
    const prompt = spy.mock.calls[0][1].prompt;
    expect(prompt).toContain('Portfolio Records');
    expect(prompt).toContain('Hinjewadi Test Tower');
    expect(prompt).toContain('Baner Office Park');
    expect(prompt).not.toContain('"section":');
  });

  test('the stream without a project reaches the model as well, and never asks for a project', async () => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(modelDown);
    const res = await request(app).post('/api/v1/copilot/stream').set('Authorization', tok(user)).send({ question: 'Which projects have open snags?' });
    expect(res.status).toBe(200);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][1].prompt).toContain('Portfolio Records');
    expect(res.text).not.toContain('select a project first');
    expect(res.text).toContain('did not answer');
  });
});

describe('snag voice analysis and DPR never store an invented result', () => {
  let company;
  let user;
  let project;

  beforeAll(async () => {
    // The fixture for this block is created on the shared database from the block above.
    company = await db.company.findOne({ where: { email: 'grounding@kestrel.test' } });
    user = await db.user.findOne({ where: { email: 'ira@kestrel.test' } });
    project = await db.project.findOne({ where: { name: 'Hinjewadi Test Tower' } });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('voice analysis with the model down answers 503 and returns no classification', async () => {
    jest.spyOn(axios, 'post').mockImplementation(modelDown);
    const res = await request(app).post('/api/v1/snags/analyze-voice').set('Authorization', tok(user)).send({ text: 'crack near the lift lobby' });
    expect(res.status).toBe(503);
    expect(res.body.data).toBeNull();
    expect(JSON.stringify(res.body)).not.toMatch(/Analysis completed/);
  });

  test('voice analysis whose answer lacks a title is refused, not filled in', async () => {
    jest.spyOn(axios, 'post').mockImplementation(() => modelAnswer('{"description":"something"}'));
    const res = await request(app).post('/api/v1/snags/analyze-voice').set('Authorization', tok(user)).send({ text: 'crack near the lift lobby' });
    expect(res.status).toBe(422);
    expect(res.body.data).toBeNull();
  });

  test('voice analysis with a usable answer returns the model\'s fields, marked as AI', async () => {
    jest.spyOn(axios, 'post').mockImplementation(() =>
      modelAnswer(JSON.stringify({ title: 'Plaster crack near lift lobby', description: 'Reported crack in plaster.', trade: 'Finishing', severity: 'medium', location_pin: 'Level 3', tags: ['plaster', 'crack'] }))
    );
    const res = await request(app).post('/api/v1/snags/analyze-voice').set('Authorization', tok(user)).send({ text: 'crack near the lift lobby' });
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ title: 'Plaster crack near lift lobby', trade: 'Finishing', source: 'ai', tags: ['plaster', 'crack'] });
  });

  test('a DPR saved while the model is down keeps an empty AI summary, and the weather is never assumed', async () => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(modelDown);
    const res = await request(app)
      .post('/api/v1/dpr/create')
      .set('Authorization', tok(user))
      .send({ project_id: project.id, report_date: '2026-11-08', work_summary: 'Shuttering for level 10 started.' });
    expect(res.status).toBeLessThan(300);
    const dpr = await db.dpr.findOne({ where: { project_id: project.id, report_date: '2026-11-08' } });
    expect(dpr.ai_executive_summary).toBeNull();
    expect(spy.mock.calls[0][1].prompt).toContain('Weather: Not recorded');
    expect(spy.mock.calls[0][1].prompt).not.toContain('Weather: Clear');
  });
});
