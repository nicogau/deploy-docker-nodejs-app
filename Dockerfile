# node guide:
# https://javascript.plainenglish.io/build-a-production-ready-node-express-api-with-docker-9a45443427a0
# https://github.com/nodejs/docker-node/blob/main/README.md#how-to-use-this-image

FROM node:18-alpine  AS node

FROM node AS build_front
WORKDIR /front
COPY ./front . 
RUN yarn  install
RUN yarn  build

FROM node AS build_back
WORKDIR /back
COPY . .
RUN yarn install
RUN yarn build:back

FROM node as development
WORKDIR /home/node
USER node

COPY --chown=node:node --from=build_back /back/package*.json .
RUN yarn install --production
COPY --chown=node:node --from=build_front /front/dist ./public/js
COPY --chown=node:node --from=build_back /back/dist ./dist

EXPOSE 3000
ENTRYPOINT [ "node", "." ]
# ENTRYPOINT [ "tail", "-f", "/dev/null" ]

