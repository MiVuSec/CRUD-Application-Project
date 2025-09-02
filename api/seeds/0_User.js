/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('User').del()
  await knex('User').insert([
    {'First Name': 'Gomer', 'Last Name': 'Pyle', Username: 'TheBadGuy', Password: 'keixjklfh'},
    {'First Name': 'James', 'Last Name': 'Ryan ', Username: 'Where_Am_I123', Password: 'uyrNJkjfnxiw'},
    {'First Name': 'John', 'Last Name': 'Miller ', Username: 'Professor-Symbology', Password: 'password123'},
  ]);
};
