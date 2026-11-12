'use strict';
/**
 * Neon Realtime Service
 * Publishes events (inventory changes, RA bill approvals, task updates) to Neon Realtime subscribers.
 */
class RealtimeService {
  constructor() {
    this.endpoint = process.env.NEON_REALTIME_URL || null;
    this.secret = process.env.NEON_REALTIME_SECRET || null;
  }

  async publish(channel, event, payload) {
    if (!this.endpoint) {
      // Local fallback / no-op in disconnected mode
      return { status: 'noop', channel, event };
    }
    try {
      const axios = require('axios');
      const response = await axios.post(
        `${this.endpoint}/publish`,
        { channel, event, data: payload },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(this.secret ? { Authorization: `Bearer ${this.secret}` } : {}),
          },
          timeout: 5000,
        }
      );
      return response.data;
    } catch (err) {
      console.warn(`[Neon Realtime] publish to ${channel} failed:`, err.message);
      return { status: 'error', reason: err.message };
    }
  }
}

module.exports = new RealtimeService();
