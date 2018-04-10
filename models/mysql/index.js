'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../../config/config.json')[env];
let db          = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config.mysql);
} else {
  var sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, config.mysql);
}

fs
  .readdirSync(path.join(__dirname, 'wrapper'))
  .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js') )
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, 'wrapper', file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
