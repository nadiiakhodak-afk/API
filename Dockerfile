# syntax=docker/dockerfile:1.6

FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=development

# Ensure glibc compatibility for packages that rely on it
RUN apk add --no-cache libc6-compat curl bash

# Install Bun globally for running scripts like `bun ./scripts/...`
RUN curl -fsSL https://bun.sh/install | bash \
    && mv /root/.bun/bin/bun /usr/local/bin/bun \
    && rm -rf /root/.bun

ENV PATH="/usr/local/bin:${PATH}"

# Enable pnpm through corepack (ships with Node 20)
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

FROM base AS dev
COPY . .

RUN chmod +x /app/scripts/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/app/scripts/docker-entrypoint.sh"]
CMD ["sleep", "infinity"]
