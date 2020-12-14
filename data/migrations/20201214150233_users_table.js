
exports.up = function(knex) {
  return knex.schema
  .createTabel('users', table => {
      table.increments();
      table.string('username', 128).notNullable().unique()
      table.string('password', 256).notNullable()
      table.string('department', 256).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users');
};
