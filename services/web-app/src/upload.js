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
require('bulma/css/bulma.css');
require('uppy/dist/uppy.css');

const __r = require('rowinia');

// Uppy file upload
const Uppy = require('uppy/lib/core');
const Dashboard = require('uppy/lib/plugins/Dashboard');
const Tus = require('uppy/lib/plugins/Tus');
// const GoogleDrive = require('uppy/lib/plugins/GoogleDrive');
// const Dropbox = require('uppy/lib/plugins/Dropbox');
const CFG = require('./config');
/**
 * Main function to display the interface
 */
function run() {
    // let file_mgt_endpoint =  'http://'+CFG.file_mgt.publichost+':'+CFG.file_mgt.port+'/uploads';
    let file_mgt_endpoint =  'http://localhost:'+CFG.file_mgt.port+'/uploads';
    console.log(file_mgt_endpoint);

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
        .use(Tus, { endpoint: file_mgt_endpoint })
        .run();

    // todo - change to notifications
    uppy.on('complete', result => {
        console.log('successful files:', result.successful);
        console.log('failed files:', result.failed);
    });

}

// when page is ready display the upload
__r.eady(run);



