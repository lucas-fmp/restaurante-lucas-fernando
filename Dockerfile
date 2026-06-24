# ESTÁGIO 1: Build
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN npm install --omit=dev

# ESTÁGIO 2: Imagem Final (Enxuta e segura)
FROM node:22-alpine AS runtime

ENV NODE_ENV=production
USER node
WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node . .

EXPOSE 3000
CMD ["node", "index.js"]