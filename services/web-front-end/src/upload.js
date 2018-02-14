'use strict';
require('bulma/css/bulma.css');
require('uppy/dist/uppy.css');

// const FileUploadWithPreview = require('file-upload-with-preview');
// initialize a new FilheUploadWithPreview object
// const upload = new FileUploadWithPreview('myFirstImage');

const _ = require('lodash');
// const util = require('util');


// const axios = require('axios');
// const req = axios.create({
//     baseURL: 'http://localhost:8641/'
// });


const Uppy = require('uppy/lib/core');
const Dashboard = require('uppy/lib/plugins/Dashboard');
const GoogleDrive = require('uppy/lib/plugins/GoogleDrive');
const Dropbox = require('uppy/lib/plugins/Dropbox');
const Instagram = require('uppy/lib/plugins/Instagram');
const Webcam = require('uppy/lib/plugins/Webcam');
const Tus = require('uppy/lib/plugins/Tus');


function run() {
    const uppy = Uppy({
        debug: true,
        autoProceed: false,
        restrictions: {
            maxFileSize: 1000000,
            maxNumberOfFiles: 1,
            minNumberOfFiles: 1,
            allowedFileTypes: ['image/*']
        }
    })
        .use(Dashboard, {
            trigger: '.UppyModalOpenerBtn',
            inline: true,
            target: '.DashboardContainer',
            replaceTargetContent: true,
            note: 'Images up to 1 MB',
            maxHeight: 450,
            metaFields: [
                { id: 'license', name: 'License', placeholder: 'specify license' },
                { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
            ]
        })
        // .use(GoogleDrive, { target: Dashboard, host: 'https://server.uppy.io' })
        // .use(Dropbox, { target: Dashboard, host: 'https://server.uppy.io' })
        // .use(Instagram, { target: Dashboard, host: 'https://server.uppy.io' })
        // .use(Webcam, { target: Dashboard })
        .use(Tus, { endpoint: 'http://filemgt:9001' })
        .run();

    uppy.on('complete', result => {
        console.log('successful files:', result.successful);
        console.log('failed files:', result.failed);
    });

}

// in case the document is already rendered
if (document.readyState!=='loading') {run();}
// modern browsers
else if (document.addEventListener) {document.addEventListener('DOMContentLoaded', run);}
// IE <= 8
else {document.attachEvent('onreadystatechange', function(){
    if (document.readyState==='complete') {run();}
});}



