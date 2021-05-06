require("dotenv").config()

const config =
{
  "development": {
    "username": process.env.DEV_BDD_USERNAME,
    "password": process.env.DEV_BDD_PASSWORD,
    "database": process.env.DEV_BDD_NAME,
    "host": process.env.DEV_BDD_HOST,
    "dialect": process.env.DEV_BDD_DIALECT
  },
  "test": {
    "username": "root",
    "password": "api",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

module.exports = config
