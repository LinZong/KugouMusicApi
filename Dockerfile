FROM node

RUN mkdir -p /app

WORKDIR /app

RUN npm i typescript -g

COPY package.json /app

RUN npm i

COPY . /app

ENV PORT 3000

EXPOSE 3000

RUN chmod +x /app/start.sh

CMD ["sh", "start.sh"]
