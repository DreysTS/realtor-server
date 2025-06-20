FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --package-lock-only --no-audit --no-fund && \
    npm ci --no-audit --no-fund

FROM base AS build

COPY . .

RUN npx prisma generate

RUN npm run build

FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json

RUN npm install --omit=dev --no-audit --no-fund

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma/__generated__ ./prisma/__generated__

CMD [ "node", "dist/main" ]