FROM 700798419914.dkr.ecr.us-west-1.amazonaws.com/firmoo/node:10.20-alpine-pm2

WORKDIR /app

COPY . /app

RUN cd ./client \
    && cp .env.example .env \
    && yarn install \
    && yarn run build \
    && cd ../server \
    && cp .env.example .env \
    && yarn install

CMD cd ./server && yarn run start

EXPOSE 3001

