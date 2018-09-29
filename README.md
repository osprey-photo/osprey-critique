# Osprey Critique

## Items to look at

- Create export file with plain js DOM functions
- Create fixed header, and site map. - Log in screen - Home screen for logged in user - Group page showing open critiques for this group - Critique page - main interaction - Profile page - Admin pages

- Data-layer

  - Add in APIs to support required strucure.
  - http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
  - Need error codes
  - MYSQL not using root

- Authentication & Authorization

## Utilties to be used

- For the text editing and comments use https://quilljs.com/
- For toast pop ups.. http://silvio-r.github.io/spop/

## Notes and reference

- Forms: https://eloquentjavascript.net/18_forms.html
- Plain JS functions for DOM: https://plainjs.com/javascript/
- Logging:
  - Winston for app logging
  - Docker container logging https://github.com/gliderlabs/logspout/tree/master/httpstream
- Configuration: - Use Env variables to configure the docker containers - https://github.com/lorenwest/node-config/wiki/Environment-Variables
- Objection.js - ORM http://vincit.github.io/objection.js
- REST APIs
  - http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api

docker network create -d bridge osprey-odn
docker run --net=ospreyodn_default --name osprey-mysql -e MYSQL_ROOT_PASSWORD=mypass -d mysql:latest
docker run -it --net=ospreyodn_default --rm mysql sh -c 'exec mysql -hmariadb -P3306 -uroot -pmypass'

```bash
docker run -d --name="logspout" \
	--volume=/var/run/docker.sock:/var/run/docker.sock \
	--publish=127.0.0.1:8000:80 \
	gliderlabs/logspout
curl http://127.0.0.1:8000/logs
    https://github.com/gliderlabs/logspout/tree/master/httpstream
```

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

https://g.codefresh.io/repositories?filter=view:all;mode:grid

https://www.npmjs.com/package/@okta/okta-vue

- Authentication Best Practices with Vue
  https://blog.sqreen.io/authentication-best-practices-vue/
  https://github.com/sqreen/vue-authentication-example/blob/master/src/components/navigation/index.vue

User-authetnication into Vuex https://medium.com/front-end-hacking/persisting-user-authentication-with-vuex-in-vue-b1514d5d3278

- Vuex programatic navigation - https://router.vuejs.org/guide/essentials/navigation.html
- Event listeners https://vuejs.org/v2/guide/events.html
- Manage user state with Firebase https://medium.freecodecamp.org/managing-user-state-with-vuex-firebase-77eebc64f546


- JWT - introduction https://github.com/dwyl/learn-json-web-tokens
- Securing REST API with JWT - https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
  - https://github.com/adnanrahic/securing-restful-apis-with-jwt/blob/master/auth/VerifyToken.js
  
- Auth0 webtokens - https://github.com/auth0/node-jsonwebtoken
