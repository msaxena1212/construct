'use strict';
/**
 * The language model every AI feature uses (copilot, snag and DPR analysis, drawing summaries, BOQ parsing, the
 * briefing narrative). One place decides where the model is and how it is reached.
 *
 *   OLLAMA_API_KEY set  -> the Ollama cloud: OLLAMA_CLOUD_HOST (default https://ollama.com),
 *                          model OLLAMA_CLOUD_MODEL (default gemma4:31b), sent with a bearer token.
 *   no key              -> the local Ollama server: OLLAMA_HOST (default http://127.0.0.1:11434),
 *                          model OLLAMA_MODEL (default gemma4:31b-cloud), no token.
 *
 * The key is read from the environment only. It is never written to a file, a log or a response.
 */
const axios = require('axios');

function modelConfig() {
  const neonUrl = process.env.NEON_AI_GATEWAY_URL;
  if (process.env.AI_PROVIDER === 'neon' || neonUrl) {
    const key = String(process.env.NEON_AI_GATEWAY_API_KEY || '').trim();
    return {
      provider: 'neon-ai-gateway',
      host: String(neonUrl || 'https://steep-dawn-74976774.ai.neon.tech/v1').replace(/\/$/, ''),
      model: process.env.NEON_AI_MODEL || 'gemini-2.5-flash',
      headers: key ? { Authorization: `Bearer ${key}` } : {},
    };
  }
  const key = String(process.env.OLLAMA_API_KEY || '').trim();
  if (key) {
    return {
      provider: 'ollama-cloud',
      host: String(process.env.OLLAMA_CLOUD_HOST || 'https://ollama.com').replace(/\/$/, ''),
      model: process.env.OLLAMA_CLOUD_MODEL || 'gemma4:31b',
      headers: { Authorization: `Bearer ${key}` },
    };
  }
  return {
    provider: 'local-ollama',
    host: String(process.env.OLLAMA_HOST || 'http://127.0.0.1:11434').replace(/\/$/, ''),
    model: process.env.OLLAMA_MODEL || 'gemma4:31b-cloud',
    headers: {},
  };
}

/**
 * Optional fallback model, used only when the primary model cannot answer.
 *   GEMINI_API_KEY set -> Google Gemini: model GEMINI_MODEL (default gemini-3.8-flash), key sent in a header.
 * Returns null when no key is set. The key is read from the environment only.
 */
function fallbackConfig() {
  const key = String(process.env.GEMINI_API_KEY || '').trim();
  if (!key) return null;
  return {
    provider: 'gemini',
    host: String(process.env.GEMINI_HOST || 'https://generativelanguage.googleapis.com/v1beta').replace(/\/$/, ''),
    model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
    headers: { 'x-goog-api-key': key },
  };
}

/** Whether the configured model answers. Sends no prompt. */
async function modelStatus() {
  const cfg = modelConfig();
  try {
    await axios.get(`${cfg.host}/api/tags`, { headers: cfg.headers, timeout: 4000 });
    return { provider: cfg.provider, model: cfg.model, reachable: true, fallback: fallbackSummary() };
  } catch (err) {
    return {
      provider: cfg.provider,
      model: cfg.model,
      reachable: false,
      reason: err.response ? `HTTP ${err.response.status}` : 'no answer',
      fallback: fallbackSummary(),
    };
  }
}

/** The fallback's name and model only (never the key), or null. */
function fallbackSummary() {
  const fb = fallbackConfig();
  return fb ? { provider: fb.provider, model: fb.model } : null;
}

module.exports = { modelConfig, modelStatus, fallbackConfig };
