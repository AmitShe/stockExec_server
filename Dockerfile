FROM node:latest

RUN mkdir -p /usr/src/app

RUN npm install nodemon -g

WORKDIR /usr/src/app

COPY ./ /usr/src

RUN npm install

EXPOSE 3000

CMD ["npm","run","dev"]