'use strict';

let Minio = require('minio');

let minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    secure: false,
    accessKey: 'JZHANSO4K036X27N0CR5',
    secretKey: 'gsF656jIgCvOtj1fRyISKYGJvQfWtq2q4TUyIvr4'
});

let file = '/home/matthew/Pictures/354.jpeg';


// let minioClient = new Minio.Client({
//     endPoint: 'play.minio.io',
//     port: 9000,
//     secure: true,
//     accessKey: 'Q3AM3UQ867SPQQA43P2F',
//     secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
// });

// Using fPutObject API upload your file to the bucket europetrip.
minioClient.fPutObject('images', 'photos-europe.tar', file, 'application/octet-stream', function(err, etag) {
    if (err) {return console.log(err);}
    console.log('File uploaded successfully.');
});
