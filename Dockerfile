FROM node:18-alpine

RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app/

COPY --chown=app:app package*.json .

RUN npm install

COPY ./src/ ./src/

ENV API_URL=http://api.blah.com

EXPOSE 3000

CMD ["npm", "start"]
