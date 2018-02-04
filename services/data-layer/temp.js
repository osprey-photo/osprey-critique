
'use strict';
const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');
const Photographers = require('./models/photographers');
// Initialize knex.
const knex = Knex(knexConfig.development);


Model.knex(knex);

async function main() {


    // Create a person.
    const person = await Photographers.query().insert({firstName: 'Sylvester',lastName:'Cat'});

    console.log('created:', person);

    // Fetch all people named Sylvester and sort them by id.
    const sylvesters = await Photographers.query()
        .where('firstName', 'Sylvester')
        .orderBy('uid');

    console.log('sylvesters:', sylvesters);

    process.exit(0);
}

main().catch((err)=>
{
    console.error(err);
    process.exit(1);
});
