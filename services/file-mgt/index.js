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

const tus = require('tus-node-server');
const EVENTS = require('tus-node-server').EVENTS;
const server = new tus.Server();

const path= require('path');
const util = require('util');

const filestore = path.resolve(path.join(__dirname,'files'));

// Image API router
const imageApi = require('./imageApi');

const Minio = require('minio');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const promiseRouter = require('express-promise-router');
const winston = require('winston');

const logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console()
    ]
});


const CFG = require('./config');
// Instantiate the minio client with the endpoint
// and access keys as shown below.
let minioClient = new Minio.Client({
    endPoint: CFG.minio.host,
    port: CFG.minio.port,
    secure: false,
    accessKey: CFG.minio.accessKey,
    secretKey: CFG.minio.secretKey
});

console.log(CFG.minio.host+':'+CFG.minio.port);

server.datastore = new tus.FileStore({
    path: '/files'
});

//
// const axios = require('axios');
// let baseURL = 'http://'+CFG.data_layer.host+':'+CFG.data_layer.port;
// logger.info(`Axios created at ${baseURL}`);
// const req = axios.create({
//     baseURL
// });

//
// Events from the TUS server
server.on(EVENTS.EVENT_UPLOAD_COMPLETE,async (event) => {
    logger.info('Upload completed',util.inspect(event));
    let filecreated = path.resolve(filestore,event.file.id);
    let metaData = event.file.upload_metadata.split(',');
    let results = {};
    for (let data of metaData){
        let keyvalue=data.split(' ');
        results[keyvalue[0]]=Buffer.from(keyvalue[1],'base64').toString();
    }
    logger.info('Uploading the image');

    // Using fPutObject API upload your file to the bucket specified.
    minioClient.fPutObject('images', event.file.id, filecreated, 'application/octet-stream', function(err, etag) {
        if (err) {
            return console.log(err);
        }
        logger.info('File uploaded successfully.');
    });

    // let imageData = await req.post('images', {
    //     filehash:  event.file.id,
    //     caption: results.caption
    // });

    // logger.info('inserted', imageData.data);
    logger.info(`Upload complete to ${filecreated} `);

});
server.on(EVENTS.EVENT_FILE_CREATED, (event) => {
    logger.info('File created',util.inspect(event));
});
server.on(EVENTS.EVENT_ENDPOINT_CREATED, (event) => {
    logger.info('Endpoint created',util.inspect(event));
});

// setup the express code
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
const uploadApp = express();
uploadApp.all('*', server.handle.bind(server));

//
// Add in the routes, including geting a specific image back as base 64

app.use('/uploads', uploadApp);

// setup the router for the REST API
imageApi(router);

const port = CFG.file_mgt.port;
app.use((err, req, res, next) => {
    if (err) {
        res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
    } else {
        next();
    }
});

app.listen(port, () => {
    logger.info('File Mgt listening');
});



