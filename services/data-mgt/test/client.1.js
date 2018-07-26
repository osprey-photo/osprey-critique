
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const uuid = require('uuid');
//
const chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));
const sinon = require('sinon');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);

/**
 * This file contains a bunch of HTTP requests that use the
 * API defined in api.js.
 */

const axios = require('axios');

describe('data-layer testing - photographers', function(){

    let req;
    before(()=>{
        req = axios.create({
            baseURL: 'http://localhost:8641/'
        });
    });

    describe('put photographer',async ()=>{
        let id;
        it('should store a new photographer',async ()=>{
            // console.log('posting new photographer');
            let p1 = await req.post('photographers', {
                firstName: 'Fred',
                lastName: 'Bloggs',
                email: 'fred@bloggs',
                displayName :'fb'
            });
            // console.log('inserted', p1.data);
            id = p1.data.id;
            p1.data.
                should.containSubset({
                    firstName: 'Fred',
                    lastName: 'Bloggs',
                    email: 'fred@bloggs',
                    displayName :'fb'
                });

        });

        it('should get all image data',async ()=>{
            let img1 = await req.get(`photographers/${id}`);

            console.log('got', img1.data);
        });

        it('should get add a new critique',async ()=>{
            let data = {
                image :{ filehash:'cafe01234', caption:'Study in blue'},
                title : 'What do you think?',
                submitter : { submitterId : id},
                openingNotes : 'This is a good example'
            };
            let img1 = await req.post(`photographers/${id}/critiques`,data);

            console.log('got', img1.data);
        });
    });

});


// (async () => {
//     ////////////////////////////////////////////////
//     // Insert some people
//     ////////////////////////////////////////////////

//     let sylvester = await req.post('persons', {
//         firstName: 'Sylvester',
//         lastName: 'Stallone',
//         age: 68
//     });

//     console.log('inserted', sylvester.data);

//     let ben = await req.post('persons', {
//         firstName: 'Ben',
//         lastName: 'Affleck',
//         age: 40
//     });

//     console.log('inserted', ben.data);

//     ////////////////////////////////////////////////
//     // Insert a person with relations
//     ////////////////////////////////////////////////

//     let matt = await req.post('persons', {
//         firstName: 'Matt',
//         lastName: 'Damon',
//         age: 43,

//         parent: {
//             firstName: 'Kent',
//             lastName: 'Damon',
//             age: 70
//         },

//         pets: [
//             {
//                 name: 'Doggo',
//                 species: 'dog'
//             },
//             {
//                 name: 'Kat',
//                 species: 'cat'
//             }
//         ],

//         movies: [
//             {
//                 name: 'The Martian'
//             },
//             {
//                 name: 'Good Will Hunting'
//             }
//         ]
//     });

//     console.log('inserted', matt.data);

//     ////////////////////////////////////////////////
//     // Patch a person
//     ////////////////////////////////////////////////

//     // Patch Matt Damon's father's age.
//     let kent = await req.patch(`persons/${matt.data.parent.id}`, {
//         age: 71
//     });

//     console.log('patched', kent.data);

//     ////////////////////////////////////////////////
//     // Upsert a graph
//     ////////////////////////////////////////////////

//     // This updates kent and his relations to match the graph we send. The relations
//     // that are not mentioned at all, are left alone.
//     //
//     // What happens is:
//     //    - `Kat` gets deleted since it is not in the sent graph
//     //    - `Doggo`'s name gest updated
//     //    - `Kitty` gets inserted since it didn't previously exist.
//     kent = await req.patch(`persons/${matt.data.id}/upsert`, {
//         id: matt.data.id,

//         pets: [
//             {
//                 id: matt.data.pets[0].id,
//                 name: 'The dog'
//             },
//             {
//                 name: 'Kitty',
//                 species: 'cat'
//             }
//         ]
//     });

//     console.log('upserted', kent.data);

//     ////////////////////////////////////////////////
//     // Add existing person as an actorn in a movie
//     ////////////////////////////////////////////////

//     // Add Ben Affleck to Good Will Hunting.
//     let actor = await req.post(`movies/${matt.data.movies[1].id}/actors`, {
//         id: ben.data.id
//     });

//     console.log('added actor', actor.data);

//     ////////////////////////////////////////////////
//     // Add a pet for a person
//     ////////////////////////////////////////////////

//     let theHound = await req.post(`persons/${ben.data.id}/pets`, {
//         name: 'The Hound',
//         species: 'dog'
//     });

//     console.log('added pet', theHound.data);

//     ////////////////////////////////////////////////
//     // Fetch Persons
//     ////////////////////////////////////////////////

//     let people = await req.get('persons', {
//         params: {
//             minAge: 41,
//             eager: `[
//         parent,
//         children,
//         pets,

//         movies.[
//           actors.[
//             pets
//           ]
//         ]
//       ]`
//         }
//     });

//     console.dir(people.data, { depth: null });
// })().catch(err => {
//     console.error(err.response.data);
// });
