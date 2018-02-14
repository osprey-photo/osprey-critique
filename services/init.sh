#!/bin/bash


docker network create -d bridge osprey-odn
docker run --net=ospreyodn_default --name osprey-mysql -e MYSQL_ROOT_PASSWORD=mypass -d mysql:latest
docker run -it --net=ospreyodn_default  --rm mysql sh -c 'exec mysql -hmariadb -P3306 -uroot -pmypass'

# build docker image
#docker build -t matthew/node-web-app .

#docker run --net=voyager-odn -p 49160:8080 -d matthew/node-web-app

