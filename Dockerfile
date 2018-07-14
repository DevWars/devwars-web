FROM node:9-alpine

ARG API_URL
ARG API_URL_BROWSER

WORKDIR /usr/src/app

ADD package.json .
ADD yarn.lock .

RUN yarn

ADD . .

ENV HOST 0.0.0.0
EXPOSE 3000

RUN API_URL=${API_URL} API_URL_BROWSER=${API_URL_BROWSER} $(yarn bin)/nuxt build

CMD $(yarn bin)/nuxt start

