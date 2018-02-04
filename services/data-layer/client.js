'use strict';

/**
 * This file contains a bunch of HTTP requests that use the
 * API defined in api.js.
 */

const axios = require('axios');

const req = axios.create({
    baseURL: 'http://localhost:8641/'
});

(async () => {
    ////////////////////////////////////////////////
    // Insert some people
    ////////////////////////////////////////////////

    let ben = await req.post('photographers', {
        firstName: 'Ben',
        lastName: 'Affleck',

    });

    console.log('inserted', ben.data);

    ////////////////////////////////////////////////
    // Insert a person with relations
    ////////////////////////////////////////////////

    let matt = await req.post('photographers', {
        firstName: 'Matt',
        lastName: 'Damon'
    });

    console.log('inserted', matt.data);




    ////////////////////////////////////////////////
    // Fetch Persons
    ////////////////////////////////////////////////

    let people = await req.get('photographers', {});

    console.dir(people.data, { depth: null });
})().catch(err => {
    console.error(err.response.data);
});
