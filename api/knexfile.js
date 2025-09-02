require ('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: process.env.CLIENT,
    connection: process.env.DB_CONNECTION_STRING 
  }
};
