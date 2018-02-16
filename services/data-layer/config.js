'use strict';

// Taken from
// https://blog.risingstack.com/node-js-best-practices-part-2/

let config = module.exports = {};

config.db = {
    host: process.env.DBHOST || '0.0.0.0',
    port: process.env.DBPORT || 3306,
    user: process.env.DBUSER || 'root',
    pwd:  process.env.DBPWD  || 'mypass'
};

