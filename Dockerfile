FROM node:12

RUN mkdir -p /var/www/api

WORKDIR /var/www/api

COPY . .

RUN npm install