# Osprey Critique

## Items to look at

- Create export file with plain js DOM functions
- Create fixed header, and site map.
	- Log in screen
	- Home screen for logged in user
	- Group page showing open critiques for this group
	- Critique page - main interaction
	- Profile page
	- Admin pages

- Data-layer 
  - Add in APIs to support required strucure.
  - http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
  - Need error codes

- Authentication & Authorization

## Utilties to be used

- For the text editing and comments use https://quilljs.com/
- For toast pop ups.. http://silvio-r.github.io/spop/

## Notes and reference

- Forms:  https://eloquentjavascript.net/18_forms.html
- Plain JS functions for DOM:  https://plainjs.com/javascript/
- Logging:
   - Winston for app logging
   - Docker container logging https://github.com/gliderlabs/logspout/tree/master/httpstream
- Configuration:
	- Use Env variables to configure the docker containers
	- https://github.com/lorenwest/node-config/wiki/Environment-Variables
- Objection.js
	- ORM http://vincit.github.io/objection.js
- REST APIs
    - http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api



docker network create -d bridge osprey-odn
docker run --net=ospreyodn_default --name osprey-mysql -e MYSQL_ROOT_PASSWORD=mypass -d mysql:latest
docker run -it --net=ospreyodn_default  --rm mysql sh -c 'exec mysql -hmariadb -P3306 -uroot -pmypass'

docker run -d --name="logspout" \
	--volume=/var/run/docker.sock:/var/run/docker.sock \
	--publish=127.0.0.1:8000:80 \
	gliderlabs/logspout
    curl http://127.0.0.1:8000/logs
    https://github.com/gliderlabs/logspout/tree/master/httpstream

https://docs.docker.com/samples/library/mysql/


https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-basic-ops

https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

docker run --name some-app --link some-mysql:mysql -d application-that-uses-mysql

docker exec -it <container id> /bin/bash
https://hub.docker.com/_/mariadb/
https://www.digitalocean.com/community/tutorials/how-to-import-and-export-databases-in-mysql-or-mariadb
##
http://knexjs.org/#Schema-references
https://bulma.io/documentation/overview/start/
https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/

https://stackoverflow.com/questions/7067966/how-to-allow-cors
https://gist.github.com/thejmazz/067295d9fb8b22c77be0
https://springbootdev.com/2018/01/02/babel-and-webpack-for-compiling-and-bundling-javascript-es6-es6-es7-es8/

https://webpack.js.org/guides/output-management/

https://mariadb.com/kb/en/library/installing-and-using-mariadb-via-docker/#downloading-an-image

https://github.com/axios/axios/tree/master/examples

https://blog.risingstack.com/node-js-best-practices-part-2/