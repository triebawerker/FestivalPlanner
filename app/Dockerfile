FROM node:6.14

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src/
ADD package.json /src/package.json
RUN npm install

ADD nodemon.json nodemon.json
EXPOSE 3000
