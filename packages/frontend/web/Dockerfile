FROM node:22.14.0-alpine3.21 AS build

WORKDIR /app

COPY package*.json             /app
COPY packages/shared           /app/packages/shared
COPY packages/frontend/web     /app/packages/frontend/web

RUN npm ci --ignore-scripts

ENV NODE_ENV=production

RUN npm run build:frontend:web

FROM node:22.14.0-alpine3.21 AS app

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/packages/frontend/web/dist /app
