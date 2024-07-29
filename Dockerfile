FROM node:latest

WORKDIR /app

COPY package*.json ./app

COPY . .

RUN npm install --legacy-peer-deps

CMD [ "npm", "start" ]

