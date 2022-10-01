FROM node:18-slim as builder

WORKDIR /usr/src/app

COPY . .
COPY .yarn ./.yarn
RUN yarn set version 3.2.1

RUN yarn install
RUN yarn build
RUN rm -rf node_modules && \
  NODE_ENV=production yarn install

FROM node:18-slim

WORKDIR /app

COPY --from=builder /usr/src/app  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]
