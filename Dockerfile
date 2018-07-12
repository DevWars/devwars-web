FROM node:9-alpine

WORKDIR /usr/src/app

ADD package.json .

RUN yarn

ADD . .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD $(yarn bin)/nuxt

