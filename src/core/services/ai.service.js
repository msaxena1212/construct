/**
 * AI service: the only path from the application to the language model (see model_config.js for where it is).
 *
 * It never produces a simulated or placeholder answer. When the model cannot answer, or answers with nothing usable,
 * it throws AIUnavailableError. Every caller must then store nothing it would have generated, and tell the user that
 * the AI step did not run. The previous simulator returned fixed sentences as if they were analysis; that is removed.
 */
const axios = require('axios');
const { modelConfig, fallbackConfig } = require('./model_config');

const DEFAULT_SYSTEM = 'You are an intelligent construction management AI assistant. Always output valid JSON without conversational wrapper when JSON is requested.';

class AIUnavailableError extends Error {
  constructor(message, code = 'AI_UNAVAILABLE') {
    super(message);
    this.name = 'AIUnavailableError';
    this.code = code;
    this.status = 503;
  }
}

function timeoutMs() {
  const configured = Number(process.env.AI_TIMEOUT_MS);
  return Number.isFinite(configured) && configured > 0 ? configured : 60000;
}

/** Parses the model's JSON. Accepts a fenced block. Anything else is an error, not a guess. */
function parseStrictJson(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    // fall through to the fenced-block form
  }
  const cleaned = text.replace(/```json\s*/gi, '').replace(/```/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new AIUnavailableError('The AI model returned an answer that is not valid JSON, so nothing was saved.', 'AI_INVALID_JSON');
  }
}

class AIService {
  /**
   * One request to the model. Returns the text, or throws AIUnavailableError.
   * If the primary model cannot answer and a fallback is configured (GEMINI_API_KEY), the same request goes to the
   * fallback. If that fails too, the primary's error is thrown. Nothing is invented in either case.
   */
  async _generate(body, options = {}) {
    try {
      return await this._generatePrimary(body, options);
    } catch (primaryErr) {
      const fb = fallbackConfig();
      if (!(primaryErr instanceof AIUnavailableError) || !fb) throw primaryErr;
      console.warn(`AI primary model failed (${primaryErr.code}); trying fallback ${fb.provider}/${fb.model}.`);
      try {
        return await this._generateGemini(fb, body, options);
      } catch (fallbackErr) {
        console.warn(`AI fallback ${fb.provider} failed: ${fallbackErr.message}`);
        throw primaryErr;
      }
    }
  }

  /** Same request to Google Gemini (generateContent). Returns the text, or throws AIUnavailableError. */
  async _generateGemini(fb, body, options = {}) {
    const parts = [{ text: String(body.prompt || '') }];
    const mimeList = Array.isArray(body.imageMimes) ? body.imageMimes : [];
    (body.images || []).forEach((data, idx) => {
      parts.push({ inline_data: { mime_type: mimeList[idx] || 'image/jpeg', data } });
    });
    const generationConfig = {};
    if (body.options && body.options.temperature !== undefined) generationConfig.temperature = body.options.temperature;
    if (body.format === 'json') generationConfig.responseMimeType = 'application/json';
    let text;
    // Gemini reports temporary overload as 503 (and rate limits as 429); retry those a couple of times with a short pause.
    const attempts = 3;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        const response = await axios.post(
          `${fb.host}/models/${fb.model}:generateContent`,
          { contents: [{ role: 'user', parts }], generationConfig },
          { headers: { 'Content-Type': 'application/json', ...fb.headers }, timeout: options.timeoutMs || timeoutMs() }
        );
        text = (response.data?.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('').trim();
        break;
      } catch (err) {
        const status = err.response?.status;
        if ((status === 503 || status === 429) && attempt < attempts) {
          await new Promise((r) => setTimeout(r, 1500 * attempt));
          continue;
        }
        const reason = status ? `HTTP ${status}` : err.code || err.message;
        throw new AIUnavailableError(`The fallback AI model (${fb.provider}, ${fb.model}) did not answer (${reason}).`);
      }
    }
    if (!text) throw new AIUnavailableError(`The fallback AI model (${fb.provider}, ${fb.model}) returned an empty answer.`, 'AI_EMPTY');
    return text;
  }

  /** One request to the primary (Ollama) model. Returns the text, or throws AIUnavailableError. */
  async _generatePrimary(body, options = {}) {
    const cfg = modelConfig();
    const { imageMimes: _ignoredMimes, ...primaryBody } = body || {};
    let text;
    try {
      const response = await axios.post(
        `${cfg.host}/api/generate`,
        { model: cfg.model, stream: false, ...primaryBody },
        {
          headers: { 'Content-Type': 'application/json', ...cfg.headers },
          timeout: options.timeoutMs || timeoutMs(),
        }
      );
      text = String(response.data?.response ?? '').trim();
    } catch (err) {
      const reason = err.response ? `HTTP ${err.response.status}` : err.code || err.message;
      throw new AIUnavailableError(`The AI model (${cfg.provider}, ${cfg.model}) did not answer (${reason}). Nothing was generated.`);
    }
    if (!text) {
      throw new AIUnavailableError(`The AI model (${cfg.provider}, ${cfg.model}) returned an empty answer. Nothing was generated.`, 'AI_EMPTY');
    }
    return text;
  }

  /**
   * Text or JSON from the model.
   * @param {{ prompt: string, systemInstruction?: string, responseFormat?: 'json'|'text', temperature?: number, timeoutMs?: number }} args
   */
  async generateCompletion({ prompt, systemInstruction = DEFAULT_SYSTEM, responseFormat = 'json', temperature = 0.2, timeoutMs: ms } = {}) {
    const system = systemInstruction ? `[SYSTEM: ${systemInstruction}]\n\n` : '';
    const body = { prompt: `${system}${prompt}`, options: { temperature } };
    if (responseFormat === 'json') body.format = 'json';
    const text = await this._generate(body, { timeoutMs: ms });
    return responseFormat === 'json' ? parseStrictJson(text) : text;
  }

  /** Text or JSON from the model, with images attached. */
  async analyzeMedia({ prompt, imageParts = [], responseFormat = 'json', timeoutMs: ms } = {}) {
    const valid = (imageParts || []).filter((img) => img && (img.inlineData?.data || img.base64));
    const images = valid.map((img) => img.inlineData?.data || img.base64);
    const imageMimes = valid.map((img) => img.inlineData?.mimeType || img.mimeType || 'image/jpeg');
    const body = { prompt, images, imageMimes };
    if (responseFormat === 'json') body.format = 'json';
    const text = await this._generate(body, { timeoutMs: ms });
    return responseFormat === 'json' ? parseStrictJson(text) : text;
  }
}

const service = new AIService();
service.AIUnavailableError = AIUnavailableError;
module.exports = service;
