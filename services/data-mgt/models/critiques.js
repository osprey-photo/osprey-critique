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

const Model = require('objection').Model;
const Images = require('./images.js');
const Photographers = require('./photographers.js');

class Critiques extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'Groups';
    }

    // Has image
    // has submitter
    /*
      static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: Person,
      join: {
        from: 'animal.ownerId',
        to: 'person.id'
      }
    }
  }
    */
    static get relationMappings() {
        return {
            image: {
                relation: Model.BelongsToOneRelation,
                modelClass: Images,
                join: {
                    from: 'Critiques.imageId',
                    to: 'Images.uid'
                }
            },
            submitter: {
                relation: Model.BelongsToOneRelation,
                modelClass: Photographers,
                join: {
                    from: 'Critiques.submitterId',
                    to: 'Photographers.uid'
                }
            }
        };
    }
}

module.exports = Critiques;
