FROM node:20-alpine AS builder

# Build args for registry customization
ARG NPM_CONFIG_REGISTRY=https://registry.npmmirror.com/
ARG CACHE_BUST

WORKDIR /app

# Optimize npm config
RUN npm config set registry ${NPM_CONFIG_REGISTRY} && \
    npm config set prefer-offline true && \
    npm config set progress false && \
    npm config set audit false && \
    npm config set fund false && \
    npm config set update-notifier false

# Copy package files for better Docker layer caching
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm ci --no-audit --no-fund --prefer-offline --timeout=60000

# Copy source code
COPY . .

# Build application
RUN npm run build && \
    npm prune --production && \
    npm cache clean --force

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
    adduser -S nestjs -u 1001

# Copy package files and production node_modules from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Set proper ownership and permissions
RUN chown -R nestjs:nodejs /app && \
    chmod 755 /app && \
    chmod -R 755 /app/dist && \
    chmod -R 755 /app/node_modules

# Switch to non-root user
USER nestjs

# Environment variables
ENV NODE_ENV=production \
    PORT=8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# Expose port
EXPOSE 8080

# Start application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
