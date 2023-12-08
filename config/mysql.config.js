const env = require('dotenv').config()
const mysql = require('mysql2');

const sql = mysql.createConnection({
  host: env.parsed.DB_HOST,
  user: env.parsed.DB_USERNAME,
  password: env.parsed.DB_PASSWORD,
  database: env.parsed.DB_NAME
});

module.exports = sql
