/*
  Copyright [2018] [Matthew B White]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

'use strict';

const Knex = require('knex');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const promiseRouter = require('express-promise-router');
const knexConfig = require('./knexfile');
const registerApi = require('./api');
const { Model } = require('objection');

// Initialize knex.
const knex = Knex(knexConfig.development);

const CFG = require('./config');

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);

const router = promiseRouter();
const app = express()
    .use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    })
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use(router)
    .set('json spaces', 2);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Register our REST API.
registerApi(router);

// Error handling. The `ValidationError` instances thrown by objection.js have a `statusCode`
// property that is sent as the status code of the response.
//
// NOTE: This is not a good error handler, this is the simplest one. See the error handing
//       recipe for a better handler: http://vincit.github.io/objection.js/#error-handling
app.use((err, req, res, next) => {
    if (err) {
        res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
    } else {
        next();
    }
});

const server = app.listen(CFG.data_layer.port, () => {
    console.log('Example app listening at port %s', server.address().port);
});
