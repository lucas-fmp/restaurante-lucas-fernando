# ESTÁGIO 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com/ \
    && npm ci --omit=dev --loglevel verbose \
    && npm cache clean --force

COPY . .

# ESTÁGIO 2: Runtime (Imagem Final)
FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --chown=node:node --from=build /app .

USER node
EXPOSE 3000
CMD ["node", "index.js"]