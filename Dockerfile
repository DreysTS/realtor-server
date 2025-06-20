FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM base AS build

COPY . .

RUN npx prisma generate

RUN npm run build

FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json .

RUN npm prune --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma/__generated__ ./prisma/__generated__

CMD [ "node", "dist/main" ]