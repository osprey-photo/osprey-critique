'use strict';

const { transaction } = require('objection');
const Photographers = require('./models/photographers');
const Images = require('./models/images');
// const Groups = require('./models/Groups');


// The error returned by this function is handled in the error handler middleware in app.js.
function createStatusCodeError(statusCode) {
    return Object.assign(new Error(), {
        statusCode
    });
}

module.exports = router => {
    // Create a new Person. Because we use `insertGraph` you can pass relations
    // with the person and they also get inserted and related to the person. If
    // all you want to do is insert a single person, `insertGraph` and `allowInsert`
    // can be replaced by `insert(req.body)`.
    router.post('/photographers', async (req, res) => {
        const graph = req.body;

        // It's a good idea to wrap `insertGraph` call in a transaction since it
        // may create multiple queries.
        const insertedGraph = await transaction(Photographers.knex(), trx => {
            return (
                Photographers.query(trx).insert(graph)
            // For security reasons, limit the relations that can be inserted.
            // .allowInsert('[pets, children.[pets, movies], movies, parent]')
            // .insertGraph(graph)
            );
        });

        res.send(insertedGraph);
    });

    // Patch a single Person.
    router.patch('/photographers/:id', async (req, res) => {
        const person = await Photographers.query().patchAndFetchById(req.params.id, req.body);

        res.send(person);
    });

    // Get multiple Persons. The result can be filtered using query parameters
    // `minAge`, `maxAge` and `firstName`. Relations can be fetched eagerly
    // by giving a relation expression as the `eager` query parameter.
    router.get('/photographers', async (req, res) => {
        // We don't need to check for the existence of the query parameters because
        // we call the `skipUndefined` method. It causes the query builder methods
        // to do nothing if one of the values is undefined.
        const persons = await Photographers.query()
            .skipUndefined()
            .orderBy('firstName')
           ;

        res.send(persons);
    });

    // Delete a person.
    router.delete('/photographers/:id', async (req, res) => {
        await Photographers.query().deleteById(req.params.id);

        res.send({});
    });

    router.get('/images/:id/', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.post('/images', async (req, res) => {
        const inserted = await transaction(Images.knex(), trx => {
            return (
                Images.query(trx).insert(req.body)
            );
        });

        res.send(inserted);
    });

    // // Add a pet for a Person.
    // router.post('/persons/:id/pets', async (req, res) => {
    //     const person = await Person.query().findById(req.params.id);

    //     if (!person) {
    //         throw createStatusCodeError(404);
    //     }

    //     const pet = await person.$relatedQuery('pets').insert(req.body);

    //     res.send(pet);
    // });

};


