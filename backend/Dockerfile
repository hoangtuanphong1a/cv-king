FROM node:20-alpine AS builder

ARG NPM_CONFIG_REGISTRY=https://registry.npmmirror.com/

WORKDIR /app

# Optimize yarn config
RUN yarn config set registry ${NPM_CONFIG_REGISTRY} && \
    yarn config set network-timeout 600000 -g

# Copy package files for better Docker layer caching
COPY package*.json yarn.lock ./

# Install all dependencies (including dev dependencies for building)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN yarn build && \
    yarn install --production=true --frozen-lockfile && \
    yarn cache clean

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
    PORT=3003

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# Expose port
EXPOSE 3003

# Start application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
