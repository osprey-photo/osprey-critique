'use strict';

const Model = require('objection').Model;

class Images extends Model {
    // Table name is the only required property.
    static get tableName() {
        return 'Images';
    }

    // This object defines the relations to other models.
    static get relationMappings() {
        return {

        };
    }
}

module.exports = Images;
