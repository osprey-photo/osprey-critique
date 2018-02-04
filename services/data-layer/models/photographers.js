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
