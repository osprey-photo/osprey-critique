'use strict';

const Model = require('objection').Model;

class Groups extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'Groups';
    }

    // This object defines the relations to other models.
    static get relationMappings() {
        return {
            groupMembership: {
                relation: Model.ManyToManyRelation,
                modelClass: Groups,
                join: {
                    from: 'Groups.uid',
                    // ManyToMany relation needs the `through` object to describe the join table.
                    through: {
                        to: 'Groups_Members.groupId',
                        from: 'Groups_Members.memberId'
                    },
                    to: 'Photographers.uid'
                }
            }
        };
    }
}

module.exports = Groups;
