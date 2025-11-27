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

WORKDIR /app
ENV NODE_ENV=production

# Copy standalone output from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
