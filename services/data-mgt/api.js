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
        console.log(persons);
        res.send(persons);
    });

    // Delete a person.
    router.delete('/photographers/:id', async (req, res) => {
        await Photographers.query().deleteById(req.params.id);

        res.send({});
    });

    // Get a specific image by ID
    router.get('/images/:id/', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    // Create a new image
    router.post('/images', async (req, res) => {
        const inserted = await transaction(Images.knex(), trx => {
            return (
                Images.query(trx).insert(req.body)
            );
        });

        res.send(inserted);
    });

    //
    // router.get('/groups/', async (req, res) => {
    //     const image = await Images.query().findById(req.params.id);

    //     if (!image) {
    //         throw createStatusCodeError(404);
    //     }

    //     res.send(image);
    // });

    router.get('/groups/:id/', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    // creates a new group
    router.post('/groups', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.patch('/groups/:id', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.post('/critiques', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.patch('/critiques/:id', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.get('/critiques/:id', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.get('/critiques/', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.get('/comments/:id', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.get('/comments/', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.patch('/comments/:id', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.post('/comments/', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.get('/adjustments/:id', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.get('/adjustments/', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.patch('/adjustments/:id', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

    router.post('/adjustments/', async (req, res) => {
        const image = await Images.query().findById(req.params.id);

        if (!image) {
            throw createStatusCodeError(404);
        }

        res.send(image);
    });

};


