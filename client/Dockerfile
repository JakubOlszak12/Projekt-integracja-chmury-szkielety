FROM node:slim

RUN mkdir client

WORKDIR /client

RUN mkdir .docker

# COPY package.json .

# update dependencies
# RUN yarn

COPY . .

ENTRYPOINT ["sh", "./.docker/entrypoint.sh"]

EXPOSE 3000