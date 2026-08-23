# syntax=docker/dockerfile:1

# --- Build stage -------------------------------------------------------------
# Bun is used for the build because the repository commits bun.lock.
FROM oven/bun:1-alpine AS build
WORKDIR /app

# Deterministic install: fails if bun.lock is missing or out of sync.
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# --- Runtime stage -----------------------------------------------------------
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

COPY --from=build /app/.output ./.output

USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
