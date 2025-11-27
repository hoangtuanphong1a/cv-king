# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

# Install ffmpeg for builder stage
RUN apk add --no-cache ffmpeg

# Enable pnpm
RUN corepack enable
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code and build
COPY . .
RUN pnpm build

# ---------- Stage 2: Runtime ----------
FROM node:20-alpine AS runner

# Install ffmpeg for runtime stage
RUN apk add --no-cache ffmpeg

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app
ENV NODE_ENV=production

# Copy Next.js build output
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install production dependencies
RUN npm install -g pnpm && \
    pnpm install --prod --frozen-lockfile

# Set proper ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["pnpm", "start"]
