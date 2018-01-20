## Adventures with databases

https://docs.docker.com/samples/library/mysql/


https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-basic-ops

https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

docker run --name some-app --link some-mysql:mysql -d application-that-uses-mysql

docker exec -it <container id> /bin/bash