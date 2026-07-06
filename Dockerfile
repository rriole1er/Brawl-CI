FROM node:18-alpine

WORKDIR /home/brawl-life

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
