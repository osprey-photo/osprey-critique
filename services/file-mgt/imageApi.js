'use strict';

const Minio = require('minio');
// The error returned by this function is handled in the error handler middleware in app.js.
function createStatusCodeError(statusCode) {
    return Object.assign(new Error(), {
        statusCode
    });
}

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

module.exports = router => {

    // Get a specific image by ID
    router.get('/images/:hash/', async (req, res) => {
        let hash = req.params.hash;

        let size = 0;
        let dataStream = await minioClient.getObject('images', hash);

        dataStream.on('data', function(chunk) {
            size += chunk.length;
        });
        dataStream.on('end', function() {
            console.log('End. Total size = ' + size);
        });
        dataStream.on('error', function(err) {
            console.log(err);
        });

        // Return new promise
        let image = await new Promise((resolve, reject) => {
            let data = [];
            // get it back again
            let size = 0;

            dataStream.on('data',  (chunk) => {
                size += chunk.length;
                data.push(chunk);
            });
            dataStream.on('end',  () => {
                console.log('End. Total size = ' + size);
                resolve(data[0].toString('base64'));
            });
            dataStream.on('error',  (err)=>{
                reject(err);
            // console.log(err);
            });
        });
        if (!image) {
            throw createStatusCodeError(404);
        }
        res.send(image);
    });

};
