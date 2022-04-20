FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7400

CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]