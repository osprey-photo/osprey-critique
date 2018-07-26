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
const winston = require('winston');

const {
    ValidationError,
    NotFoundError,
    Model
} = require('objection');

const {
    DBError,
    //ConstraintViolationError,
    UniqueViolationError,
    NotNullViolationError,
    ForeignKeyViolationError,
    CheckViolationError,
    DataError
} = require('objection-db-errors');

winston.loggers.add('app', {
    console: {
        level: 'silly',
        colorize: true,
        label: 'Service:Data-Mgt'
    }
});

const logger = winston.loggers.get('app');

// Initialize knex.
const knex = Knex(knexConfig.development);

const CFG = require('./config');

/**
 *
 * @param {*} err
 * @param {*} res
 */
function errorHandler(err, res) {
    logger.error(err);

    if (err instanceof ValidationError) {
        switch (err.type) {
        case 'ModelValidation':
            res.status(400).send({
                message: err.message,
                type: 'ModelValidation',
                data: err.data
            });
            break;
        case 'RelationExpression':
            res.status(400).send({
                message: err.message,
                type: 'InvalidRelationExpression',
                data: {}
            });
            break;
        case 'UnallowedRelation':
            res.status(400).send({
                message: err.message,
                type: 'UnallowedRelation',
                data: {}
            });
            break;
        case 'InvalidGraph':
            res.status(400).send({
                message: err.message,
                type: 'InvalidGraph',
                data: {}
            });
            break;
        default:
            res.status(400).send({
                message: err.message,
                type: 'UnknownValidationError',
                data: {}
            });
            break;
        }
    } else if (err instanceof NotFoundError) {
        res.status(404).send({
            message: err.message,
            type: 'NotFound',
            data: {}
        });
    } else if (err instanceof UniqueViolationError) {
        res.status(409).send({
            message: err.message,
            type: 'UniqueViolation',
            data: {
                columns: err.columns,
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof NotNullViolationError) {
        res.status(400).send({
            message: err.message,
            type: 'NotNullViolation',
            data: {
                column: err.column,
                table: err.table,
            }
        });
    } else if (err instanceof ForeignKeyViolationError) {
        res.status(409).send({
            message: err.message,
            type: 'ForeignKeyViolation',
            data: {
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof CheckViolationError) {
        res.status(400).send({
            message: err.message,
            type: 'CheckViolation',
            data: {
                table: err.table,
                constraint: err.constraint
            }
        });
    } else if (err instanceof DataError) {
        res.status(400).send({
            message: err.message,
            type: 'InvalidData',
            data: {}
        });
    } else if (err instanceof DBError) {
        res.status(500).send({
            message: err.message,
            type: 'UnknownDatabaseError',
            data: {}
        });
    } else {
        res.status(500).send({
            message: err.message,
            type: 'UnknownError',
            data: {}
        });
    }
}

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

// Register our REST API.
registerApi(router);

app.use((err, req, res, next) => {
    if (err) {
        errorHandler(err,res);
    } else {
        next();
    }
});


const server = app.listen(CFG.data_layer.port, () => {
    logger.info('Data-Mgt listening at port %s', server.address().port);
});

