FROM node:18

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD [ "npm", "start"]