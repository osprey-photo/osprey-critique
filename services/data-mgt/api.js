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

    router.post('/photographers', async (req, res) => {
        const p =await Photographers.query().insert(req.body);
        res.send(p);
    });

    router.patch('/photographers/:id', async (req, res) => {
        const person = await Photographers.query().patchAndFetchById(req.params.id, req.body);
        res.send(person);
    });

    router.get('/photographers/:id/', async (req, res) => {
        const p = await Photographers.query()
            .where('uid',req.params.id);

        if (!p) {
            throw createStatusCodeError(404);
        }
        res.send(p);
    });

    router.get('/photographers', async (req, res) => {
        const p = await Photographers.query()
            .skipUndefined()
            .orderBy('firstName');

        if (!p) {
            throw createStatusCodeError(404);
        }
        res.send(p);
    });

    router.delete('/photographers/:id', async (req, res) => {
        await Photographers.query().delete().where('uid',req.params.id);
        res.send({});
    });

    router.post('/photographers/:id/critiques', async (req, res) => {
        const graph = req.body;

        // It's a good idea to wrap `insertGraph` call in a transaction since it
        // may create multiple queries.
        const insertedGraph = await transaction(Photographers.knex(), trx => {
            return (
                Photographers.query(trx)
            // For security reasons, limit the relations that can be inserted.
                    //.allowInsert('[pets, children.[pets, movies], movies, parent]')
                    .insertGraph(graph)
            );
        });

        res.send(insertedGraph);
    });



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


