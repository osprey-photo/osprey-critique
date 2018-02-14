'use strict';

const tus = require('tus-node-server');
const util = require('util');
const EVENTS = require('tus-node-server').EVENTS;
const path= require('path');
const server = new tus.Server();
const filestore = path.resolve(path.join(__dirname,'files'));
let Minio = require('minio');

// Instantiate the minio client with the endpoint
// and access keys as shown below.
let minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    secure: false,
    accessKey: 'JZHANSO4K036X27N0CR5',
    secretKey: 'gsF656jIgCvOtj1fRyISKYGJvQfWtq2q4TUyIvr4'
});

server.datastore = new tus.FileStore({
    path: '/files'
});

//
const axios = require('axios');

const req = axios.create({
    baseURL: 'http://orm:8641/'
});

//

server.on(EVENTS.EVENT_UPLOAD_COMPLETE,async (event) => {
    console.log('Upload completed');
    console.log(util.inspect(event));
    let filecreated = path.resolve(filestore,event.file.id);
    let metaData = event.file.upload_metadata.split(',');
    let results = {};
    for (let data of metaData){
        let keyvalue=data.split(' ');
        results[keyvalue[0]]=Buffer.from(keyvalue[1],'base64').toString();
    }
    // Using fPutObject API upload your file to the bucket europetrip.
    minioClient.fPutObject('images', event.file.id, filecreated, 'application/octet-stream', function(err, etag) {
        if (err) {return console.log(err);}
        console.log('File uploaded successfully.');
    });

    let imageData = await req.post('images', {
        filehash:  event.file.id,
        caption: results.caption
    });

    console.log('inserted', imageData.data);
    console.log(`Upload complete to ${filecreated} `);
    console.log(results);
});
server.on(EVENTS.EVENT_FILE_CREATED, (event) => {
    console.log('File created');
    console.log(util.inspect(event));
});
server.on(EVENTS.EVENT_ENDPOINT_CREATED, (event) => {
    console.log('Endpoint created');
    console.log(util.inspect(event));
});



const host = '127.0.0.1';
const port = 9001;
server.listen({ host, port }, () => {
    console.log(`[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`);
});




