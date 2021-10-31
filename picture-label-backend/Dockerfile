FROM node:14 as test-stage
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
RUN npm test

FROM node:14

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./

CMD ["npm", "start"]
