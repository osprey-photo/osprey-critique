'use strict';

const Model = require('objection').Model;

/**
 * 
 * abstract asset Person identified by email {
 *  o String email
 *  o String firstName
 *  o String lastName
 *  o String displayName
 * }

 * asset Photographer extends Person {
 *  --> Group[]  groupMembership
 *  --> Critique[] submittedCritique
 * }
 * 
 */
class Photographer extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'Photographer';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {

    return  {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "title": "Photographer",
      "description": "An asset named Photographer",
      "type": "object",
      "properties": {
          "groupMembership": {
              "type": "array",
              "items": {
                  "type": "string",
                  "description": "The identifier of an instance of org.osprey.critique.Group"
              }
          },
          "submittedCritique": {
              "type": "array",
              "items": {
                  "type": "string",
                  "description": "The identifier of an instance of org.osprey.critique.Critique"
              }
          },
          "email": {
              "type": "string",
              "description": "The instance identifier for this type"
          },
          "firstName": {
              "type": "string"
          },
          "lastName": {
              "type": "string"
          },
          "displayName": {
              "type": "string"
          }
      },
      "required": [
          "groupMembership",
          "submittedCritique",
          "email",
          "firstName",
          "lastName",
          "displayName"
      ]
  };



  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      pets: {
        relation: Model.HasManyRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one.
        modelClass: Animal,
        join: {
          from: 'Person.id',
          to: 'Animal.ownerId'
        }
      },

      movies: {
        relation: Model.ManyToManyRelation,
        modelClass: Movie,
        join: {
          from: 'Person.id',
          // ManyToMany relation needs the `through` object to describe the join table.
          through: {
            from: 'Person_Movie.personId',
            to: 'Person_Movie.movieId'
          },
          to: 'Movie.id'
        }
      },

      children: {
        relation: Model.HasManyRelation,
        modelClass: Person,
        join: {
          from: 'Person.id',
          to: 'Person.parentId'
        }
      },

      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: 'Person.parentId',
          to: 'Person.id'
        }
      }
    };
  }
}

module.exports = Photographer;
