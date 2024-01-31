from node:alpine

RUN mkdir -p /home/brawl-life
WORKDIR /home/brawl-life

COPY . .

EXPOSE 8000

RUN npm install

ENTRYPOINT [""]

CMD ["npm","start"]
