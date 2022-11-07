FROM node:16-slim

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /usr/src/app

COPY package.json ./
COPY *.lock ./
RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]