FROM node:12

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

COPY . /app

RUN yarn install

CMD ["yarn", "dev-server"]