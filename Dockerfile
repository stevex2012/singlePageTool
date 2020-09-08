FROM docker image

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

