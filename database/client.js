const promiseLib = require("bluebird");
const initOptions = {
  promiseLib
};
const pgp = require("pg-promise")(initOptions);
const connectionConfig = {
  host: "localhost",
  port: 5432,
  database: "serialized_development"
};

const db = pgp(connectionConfig);

module.exports = { db, pgp }
