FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY app ./app
COPY tests ./tests

ENV NODE_ENV=production
ENV PORT=3005

EXPOSE 3005

# Remove package managers not required at runtime
RUN rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/lib/node_modules/corepack \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /usr/local/bin/corepack

CMD ["node", "app/server.js"]