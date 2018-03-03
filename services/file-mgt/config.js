'use strict';

// Taken from
// https://blog.risingstack.com/node-js-best-practices-part-2/

let config = module.exports = {};

config.db = {
    host: process.env.DBHOST || 'maria_db',
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