const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV]
);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.get("/", (req, res) => {
  res.send("Application up and running.");
});

app.get("/:table", (req, res) => {
  let unsanitizedTable = req.params.table;
  let table = unsanitizedTable.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 99);
  switch(table) {
    case 'User':
      knex(table)
        .select("*")
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
      break;
    case 'Item':
      knex(table)
        .select("*")
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
      break;
    default:
      res.status(404).send("Table not found.");
  }
});

app.get("/:table/undefined/undefined", (req, res) => {
  let unsanitizedTable = req.params.table;
  let table = unsanitizedTable.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 99);
  switch(table) {
    case 'User':
      knex(table)
        .select("*")
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
      break;
    case 'Item':
      knex(table)
        .select("*")
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
      break;
    default:
      res.status(404).send("Table not found.");
  }
});

app.get("/:table/:column/:data", (req, res) => {
  let unsanitizedId = req.params.data;
  let id = unsanitizedId.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 9);
  let unsanitizedColumn = req.params.column;
  let column = unsanitizedColumn.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 99);
  let unsanitizedTable = req.params.table;
  let table = unsanitizedTable.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 99);

  switch(table) {
    case 'User':
      knex(table)
        .select("*")
        .where(`User.${column}`, "=", id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
      break;
    case 'Item':
      knex(table)
        .select("*")
        .where(`Item.${column}`, "=", id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
      break;
    default:
      res.status(404).send("Table not found.");
  }
});

app.delete("/:table/:id", (req, res) => {
  let unsanitizedId = req.params.id;
  let id = unsanitizedId.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 9);
  let unsanitizedTable = req.params.table;
  let table = unsanitizedTable.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 99);

  if (!isNaN(parseFloat(id)) && isFinite(id))
  switch(table) {
    case 'User':
      knex(table)
        .where('User.Id', "=", id)
        .del()
        .then((data) => res.status(200).json(data))
        .then(() => console.log("done with the delete"))
        .catch((err) => res.status(400).json(err));
      break;
    case 'Item':
      knex(table)
        .where('Item.Id', "=", id)
        .del()
        .then((data) => res.status(200).json(data))
        .then(() => console.log("done with the delete"))
        .catch((err) => res.status(400).json(err));
      break;
    default:
      res.status(404).send("Table not found.");
  }
  else res.status(404).send("Id is not a number.");
});

app.post("/:table", (req, res) => {
  let unsanitizedTable = req.params.table;
  let table = unsanitizedTable.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 99);

  switch(table) {
    case 'User':
      knex(table)
        .insert(req.body)
        .then(() => console.log("done with the insert"))
        .then((data) => res.status(200).end())
        .catch((err) => res.status(400).json(err));
      break;
    case 'Item':
      knex(table)
        .insert(req.body)
        .then(() => console.log("done with the insert"))
        .then((data) => res.status(200).end())
        .catch((err) => res.status(400).json(err));
      break;
    default:
      res.status(404).send("Table not found.");
  }
});

app.patch("/:table/:id", (req, res) => {
  let unsanitizedId = req.params.id;
  let id = unsanitizedId.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 9);
  let unsanitizedTable = req.params.table;
  let table = unsanitizedTable.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 99);

  if (!isNaN(parseFloat(id)) && isFinite(id))
  switch(table) {
    case 'User':
      knex(table)
        .where('User.Id', "=", id)
        .update(req.body)
        .then(() => console.log("done with the patch"))
        .then((data) => res.status(200).end())
        .catch((err) => res.status(400).json(err));
      break;
    case 'Item':
      knex(table)
        .where('Item.Id', "=", id)
        .update(req.body)
        .then(() => console.log("done with the patch"))
        .then((data) => res.status(200).end())
        .catch((err) => res.status(400).json(err));
      break;
    default:
      res.status(404).send("Table not found.");
  }
  else res.status(404).send("Id is not a number.");
});