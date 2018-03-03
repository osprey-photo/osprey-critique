## db-maria

Maria DB is used for the main data-model storage; this package is primairly to record it's existance, and store reference information 
for it's setup. 

May be used in the future for customization of the DB Image.

### Reference

Pure configuration for the docker image for the Mariadb

```
export DBHOST=127.0.0.1
export DBUSER=root
export DBPWD=mypass
export DBPORT=3306

docker run --name osprey-maria -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mypass -d mariadb
docker run -it --link osprey-maria:mysql --rm mariadb sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'

mysqldump -uroot osprey
```