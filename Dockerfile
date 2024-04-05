FROM node:18-alpine

WORKDIR /app/
COPY src/ ./src
COPY package*.json .

RUN npm install

CMD ["npm", "start"]