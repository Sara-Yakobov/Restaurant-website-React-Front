FROM node:18.16.0-slim

WORKDIR /reactfront

COPY . .

RUN npm install

CMD npm start