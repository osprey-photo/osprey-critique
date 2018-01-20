#!/bin/bash

docker run --net=voyager-odn --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
docker run -it --net=voyager-odn  --rm mysql sh -c 'exec mysql -hsome-mysql -P3306 -uroot -pmy-secret-pw'

# build docker image
docker build -t matthew/node-web-app .

docker run --net=voyager-odn -p 49160:8080 -d matthew/node-web-app

docker network create -d bridge voyager-odn
