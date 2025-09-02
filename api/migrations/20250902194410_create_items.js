/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Item', table => {
    table.increments('Id').primary();
    table.integer('UserId');
    table.foreign('UserId').references('Id').inTable('User');
		table.string('Item Name', 100);
		table.string('Description', 100);
		table.integer('Quantity');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('Item', table => {
    table.dropForeign('UserId');
  })
  .then(()=>{
    return knex.schema.dropTableIfExists('Item');
  })
};
