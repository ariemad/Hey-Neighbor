FROM node

############### Build App

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci --omit=dev

COPY ./bin ./bin
COPY ./controllers ./controllers
COPY ./middleware ./middleware
COPY ./models ./models
COPY ./populate ./populate
COPY ./public ./public
COPY ./routes ./routes
COPY ./views ./views
COPY app.js .

EXPOSE 80


############### Run App

CMD ["npm", "run", "start"]
