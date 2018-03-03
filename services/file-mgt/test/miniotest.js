'use strict';

let Minio = require('minio');

let minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    secure: false,
    accessKey: 'VKHGJTS8P3DR63GVRXLJ',
    secretKey: '6oXQdUMGUHEPcN4OfxN4ROXllCHZ7s/m3uNmcn7j'
});

let file = './354.jpeg';



async function run_B() {
    // Using fPutObject API upload your file to the bucket europetrip.
    let etag = await minioClient.fPutObject('images', 'uniqueidhere', file, 'application/octet-stream');

    console.log(etag);

    let dataStream = await minioClient.getObject('images', 'uniqueidhere');

    // Return new promise
    return new Promise((resolve, reject) => {
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

}
async function run() {
    let b64 = await run_B();
    console.log(b64);
}

run().catch((err) => { console.log(err); });

