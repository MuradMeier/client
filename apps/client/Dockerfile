# Базовый образ
FROM node:20-alpine AS base
RUN npm i -g pnpm@9.15.0

# Этап установки зависимостей
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/client/package.json ./apps/client/
COPY packages/ ./packages/

RUN pnpm install --frozen-lockfile

# Этап сборки
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY apps/client ./apps/client

# Переменные окружения для сборки (будут переданы через ARG)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_DADATA_API_KEY
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_DADATA_API_KEY=$NEXT_PUBLIC_DADATA_API_KEY

WORKDIR /app/apps/client
RUN pnpm run build

# Финальный образ
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/client/.next/standalone ./
COPY --from=builder /app/apps/client/.next/static ./apps/client/.next/static
COPY --from=builder /app/apps/client/public ./apps/client/public

WORKDIR /app/apps/client

EXPOSE 3000
ENV PORT=${PORT:-3000}
ENV HOST=0.0.0.0
CMD ["node", "server.js"]