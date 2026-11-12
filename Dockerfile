# ============================================================
# Zyno Construction — Backend Node.js Express
# Multi-stage production Dockerfile
# ============================================================

# --- Stage 1: Dependency install ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Install only production deps; omit devDependencies
RUN npm ci --omit=dev --prefer-offline && npm cache clean --force

# --- Stage 2: Final runtime image ---
FROM node:20-alpine AS runner
LABEL maintainer="Zyno Construction Platform"
LABEL version="2.0.0"

WORKDIR /app

# Create non-root app user for security
RUN addgroup --system zyno && adduser --system --ingroup zyno zyno

# Copy production node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY --chown=zyno:zyno . .

# Create uploads directory with correct ownership
RUN mkdir -p /app/uploads && chown zyno:zyno /app/uploads

# Use non-root user
USER zyno

EXPOSE 3000

ENV NODE_ENV=production
ENV SERVER_PORT=3000

# Health check — backend must respond on /api/v1/health
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/v1/health || exit 1

CMD ["node", "server.js"]
