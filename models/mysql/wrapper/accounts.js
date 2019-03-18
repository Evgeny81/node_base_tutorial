'use strict';

module.exports = (sequelize, DataTypes) => {

  const accounts = sequelize.define('accounts', {
    name: DataTypes.STRING,
    domain_name: DataTypes.STRING
  }, {});

  accounts.associate = function(models) {
    models.accounts.hasMany(models.Products);
  };

  return accounts;
};
