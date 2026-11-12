// In-memory token bucket / sliding window rate limiter
const rateLimitMap = new Map();

/**
 * Express middleware to prevent brute-force attacks on sensitive endpoints
 * @param {Object} options
 * @param {number} options.windowMs - Time frame in milliseconds (default 15 mins)
 * @param {number} options.max - Max attempts per window (default 10)
 * @param {string} options.message - Error message on limit exceed
 */
const rateLimiter = ({ windowMs = 15 * 60 * 1000, max = 10, message = "Too many requests. Please try again later." } = {}) => {
  return (req, res, next) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown_ip";
    const key = `${req.baseUrl || req.path}_${ip}`;
    const now = Date.now();

    let record = rateLimitMap.get(key);
    if (!record || now - record.startTime > windowMs) {
      record = { count: 1, startTime: now };
      rateLimitMap.set(key, record);
    } else {
      record.count += 1;
    }

    // Set standard rate limit response headers
    res.setHeader("X-RateLimit-Limit", max);
    res.setHeader("X-RateLimit-Remaining", Math.max(0, max - record.count));
    res.setHeader("X-RateLimit-Reset", new Date(record.startTime + windowMs).toISOString());

    if (record.count > max) {
      return res.status(429).json({
        status: "failed",
        message,
        retryAfterMs: record.startTime + windowMs - now,
      });
    }

    next();
  };
};

module.exports = rateLimiter;
