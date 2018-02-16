'use strict';

const Model = require('objection').Model;

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
            imageid: {
                relation: Model.BelongsToOneRelation,
                modelClass: Person,
                join: {
                    from: 'animal.ownerId',
                    to: 'person.id'
                }
            },
            submitterId: {
                relation: Model.BelongsToOneRelation,
                modelClass: Person,
                join: {
                    from: 'animal.ownerId',
                    to: 'person.id'
                }
            }
        };
    }
}

module.exports = Critiques;
