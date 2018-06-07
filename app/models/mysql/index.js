'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const config    = require('@config/config');
let db          = {};

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, config.mysql);

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
