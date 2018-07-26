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

// Taken from
// https://blog.risingstack.com/node-js-best-practices-part-2/

let config = module.exports = {};

config.db = {
    host: process.env.DB_HOST || 'maria_db',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    pwd:  process.env.DB_PWD  || 'mypass'
};

config.data_layer = {
    port: process.env.DL_PORT || 8641,
    host: process.env.DL_HOST || 'data_layer'

};

config.minio = {
    host: process.env.MI_HOST || 'minio_ds',
    port: process.env.MI_PORT || 9000,
    accessKey: process.env.MI_ACCESSS_KEY || 'VKHGJTS8P3DR63GVRXLJ',
    secretKey: process.env.MI_SECRET_KEY || '6oXQdUMGUHEPcN4OfxN4ROXllCHZ7s/m3uNmcn7j'
};

config.front_end = {

};

config.file_mgt = {
    host: process.env.FM_HOST || 'file_mgt',

    port: process.env.FM_PORT || 9001,
    secure: false

};