'use strict';

// Taken from
// https://blog.risingstack.com/node-js-best-practices-part-2/

let config = module.exports = {};

config.server = {
    host: '0.0.0.0',
    port: process.env.PORT || 3000
};

