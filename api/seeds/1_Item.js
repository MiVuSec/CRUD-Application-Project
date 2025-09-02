/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Item').del()
  await knex('Item').insert([
    {UserId: '1','Item Name': 'M1 Garand', Description: 'A good rifle', Quantity: 1 },
    {UserId: '1','Item Name': 'Jelly Donut', Description: 'A tasty snack', Quantity: 0 },
    {UserId: '3','Item Name': '1911 Handgun', Description: 'A good pistol', Quantity: 1 },
    {UserId: '3','Item Name': 'Antimatter Canister', Description: 'A volatile substance', Quantity: 3 },
  ]);
};
