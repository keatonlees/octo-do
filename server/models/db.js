const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const db = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  // dateStrings: true,
});

module.exports = db;

// mysql://bd390a77efd163:c8e41b46@us-cdbr-east-04.cleardb.com/heroku_427f035ca9c04c0?reconnect=true
