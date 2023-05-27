FROM node:14

WORKDIR /app

COPY package*.json ./

COPY build ./

RUN npm install

ENV NODE_ENV=prod

EXPOSE 8080

CMD ["node", "index.js"]
