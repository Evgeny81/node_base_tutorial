/*
* Note This config file is being used by Sequelize. It looks for special format of db config in root/config/config directory
* Thus, the main config is being utilized by app loading mysql db configurations from this file.
* this is needed to have an ability to run Sequelize commands such as db:create, db:drop, db:seed etc
* */

require('dotenv').config();

module.exports =  {
  "development": {
    "username": process.env.DB_MYSQL_USERNAME || "root",
    "password": process.env.DB_MYSQL_PASS || "root1",
    "database": process.env.DB_MYSQL_NAME || "node_base_tutorial_development",
    "host": process.env.DB_MYSQL_HOST || "127.0.0.1",
    "dialect": process.env.DB_MYSQL_DIALECT || "mysql",
    "multipleStatements": process.env.DB_MYSQL_MULTIPLESTATEMENTS || true
  },
  "test": {
    "username": process.env.DB_MYSQL_USERNAME || "root",
    "password": process.env.DB_MYSQL_PASS || "root",
    "database": process.env.DB_MYSQL_NAME || "node_base_tutorial_test",
    "host": process.env.DB_MYSQL_HOST || "127.0.0.1",
    "dialect": process.env.DB_MYSQL_DIALECT || "mysql",
    "multipleStatements": process.env.DB_MYSQL_MULTIPLESTATEMENTS || true
  },
  "production": {
    "username": process.env.DB_MYSQL_USERNAME || "root",
    "password": process.env.DB_MYSQL_PASS || "root",
    "database": process.env.DB_MYSQL_NAME || "node_base_tutorial_production",
    "host": process.env.DB_MYSQL_HOST || "127.0.0.1",
    "dialect": process.env.DB_MYSQL_DIALECT || "mysql",
    "multipleStatements": process.env.DB_MYSQL_MULTIPLESTATEMENTS || true
  }
};