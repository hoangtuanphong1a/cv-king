# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

# 1. Cài ffmpeg trước (Alpine dùng apk)
RUN apk add --no-cache ffmpeg

# 2. Enable pnpm
RUN corepack enable
WORKDIR /app

# 3. Copy package files
COPY package.json pnpm-lock.yaml ./

# 4. Install deps & build
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ---------- Stage 2: Runtime ----------
FROM node:20-alpine AS runner

# Cài ffmpeg cho runtime
RUN apk add --no-cache ffmpeg

WORKDIR /app
ENV NODE_ENV=production

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
