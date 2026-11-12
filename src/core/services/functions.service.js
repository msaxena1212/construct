'use strict';
/**
 * Neon Functions Service
 * Triggers and invokes serverless backend functions on Neon Cloud.
 */
class FunctionsService {
  constructor() {
    this.endpoint = process.env.NEON_FUNCTIONS_URL || null;
  }

  async invoke(functionName, payload = {}) {
    if (!this.endpoint) {
      return { status: 'noop', functionName, message: 'NEON_FUNCTIONS_URL not configured' };
    }
    try {
      const axios = require('axios');
      const response = await axios.post(
        `${this.endpoint}/${functionName}`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
        }
      );
      return response.data;
    } catch (err) {
      console.warn(`[Neon Functions] ${functionName} invocation failed:`, err.message);
      return { status: 'error', reason: err.message };
    }
  }
}

module.exports = new FunctionsService();
