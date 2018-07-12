FROM node:9-alpine

WORKDIR /usr/src/app


ENV HOST 0.0.0.0
EXPOSE 3000

CMD yarn $([ -f yarn.lock ] && echo "install") && $(yarn bin)/nuxt dev

