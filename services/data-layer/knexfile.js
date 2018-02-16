'use strict';

const cfg = require('./config.js');

module.exports = {
    development: {
        client: 'mariasql',
        connection: {
            host: cfg.db.host,
            user: cfg.db.user,
            password: cfg.db.pwd,
            db: 'osprey',
            charset: 'utf8'
        }
    }
};
