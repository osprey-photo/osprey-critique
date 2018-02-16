'use strict';


exports.up = function(knex, Promise) {
    return Promise.all([
        //
        knex.schema.createTable('Photographers', table => {
            table.increments('uid').primary()
                .unsigned()
                .notNullable();
            table.string('firstName');
            table.string('lastName');
            table.string('email');
            table.string('displayName');
        }),
        //
        knex.schema.createTable('Groups', table => {
            table.increments('uid').primary()
                .unsigned()
                .notNullable();
            table.string('name');
            table.string('purpose');
        }),
        //
        knex.schema.createTable('Critiques', table => {
            table.increments('uid').primary()
                .unsigned()
                .notNullable();
            table.integer('imageid')
                .unsigned()
                .references('uid')
                .inTable('Images');
            table.string('title');
            table.integer('submitterId')
                .unsigned()
                .references('uid')
                .inTable('Photographers');
            table.string('openingNotes');
        }),
        //
        knex.schema.createTable('Comments', table => {
            table.increments('uid').primary()
                .unsigned()
                .notNullable();
            table.string('text');
            table.integer('authorId')
                .unsigned()
                .references('uid')
                .inTable('Photographers');
            table.integer('critqueId')
                .unsigned()
                .references('uid')
                .inTable('Critiques');
            table.integer('adjustment')
                .unsigned()
                .references('uid')
                .inTable('Adjustments');
        }),
        //
        knex.schema.createTable('Adjustments', table => {
            table.increments('uid').primary()
                .unsigned()
                .notNullable();
            table.string('name');
            table.json('details');
        }),
        //
        knex.schema.createTable('Images', table => {
            table.increments('uid').primary()
                .unsigned()
                .notNullable();
            table.string('filehash');
            table.string('caption');
        }),
        //
        knex.schema.createTable('Groups_Members', table => {
            table.integer('groupId')
                .unsigned()
                .notNullable()
                .references('uid')
                .inTable('Groups');
            table.integer('memberId')
                .unsigned()
                .notNullable()
                .references('uid')
                .inTable('Photographers');
            table.primary(['groupId','memberId']);
        }),
        //
        knex.schema.createTable('Groups_Admins', table => {
            table.integer('groupId')
                .unsigned()
                .notNullable()
                .references('uid')
                .inTable('Groups');
            table.integer('adminId')
                .unsigned()
                .notNullable()
                .references('uid')
                .inTable('Photographers');
            table.primary(['groupId','adminId']);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('Photographers'),
        knex.schema.dropTable('Groups'),
        knex.schema.dropTable('Critiques'),
        knex.schema.dropTable('Comments'),
        knex.schema.dropTable('Adjustments'),
        knex.schema.dropTable('Groups_Admins'),
        knex.schema.dropTable('Groups_Members'),
        knex.schema.dropTable('Images')
    ]);
};
