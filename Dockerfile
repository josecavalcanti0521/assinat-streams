FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production \
    PORT=3000

EXPOSE 3000

CMD ["node", "dist/main.js"]