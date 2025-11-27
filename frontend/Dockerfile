# ===== BUILDER STAGE =====
FROM node:20-alpine AS builder

# Build args for registry customization
ARG NPM_CONFIG_REGISTRY=https://registry.npmmirror.com/
ARG CACHE_BUST

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Optimize pnpm config
RUN pnpm config set registry ${NPM_CONFIG_REGISTRY} && \
    pnpm config set prefer-offline true && \
    pnpm config set progress false && \
    pnpm config set audit false && \
    pnpm config set fund false && \
    pnpm config set update-notifier false

# Copy package files for better Docker layer caching
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies for building)
RUN pnpm install --prefer-offline

# Copy source code
COPY . .

# Copy next.config files
COPY next.config.* ./

# Build application
RUN pnpm run build

# ===== RUNTIME STAGE =====
FROM node:20-alpine AS runtime

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init curl && \
    apk add --no-cache --update tzdata ca-certificates && \
    cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && \
    echo "Asia/Ho_Chi_Minh" > /etc/timezone && \
    apk del tzdata && \
    rm -rf /var/cache/apk/* /tmp/*

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy built application from builder
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install production dependencies
RUN npm install -g pnpm && \
    pnpm config set registry https://registry.npmmirror.com/ && \
    pnpm install --prod --frozen-lockfile && \
    pnpm store prune

# Set proper ownership and permissions
RUN chown -R nextjs:nodejs /app && \
    chmod 755 /app && \
    chmod -R 755 /app/.next && \
    chmod -R 755 /app/public && \
    chmod -R 755 /app/node_modules

# Switch to non-root user
USER nextjs

# Environment variables for Next.js
ENV NODE_ENV=production \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

# Health check for Next.js
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:${PORT}/api/health || curl -f http://localhost:${PORT} || exit 1

# Expose port
EXPOSE 3000

# Start application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["pnpm", "start"]
