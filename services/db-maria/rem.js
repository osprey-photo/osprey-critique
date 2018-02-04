const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
    client: 'mysql',
    connection: {
      host : 'some-mysql',
      user : 'root',
      password : 'my-secret-pw',
      database : 'voyager'
    }
});

// Give the knex object to objection.
Model.knex(knex);

// Person model.
class Person extends Model {
  static get tableName() {
    return 'Person';
  }
}

async function main() {
  // Create database schema. You should use knex migration files to do this. We
  // create it here for simplicity.
  await knex.schema.createTableIfNotExists('Person', table => {
    table.increments('id').primary();
    table.string('firstName');
  });

  // Create a person.
  const person = await Person.query().insert({firstName: 'Sylvester'});

  console.log('created:', person.firstName, 'id:', person.id);

  // Fetch all people named Sylvester and sort them by id.
  const sylvesters = await Person.query()
    .where('firstName', 'Sylvester')
    .orderBy('id');

  console.log('sylvesters:', sylvesters);
}

main().catch(console.error);