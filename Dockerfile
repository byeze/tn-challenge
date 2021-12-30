# Build step
FROM node:14-alpine3.12 AS builder

WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY tsconfig*.json ./
COPY src src

RUN npm run build

# Deploy step
FROM node:14-alpine3.12

WORKDIR /app
RUN chown node:node .
USER node

COPY package*.json ./

RUN npm install
COPY --from=builder /app/dist ./dist

EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]