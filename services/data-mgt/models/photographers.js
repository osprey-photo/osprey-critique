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
const Groups = require('./groups.js');

class Photographers extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'Photographers';
    }

    // This object defines the relations to other models.
    static get relationMappings() {
        return {


            groupMembership: {
                relation: Model.ManyToManyRelation,
                modelClass: Groups,
                join: {
                    from: 'Photographers.uid',
                    // ManyToMany relation needs the `through` object to describe the join table.
                    through: {
                        from: 'Groups_Members.groupId',
                        to: 'Groups_Members.memberId'
                    },
                    to: 'Groups.uid'
                }
            }
        };
    }
}

module.exports = Photographers;
