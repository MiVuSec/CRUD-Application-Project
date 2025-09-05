/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('User', table => {
    table.increments('Id').primary();
    table.string('First Name', 256);
		table.string('Last Name', 256);
		table.string('Username', 256);
		table.string('Password', 256);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('User');
};
