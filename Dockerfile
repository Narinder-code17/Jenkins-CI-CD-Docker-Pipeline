FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

COPY app ./app

COPY tests ./tests

ENV NODE_ENV=production
ENV PORT=3005

EXPOSE 3005

CMD ["node", "app/server.js"]