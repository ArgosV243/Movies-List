FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install

CMD sh -c 'npx knex migrate:latest && npx knex seed:run'

