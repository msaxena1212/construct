# ============================================================
# Zyno Construction — Angular 21 Frontend
# Multi-stage production Dockerfile with Nginx
# ============================================================

# --- Stage 1: Build Angular app ---
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies separately for Docker layer caching
COPY package*.json ./
RUN npm ci --prefer-offline && npm cache clean --force

# Copy source and build production bundle
COPY . .
RUN npm run build -- --configuration production

# --- Stage 2: Nginx production server ---
FROM nginx:1.27-alpine AS runner
LABEL maintainer="Zyno Construction Platform"

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy built Angular app from build stage
COPY --from=build /app/dist/zyno_construction_frontend/browser /usr/share/nginx/html

# Copy production-grade nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
