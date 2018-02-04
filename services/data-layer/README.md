

docker run --name osprey-maria -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mypass -d mariadb
docker run -it --link osprey-maria:mysql --rm mariadb sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'

mysqldump -uroot osprey

# ES6 example project

This is an example project that targets node 8.0.0 and up. The project
is a simple express server with a REST API that demonstrates the basic
functionalities of objection like models, relations, eager loading,
graph inserts, graph upserts etc.

# Install and run

```sh
git clone git@github.com:Vincit/objection.js.git objection
cd objection/examples/express-es6
npm install
npm start
```

`client.js` file contains a bunch example requests and is a good place
to start playing with the REST API.

```sh
node client.js
```
