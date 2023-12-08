const env = require('dotenv').config()
module.exports = {
  DATABASE_URL: env.parsed.DATABASE_URL,
  HOST: env.parsed.DB_HOST,
  PORT: env.parsed.DB_PORT,
  USER: env.parsed.DB_USERNAME,
  PASSWORD: env.parsed.DB_PASSWORD,
  DB: env.parsed.DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
};