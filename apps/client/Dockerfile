# Базовый образ
FROM node:20-alpine AS base
RUN npm i -g pnpm@9.15.0

# Этап установки зависимостей
FROM base AS deps
WORKDIR /app

# Копируем манифесты пакетов
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/client/package.json ./apps/client/
COPY packages/ ./packages/

# Устанавливаем все зависимости (включая workspace)
RUN pnpm install --frozen-lockfile

# Этап сборки
FROM base AS builder
WORKDIR /app

# Копируем всё из deps (уже есть node_modules, packages, манифесты)
COPY --from=deps /app .

# Копируем все исходники (перезапишут файлы, но не затронут node_modules)
COPY . .

# Аргументы для переменных окружения, необходимых при сборке
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_DADATA_API_KEY
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_DADATA_API_KEY=$NEXT_PUBLIC_DADATA_API_KEY

# Собираем клиент
WORKDIR /app/apps/client
RUN pnpm run build

# Финальный образ
FROM node:20-alpine AS runner
WORKDIR /app

# Копируем standalone-папку
COPY --from=builder /app/apps/client/.next/standalone ./

# Копируем статические файлы
COPY --from=builder /app/apps/client/.next/static ./apps/client/.next/static

# Копируем public-файлы
COPY --from=builder /app/apps/client/public ./apps/client/public

WORKDIR /app/apps/client

EXPOSE 3000
ENV PORT=${PORT:-3000}
ENV HOST=0.0.0.0
CMD ["node", "server.js"]